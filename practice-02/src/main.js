import { demoTasks, variantTasks, variantNumber } from "./data.js";
import {
  addTask,
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";
import { searchTasks } from "./task-extra.js";

function showStats(tasks, label) {
  const stats = getTaskStats(tasks);
  console.log(label, {
    ...stats,
    progressText: `${stats.progress.toFixed(1)}%`,
  });
}

function apply(current, operation) {
  if (operation.ok) return operation.tasks;
  console.error(`Ошибка: ${operation.error}`);
  return current;
}

console.log("=== Общий сценарий ПР2 ===");
console.log("Исходные задачи:", demoTasks);
console.log("Названия:", getTaskTitles(demoTasks));
console.log("Невыполненные:", getPendingTasks(demoTasks));
showStats(demoTasks, "Исходная сводка:");

let currentTasks = demoTasks;
currentTasks = apply(currentTasks, addTask(currentTasks, 20, "Добавить проверку", "high"));
showStats(currentTasks, "После добавления:");

currentTasks = apply(currentTasks, setTaskCompleted(currentTasks, 4, true));
showStats(currentTasks, "После выполнения id=4:");

currentTasks = apply(currentTasks, renameTask(currentTasks, 10, "Подготовить инструкцию запуска"));
showStats(currentTasks, "После переименования:");

currentTasks = apply(currentTasks, removeTask(currentTasks, 7));
showStats(currentTasks, "После удаления:");

const rejected = addTask(currentTasks, 20, "Дубликат", "high");
console.log("Показ отказа:", rejected);

console.log("Итоговые id:", currentTasks.map((task) => task.id));
console.log("Исходный demoTasks сохранён:", demoTasks);

console.log("\n=== Вариант 1 ===");
console.log("Исходные задачи варианта:", variantTasks);
showStats(variantTasks, "Начальная сводка варианта:");

let variantCurrent = variantTasks;
variantCurrent = apply(
  variantCurrent,
  addTask(variantCurrent, 80, "Проверить учебный проект", "high")
);
variantCurrent = apply(variantCurrent, setTaskCompleted(variantCurrent, 11, true));
variantCurrent = apply(
  variantCurrent,
  renameTask(variantCurrent, 23, "Уточнить план учебного проекта")
);
variantCurrent = apply(variantCurrent, removeTask(variantCurrent, 37));

const duplicateVariant = addTask(
  variantCurrent,
  80,
  "Повторное добавление",
  "high"
);
console.log("Повторное добавление id=80:", duplicateVariant);
showStats(variantCurrent, "Итоговая сводка варианта:");
console.log("Итоговые задачи варианта:", variantCurrent);
console.log("variantTasks сохранён:", variantTasks);
console.log("Номер варианта:", variantNumber);

console.log("\n=== Дополнительный поиск ===");
console.log("Поиск ' ФУНК ':", searchTasks(demoTasks, " ФУНК "));
console.log("Поиск без совпадений:", searchTasks(demoTasks, "несуществующий фрагмент"));
