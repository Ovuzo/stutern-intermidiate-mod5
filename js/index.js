
// Initialize the todo list from local storage, or use an empty array if there is no saved data
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

// Display the todo list items in the DOM
displayTodoList();

function addTodo() {
  let todoInput = document.getElementById("todoInput");
  let todoListElement = document.getElementById("todoList");

  // Get the todo item text from the input field
  let todoItemText = todoInput.value.trim();
  if (todoItemText === "") {
    // Don't add empty todo items to the list
    return;
  }

  let todoItem = {
    text: todoItemText,
    completed: false
  };

  // Add the new todo item to the beginning of the todo list array
  todoList.unshift(todoItem);

  // Add the new todo item to the beginning of the todo list in the DOM
  let todoListItemElement = createTodoListItemElement(todoItem);
  todoListElement.insertBefore(todoListItemElement, todoListElement.firstChild);

  // Save the updated todo list to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));

  // Reset the input field
  todoInput.value = "";
}

function removeTodoItem(todoItem) {
  let todoListElement = document.getElementById("todoList");

  // Remove the todo item from the todo list array
  todoList = todoList.filter(function(item) {
    return item !== todoItem;
  });

  // Remove the corresponding list item element from the DOM
  let todoListItemElement = todoListElement.firstChild;
  while (todoListItemElement) {
    if (todoListItemElement.todoItem === todoItem) {
      todoListElement.removeChild(todoListItemElement);
      break;
    }
    todoListItemElement = todoListItemElement.nextSibling;
  }

  // Save the updated todo list to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function createTodoListItemElement(todoItem) {
  let todoListItemElement = document.createElement("li");
  todoListItemElement.todoItem = todoItem;
  let todoListItemTextElement = document.createTextNode(todoItem.text);
  let todoListItemRemoveButtonElement = document.createElement("button");
  todoListItemRemoveButtonElement.innerText = "Remove";
  todoListItemRemoveButtonElement.onclick = function() {
    removeTodoItem(todoItem);
  };
  todoListItemElement.appendChild(todoListItemTextElement);
  todoListItemElement.appendChild(todoListItemRemoveButtonElement);
  return todoListItemElement;
}

function displayTodoList() {
  let todoListElement = document.getElementById("todoList");
  // Clear the current todo list in the DOM
  todoListElement.innerHTML = "";
  // Create and append a list item element for each todo item in the todo list array
  todoList.forEach(function(todoItem) {
    let todoListItemElement = createTodoListItemElement(todoItem);
    todoListElement.appendChild(todoListItemElement);
  });
}