import React, {useState,useEffect} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  
  const [todoEditing, setTodoEditing] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
  
  useEffect(() => {
    if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);

  // Add the handlesubmit code here
  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById("todoAdd").value
    const newTodo = {
        id: new Date().getTime(),
        text: todo.trim(),
        completed: false
    };
    if (newTodo.text.length > 0) {
        setTodos([...todos].concat(newTodo));
    }
    else {
        alert("Enter a valid task.");
    }
    document.getElementById("todoAdd").value = ""
  }
  
  // Add the deleteToDo code here
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos)
  }
  
  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    setTodos(updatedTodos);
  }
  
  // Add the submitEdits code here
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
        if (todo.id === newtodo.id) {
            todo.text = document.getElementById(newtodo.id).value;
        }
        return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }
  
  // Counting completed tasks
  function countTasks() {
    let updatedTodos = [...todos].filter((todo) => todo.completed === true);
    return updatedTodos.length;
  }


return(
    <div id="todo-list">
        <h1>TODO LIST</h1>
            <h2 onLoad={countTasks}>
            You've got {todos.length} things to do and completed {countTasks()} so far! Get on it :)
            </h2>
            <form onSubmit={handleSubmit}>
                <input type="text" id='todoAdd'/>
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) => (
                <div className="todo" key={todo.id}>
                    <div className="todo-text">
                        {todo.id === todoEditing ?
                            (<input type="text" id={todo.id} defaultValue={todo.text}/>) :
                            (<div>{todo.text}</div>)
                        }    
                        <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>

                    </div>
                    <div className="todo-actions">
                        {todo.id === todoEditing ?
                            (<button id="todobutton" onClick={() => submitEdits(todo)}>Submit Edit</button>) :
                            (<button id="todobutton" onClick={() => setTodoEditing(todo.id)}>Edit</button>)
                        }
                    <button id="todobutton" onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                </div>
            ))}
    </div>)
}

export default App;
