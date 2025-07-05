let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "all") return true;
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      li.innerHTML = `
        <span onclick="toggleTask(${index})">${task.text}</span>
        <button onclick="deleteTask(${index})">❌</button>
      `;
      list.appendChild(li);
    });
}

function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();

  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    input.value = "";
  } else {
    alert("Please enter a task!");
  }
}


function deleteTask(index) {
  const list = document.getElementById("task-list");
  const li = list.children[index];

  li.classList.add("fade-out");

  li.addEventListener("animationend", () => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  });
}


// function deleteTask(index) {
//   tasks.splice(index, 1);
//   saveTasks();
//   renderTasks();
// }

// function toggleTask(index) {
//   tasks[index].completed = !tasks[index].completed;
//   saveTasks();
//   renderTasks();
// }

// function filterTasks(filter) {
//   renderTasks(filter);
// }

// // Initial render
// renderTasks();
