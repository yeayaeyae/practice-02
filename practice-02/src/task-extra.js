export function searchTasks(tasks, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === "") return [...tasks];

  return tasks.filter((task) =>
    task.title.toLowerCase().includes(normalizedQuery)
  );
}
