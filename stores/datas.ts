import { type PeriodType } from "~/types/Period";
import { type BodyFetchType } from "~/types/BodyFetchType";
import { type BitcoinType } from "~/types/BitcoinType";

export const datasStore = defineStore("datasStore", {
  state: () => ({
    period: {} as PeriodType,
    bitcoin: [] as BitcoinType[],
  }),
  getters: {
    getPeriod(state) {
      return state.period;
    },
    getBitcoin(state) {
      return state.bitcoin;
    },
  },
  actions: {
    async getBitcoinHistory(step: string, start?: number, end?: number) {
      const body: BodyFetchType = {
        step,
      };

      if (start && end) {
        body.interval = { start, end };
      }

      const { value: bitcoin } = (
        await useFetch("/api/bitcoin", {
          method: "POST",
          body,
        })
      ).data;

      this.bitcoin = bitcoin as BitcoinType[];
    },
    changePeriod(period: PeriodType) {
      this.period = period;
    },
  },
});
