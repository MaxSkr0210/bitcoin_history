<template>
  <nav>
    <h2>Выбрать период отображения цены биткоина</h2>
    <ul>
      <li v-for="period in periods" :key="period.id" @click="per(period)">
        {{ period.value }}
      </li>
    </ul>
    <form action="">
      <input type="date" name="start" v-model="start" />
      <input type="date" name="end" v-model="end" />
      <button @click="getHistory">Показать</button>
    </form>
  </nav>
</template>

<script lang="ts" setup>
import type { PeriodType } from "~/types/Period";

const dateNow = ref(new Date());
const start = ref(new Date());
const end = ref(new Date());

const day = dateNow.value.getDate();
const month = dateNow.value.getMonth();
const year = dateNow.value.getFullYear();

const periods = ref([
  {
    id: 1,
    value: "День",
    step: "h1",
    start: +dateNow.value.getTime() - 1000 * 60 * 60 * 24,
    end: dateNow.value.getTime(),
  },
  {
    id: 2,
    value: "Неделя",
    step: "d1",
    start: +dateNow.value.getTime() - 1000 * 60 * 60 * 24 * 9,
    end: dateNow.value.getTime(),
  },
  {
    id: 3,
    value: "Месяц",
    step: "d1",
    start: new Date().setMonth(dateNow.value.getMonth() - 1),
    end: dateNow.value.getTime(),
  },
  {
    id: 4,
    value: "Год",
    step: "d1",
    start: new Date(`${year - 1}-${month + 1}-${day}`).getTime(),
    end: dateNow.value.getTime(),
  },
]);

const website = datasStore();

function per(period: PeriodType): void {
  website.changePeriod(period);
}

function getHistory(e: Event) {
  e.preventDefault();

  if (start.value.toString() === "" || end.value.toString() === "") {
    alert("Введите Нижнюю и верхнюю границы временного интервала");
    return;
  }

  const millStart = new Date(start.value).getTime();
  const millEnd = new Date(end.value).getTime();

  let step = "d1";

  if (millEnd - millStart - 1000 * 60 * 60 * 24 * 2 <= 0) {
    step = "h1";
  }

  const period: PeriodType = {
    id: 5,
    value: "Пользотельский",
    step,
    start: millStart,
    end: millEnd,
  };

  website.changePeriod(period);
}

onMounted(async () => {
  website.changePeriod(periods.value[3]);
});
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  text-align: center;
  padding-top: 5px;
}

ul {
  font-size: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 15px;
  transition: border-bottom 2s ease-in-out;
}

li:after {
  display: block;
  content: "";
  border-bottom: solid 3px #f87979;
  transform: scaleX(0);
  transition: transform 250ms ease-in-out;
}

li:hover:after {
  transform: scaleX(1);
}

form {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 150px;
}

input {
  width: 100%;
  height: 25px;
  font-size: 18px;
}

button {
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid #f87979;
  background-color: #fff;
  font-size: 18px;
  transition: all 0.4s ease-in-out;
}

button:hover {
  background-color: #f87979;
  color: #fff;
  box-shadow: 0px 0px 3px 1px #f87979;
}
</style>
