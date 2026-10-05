import { getTaskStats } from "./task-service.js";

const priorityLabels = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
};

export function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = `task-card${task.completed ? " is-completed" : ""}`;
  item.dataset.taskId = String(task.id);

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;

  const status = document.createElement("p");
  status.className = "task-status";
  status.textContent = task.completed ? "Выполнена" : "В работе";

  const priority = document.createElement("p");
  priority.className = "task-priority";
  priority.textContent = priorityLabels[task.priority];

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.dataset.action = "toggle";
  toggle.setAttribute("aria-pressed", String(task.completed));
  const toggleLabel = document.createElement("span");
  toggleLabel.className = "action-label";
  toggleLabel.textContent = "Выполнена";
  toggle.append(toggleLabel);

  const remove = document.createElement("button");
  remove.type = "button";
  remove.dataset.action = "delete";
  const removeLabel = document.createElement("span");
  removeLabel.className = "action-label";
  removeLabel.textContent = "Удалить";
  remove.append(removeLabel);

  actions.append(toggle, remove);
  item.append(title, status, priority, actions);
  return item;
}

export function renderTaskList(listElement, tasks) {
  listElement.replaceChildren(...tasks.map(createTaskElement));
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  const stats = getTaskStats(tasks);
  summaryElement.querySelector('[data-stat="total"]').textContent = String(stats.total);
  summaryElement.querySelector('[data-stat="completed"]').textContent = String(stats.completed);
  summaryElement.querySelector('[data-stat="pending"]').textContent = String(stats.pending);
  summaryElement.querySelector('[data-stat="progress"]').textContent = `${stats.progress.toFixed(1)}%`;
  summaryElement.querySelector('[data-stat="visible"]').textContent = String(visibleCount);
}

export function renderEmptyState(messageElement, total, visibleCount) {
  if (visibleCount > 0) {
    messageElement.textContent = "";
    messageElement.hidden = true;
    return;
  }
  messageElement.textContent = total === 0
    ? "Список задач пуст."
    : "Нет задач по выбранному фильтру.";
  messageElement.hidden = false;
}
