const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCounter = document.getElementById("task-counter");
const dateTimeEl = document.getElementById("date-time");
const themeToggleBtn = document.querySelector(".theme-toggle");

function addTask() {
  if (inputBox.value.trim() === "") {
    alert("Please write something!");
    return;
  }

  let li = document.createElement("li");
  li.textContent = inputBox.value;

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  listContainer.appendChild(li);
  inputBox.value = "";
  inputBox.focus();

  saveData();
  updateCounter();
}

listContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
    updateCounter();
    checkAllCompleted();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.classList.add("removed");
    setTimeout(() => {
      e.target.parentElement.remove();
      saveData();
      updateCounter();
    }, 400);
  }
});

function saveData() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("tasks") || "";
  updateCounter();
}

function updateCounter() {
  let count = listContainer.querySelectorAll("li:not(.checked)").length;
  taskCounter.textContent = `${count} task${count !== 1 ? "s" : ""} pending`;
}

function checkAllCompleted() {
  let allChecked =
    listContainer.querySelectorAll("li").length > 0 &&
    listContainer.querySelectorAll("li.checked").length ===
      listContainer.querySelectorAll("li").length;
  if (allChecked) {
    confettiEffect();
  }
}

function confettiEffect() {
  alert("🎉 All tasks completed! 🎉");
}

// Show only date (no time)
function updateDate() {
  const now = new Date();
  dateTimeEl.textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
updateDate();

function toggleTheme() {
  document.body.classList.toggle("dark");
  themeToggleBtn.classList.add("clicked");
  setTimeout(() => themeToggleBtn.classList.remove("clicked"), 500);
}

showTask();
