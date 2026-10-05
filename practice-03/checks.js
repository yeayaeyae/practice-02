import assert from "node:assert/strict";
import { demoTasks, variantTasks } from "./src/data.js";
import { getTaskStats, findTaskById, setTaskCompleted, removeTask } from "./src/task-service.js";
import { getVisibleTasks } from "./src/task-selectors.js";

let passed = 0;
function check(name, fn) {
  fn();
  console.log(`OK: ${name}`);
  passed += 1;
}

check("фильтр all возвращает новый массив", () => {
  const result = getVisibleTasks(demoTasks, "all");
  assert.deepEqual(result, demoTasks);
  assert.notEqual(result, demoTasks);
});
check("фильтр pending", () => {
  assert.deepEqual(getVisibleTasks(demoTasks, "pending").map(t => t.id), [4, 7]);
});
check("фильтр completed", () => {
  assert.deepEqual(getVisibleTasks(demoTasks, "completed").map(t => t.id), [1, 10]);
});
check("неизвестный фильтр не ломает данные", () => {
  assert.deepEqual(getVisibleTasks(demoTasks, "unknown"), demoTasks);
});
check("сводка общего набора", () => {
  assert.deepEqual(getTaskStats(demoTasks), { total: 4, completed: 2, pending: 2, progress: 50 });
});
check("пустые фильтры", () => {
  assert.deepEqual(getVisibleTasks([], "pending"), []);
  assert.deepEqual(getVisibleTasks([], "completed"), []);
});
check("действие toggle меняет ровно одну задачу", () => {
  const result = setTaskCompleted(demoTasks, 4, true);
  assert.equal(result.ok, true);
  assert.equal(result.tasks.filter(t => t.completed).length, 3);
  assert.equal(demoTasks[1].completed, false);
});
check("удаление сохраняет порядок", () => {
  const result = removeTask(demoTasks, 7);
  assert.deepEqual(result.tasks.map(t => t.id), [1, 4, 10]);
});
check("вариант 1 имеет шесть задач", () => {
  assert.deepEqual(variantTasks.map(t => t.id), [11, 23, 37, 41, 58, 64]);
  assert.equal(getTaskStats(variantTasks).progress, 0);
});
check("вариантный сценарий", () => {
  let tasks = variantTasks.map(t => ({ ...t }));
  tasks = setTaskCompleted(tasks, 23, true).tasks;
  tasks = removeTask(tasks, 37).tasks;
  assert.deepEqual(tasks.map(t => t.id), [11, 23, 41, 58, 64]);
  assert.equal(getTaskStats(tasks).progress, 20);
});
check("findTaskById получает актуальную запись", () => {
  assert.equal(findTaskById(demoTasks, 4).title, "Подготовить модель задач");
});

console.log(`Проверок пройдено: ${passed}.`);
