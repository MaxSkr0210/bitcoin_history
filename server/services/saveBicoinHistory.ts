import { DataType } from "~/types/DataType";
import History from "../db";
import { ResponeBicoinPriceType } from "~/types/ResponeBicoinPriceType";

//Запрос на биржу
async function fetchPrice(
  step: string,
  interval?: { start: number; end: number }
): Promise<DataType[]> {
  const url = new URL("https://api.coincap.io/v2/assets/bitcoin/history");

  url.searchParams.set("interval", step);

  if (interval) {
    url.searchParams.set("start", interval.start.toString());
    url.searchParams.set("end", interval.end.toString());
  }

  const { data }: ResponeBicoinPriceType = await $fetch(url.toString());

  return data.map((item) => {
    item.value = item.priceUsd;
    delete item.priceUsd;
    delete item.time;
    delete item.circulatingSupply;
    return item;
  });
}

//Сохранение данных в базе данных
export async function saveBicoinHistory(
  step: string,
  interval?: { start: number; end: number }
): Promise<DataType[]> {
  const data = await fetchPrice(step, interval);

  await History.bulkCreate(data, {
    validate: true,
    ignoreDuplicates: true,
  });

  return data.map((item) => {
    let [date, time] = item.date.split("T");

    date = date.split("-").reverse().join(".");
    item.date = date;

    if (step === "d1") {
      return item;
    }

    time = time.replace("000Z", "");
    item.date += " " + time;
    return item;
  });
}
