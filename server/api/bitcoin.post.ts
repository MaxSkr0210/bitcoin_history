import { saveBicoinHistory } from "../services/saveBicoinHistory";

export default defineEventHandler(async (event) => {
  const { step, interval } = await readBody(event);

  const savedPrice = await saveBicoinHistory(step, interval);

  return savedPrice;
});
