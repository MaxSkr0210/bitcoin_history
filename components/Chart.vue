<script lang="ts" setup>
import { Line } from "vue-chartjs";

const store = datasStore();

const chartData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: "Price",
      backgroundColor: "#f87979",
      borderColor: "#f87979",
      data: [] as number[],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        callbacks: {
          label: function (tooltipItem: { yLabel: string }) {
            return "$" + Number(tooltipItem.yLabel);
          },
        },
      },
    },
    legend: {
      display: false,
    },
  },

  borderWidth: 2,
  pointRadius: 2,
});

const renderComponent = ref(false);

const forceRender = async () => {
  await nextTick();
  renderComponent.value = true;
};

watch(
  () => store.period,
  async () => {
    renderComponent.value = false;
    await store.getBitcoinHistory(
      store.period.step,
      store.period.start,
      store.period.end
    );
    const bitcoin = store.getBitcoin;

    chartData.value.labels = bitcoin.map((item) => {
      return item.date;
    });

    chartData.value.datasets[0].data = bitcoin.map((item) => {
      return item.value;
    });

    forceRender();
  }
);
</script>

<template>
  <div class="chart">
    <Line
      v-if="renderComponent"
      :data="chartData"
      :options="chartOptions"
      :key="store.getPeriod.id" />
  </div>
</template>

<style>
.chart {
  height: 100%;
}
</style>
