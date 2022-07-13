// selectors:
const todoInput = document.querySelector(".todo-input");
const addTodoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterTodos = document.querySelector(".filter-todos");

// event listeners:
addTodoBtn.addEventListener("click", addTodoFunction);
todoList.addEventListener("click", checkRemoveFunction);
filterTodos.addEventListener("click", filterTodosFunction);
document.addEventListener("DOMContentLoaded", getLocalTodos);

// functions:
function addTodoFunction(e) {
  e.preventDefault(); //! submit
  
  // create new todo
  // add to dom
  // get todo value
  // reset input

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = `<li>${todoInput.value}</li>
  <span><i class="fa-solid fa-circle-check"></i></span>
  <span><i class="fa-solid fa-trash"></i></span>`;
  todoDiv.innerHTML = newTodo;
  todoList.appendChild(todoDiv);
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}

function checkRemoveFunction(e) {
  const targetElement = e.target;
  const todo = targetElement.parentElement.parentElement;
  const targetClassList = [...targetElement.classList]; //! convert an DOMTokenList to Array

  targetClassList.includes("fa-trash")
    ? (removeLocalTodos(todo), removeLocalCheckTodos(todo), todo.remove())
    : targetClassList.includes("fa-circle-check")
    ? (todo.classList.toggle("todo-check"), savedLocalCheckTodos(todo))
    : "";
}

function filterTodosFunction(e) {
  // const todos = [...document.querySelectorAll(".todo")];
  const todos = [...todoList.childNodes];
  const filterTodosValue = e.target.value;

  todos.forEach((todo) => {
    const todoCheck = todo.classList.contains("todo-check");

    todo.style.display = "flex";
    filterTodosValue === "uncompleted" && todoCheck
      ? (todo.style.display = "none")
      : filterTodosValue === "completed" && !todoCheck
      ? (todo.style.display = "none")
      : "";
  });
}

// ! _local storage:
function saveLocalTodos(todo) {
  // localStorage.getItem("todos");
  // localStorage.setItem("todos", JSON.stringify(todos));

  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function savedLocalCheckTodos(savedTodo) {
  let savedCheckTodos = localStorage.getItem("checkTodos")
    ? JSON.parse(localStorage.getItem("checkTodos"))
    : [];

  savedCheckTodos.every((t) => t !== savedTodo.children[0].innerText)
    ? savedCheckTodos.push(savedTodo.children[0].innerText)
    : savedCheckTodos.pop(savedTodo.children[0].innerText);

  localStorage.setItem("checkTodos", JSON.stringify(savedCheckTodos));
}

function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  let savedCheckTodos = localStorage.getItem("checkTodos")
    ? JSON.parse(localStorage.getItem("checkTodos"))
    : [];

  savedTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    savedCheckTodos.some((checkTodo) => checkTodo === todo)
      ? todoDiv.classList.add("todo-check")
      : "";

    const newTodo = `<li>${todo}</li>
    <span><i class="fa-solid fa-circle-check"></i></span>
    <span><i class="fa-solid fa-trash"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  filetrSavedTodos = savedTodos.filter(
    (savedTodo) => savedTodo !== todo.children[0].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filetrSavedTodos));
}

function removeLocalCheckTodos(savedTodo) {
  let savedCheckTodos = localStorage.getItem("checkTodos")
    ? JSON.parse(localStorage.getItem("checkTodos"))
    : [];
  filterSavedCheckTodos = savedCheckTodos.filter(
    (savedCheckTodo) => savedCheckTodo !== savedTodo.children[0].innerText
  );
  localStorage.setItem("checkTodos", JSON.stringify(filterSavedCheckTodos));
}
