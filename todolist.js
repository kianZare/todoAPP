let todos = [];
let filterValue = "all";

// selection
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");

// events
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

// functions
function addNewTodo(e) {
  e.preventDefault();

  if (!todoInput.value) return null;
  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };
  todos.push(newTodo);
  filterTodos();
}

function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
      <p class="todo__title ${todo.isCompleted && "completed"}">${
      todo.title
    }</p>
      <span class="todo__createdAt">${new Date(
        todo.createdAt
      ).toLocaleDateString()}</span>
      <button class="todo__check" data-todo-id=${
        todo.id
      }><i class="far fa-check-square"></i></button>
      <button class="todo__remove" data-todo-id=${
        todo.id
      }><i class="far fa-trash-alt"></i></button>
      </li>
      `;
  });
  todoList.innerHTML = result;
  todoInput.value = "";

  const removeBtn = [...document.querySelectorAll(".todo__remove")];
  removeBtn.forEach((btn) => btn.addEventListener("click", removeTodo));

  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodo));
}

function filterTodos(e) {
  // const filter = e.target.value;
  switch (filterValue) {
    case "all": {
      createTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((t) => !t.isCompleted);
      createTodos(filteredTodos);
      break;
    }

    default:
      createTodos(todos);
      break;
  }
}

function removeTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  filterTodos();
}

function checkTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  filterTodos();
}
