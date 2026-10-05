function sum(a, b) {
  return a + b;
}

const square = (value) => {
  return value * value;
};

const originalTask = { title: "Учебная задача", completed: false };
const sameTask = originalTask;
sameTask.completed = true;

const tasks = [{ id: 1, title: "A" }, { id: 2, title: "B" }];
const copiedArray = [...tasks];
copiedArray.push({ id: 3, title: "C" });

const copiedObject = { ...originalTask, title: "Копия" };
const defaults = { priority: "medium", completed: false };
const custom = { ...defaults, priority: "high" };

function priorityLabel(priority = "medium") {
  return priority;
}

console.log("1.", sum(2, 3), sum("2", 3));
console.log("2.", square(4), typeof square(4));
console.log("3.", originalTask === sameTask, originalTask.completed);
console.log("4.", tasks !== copiedArray, tasks[0] === copiedArray[0]);
console.log("5.", copiedObject, custom);
console.log("6.", priorityLabel(), priorityLabel(undefined), priorityLabel(null), priorityLabel(""));
