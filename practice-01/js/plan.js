"use strict";

const totalTasks = 12;
const completedTasks = 5;
const dailyLimit = 3;

const validCount = (value) =>
  Number.isInteger(value) && Number.isFinite(value) && value >= 0 && value <= 1000;

if (
  !validCount(totalTasks) ||
  !validCount(completedTasks) ||
  completedTasks > totalTasks ||
  !Number.isInteger(dailyLimit) ||
  dailyLimit < 1 ||
  dailyLimit > 1000
) {
  console.log("Ошибка: некорректные входные данные.");
} else {
  let remainingTasks = totalTasks - completedTasks;
  let day = 0;

  console.log(`Осталось задач: ${remainingTasks}`);

  while (remainingTasks > 0) {
    day += 1;
    const doneToday = Math.min(dailyLimit, remainingTasks);
    remainingTasks -= doneToday;
    console.log(`День ${day}: выполнено ${doneToday}, осталось ${remainingTasks}`);
  }

  if (day === 0) {
    console.log("Все задачи уже выполнены.");
  }
  console.log(`Потребуется дней: ${day}`);
}
