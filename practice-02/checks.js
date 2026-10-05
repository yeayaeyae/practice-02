import assert from "node:assert/strict";
import { demoTasks, variantTasks } from "./src/data.js";
import {
  createTask, findTaskById, getPendingTasks, getTaskTitles, getTaskStats,
  addTask, setTaskCompleted, renameTask, removeTask
} from "./src/task-service.js";
import { searchTasks } from "./src/task-extra.js";

let passed = 0;
function check(name, fn) {
  fn();
  console.log(`OK: ${name}`);
  passed += 1;
}

check("createTask создаёт задачу", () => {
  const r = createTask(20, "Новая задача", "high");
  assert.deepEqual(r, { ok: true, task: { id: 20, title: "Новая задача", completed: false, priority: "high" } });
});
check("createTask использует medium по умолчанию", () => {
  assert.equal(createTask(1, "Тест").task.priority, "medium");
  assert.equal(createTask(1, "Тест", undefined).task.priority, "medium");
});
check("createTask нормализует название и валидирует ошибки", () => {
  assert.equal(createTask(1, "  Проверить  данные  ").task.title, "Проверить  данные");
  for (const args of [[1, ""], [1, " ".repeat(3)], [1, "x".repeat(101)], [1, 42], [0, "x"], ["4", "x"], [1, "x", "urgent"]]) {
    assert.equal(createTask(...args).ok, false);
  }
  assert.equal(createTask(Number.MAX_SAFE_INTEGER, "x").ok, true);
  assert.equal(createTask(Number.MAX_SAFE_INTEGER + 1, "x").ok, false);
});
check("findTaskById ищет по id", () => {
  assert.equal(findTaskById(demoTasks, 4), demoTasks[1]);
  assert.equal(findTaskById(demoTasks, "4"), undefined);
});
check("getPendingTasks использует отдельный массив", () => {
  const r = getPendingTasks(demoTasks);
  assert.deepEqual(r.map(t => t.id), [4, 7]);
  assert.notEqual(r, demoTasks);
});
check("getTaskTitles возвращает названия", () => {
  assert.deepEqual(getTaskTitles(demoTasks), demoTasks.map(t => t.title));
});
check("getTaskStats считает сводку", () => {
  assert.deepEqual(getTaskStats(demoTasks), { total: 4, completed: 2, pending: 2, progress: 50 });
  assert.deepEqual(getTaskStats([]), { total: 0, completed: 0, pending: 0, progress: 0 });
});
check("addTask не мутирует входные данные", () => {
  const original = structuredClone(demoTasks);
  const r = addTask(demoTasks, 20, "Добавить", "high");
  assert.equal(r.ok, true);
  assert.deepEqual(demoTasks, original);
  assert.equal(r.tasks.length, 5);
});
check("addTask отклоняет дубликат", () => {
  const before = structuredClone(demoTasks);
  assert.equal(addTask(demoTasks, 4, "Дубликат").ok, false);
  assert.deepEqual(demoTasks, before);
});
check("setTaskCompleted обновляет только выбранную запись", () => {
  const r = setTaskCompleted(demoTasks, 4, true);
  assert.equal(r.ok, true);
  assert.equal(r.tasks[1].completed, true);
  assert.equal(demoTasks[1].completed, false);
  assert.notEqual(r.tasks, demoTasks);
  assert.notEqual(r.tasks[1], demoTasks[1]);
});
check("setTaskCompleted валидирует статус", () => {
  for (const value of ["false", 0, 1, null, undefined]) {
    assert.equal(setTaskCompleted(demoTasks, 4, value).ok, false);
  }
});
check("renameTask нормализует название", () => {
  const r = renameTask(demoTasks, 10, "  Новое имя  ");
  assert.equal(r.ok, true);
  assert.equal(r.tasks[3].title, "Новое имя");
  assert.equal(demoTasks[3].title, "Оформить README");
});
check("removeTask удаляет без мутации", () => {
  const before = structuredClone(demoTasks);
  const r = removeTask(demoTasks, 7);
  assert.equal(r.ok, true);
  assert.deepEqual(r.tasks.map(t => t.id), [1, 4, 10]);
  assert.deepEqual(demoTasks, before);
});
check("операции отклоняют отсутствующую задачу", () => {
  assert.equal(setTaskCompleted(demoTasks, 777, true).ok, false);
  assert.equal(renameTask(demoTasks, 777, "x").ok, false);
  assert.equal(removeTask(demoTasks, 777).ok, false);
});
check("вариант 1 содержит шесть задач и все приоритеты", () => {
  assert.deepEqual(variantTasks.map(t => t.id), [11, 23, 37, 41, 58, 64]);
  assert.deepEqual(new Set(variantTasks.map(t => t.priority)), new Set(["low", "medium", "high"]));
  assert.equal(getTaskStats(variantTasks).progress, 0);
});
check("поиск задач не мутирует массив", () => {
  const before = structuredClone(demoTasks);
  assert.equal(searchTasks(demoTasks, " ФУНК ")[0].id, 1);
  assert.deepEqual(searchTasks(demoTasks, "нет такого"), []);
  assert.deepEqual(demoTasks, before);
});

console.log(`Проверок пройдено: ${passed}.`);
