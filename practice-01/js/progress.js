"use strict";

const totalTasks = 12;
const completedTasks = 5;

const isValidInteger = (value) =>
  Number.isInteger(value) && Number.isFinite(value);

if (
  !isValidInteger(totalTasks) ||
  !isValidInteger(completedTasks) ||
  totalTasks < 0 ||
  totalTasks > 1000 ||
  completedTasks < 0 ||
  completedTasks > totalTasks
) {
  console.log("Ошибка: некорректные входные данные.");
} else if (totalTasks === 0 && completedTasks === 0) {
  console.log("Задач пока нет");
} else {
  const pendingTasks = totalTasks - completedTasks;
  const progress = (completedTasks / totalTasks) * 100;
  let status = "В работе";

  if (completedTasks === 0) status = "Не начато";
  if (completedTasks === totalTasks) status = "Завершено";

  console.log(`Всего задач: ${totalTasks}`);
  console.log(`Выполнено: ${completedTasks}`);
  console.log(`Осталось: ${pendingTasks}`);
  console.log(`Прогресс: ${progress.toFixed(1)}%`);
  console.log(`Статус: ${status}`);
}
