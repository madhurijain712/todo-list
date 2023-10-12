import "./App.css";
// import styled from "styled-components";
import React, { useState } from "react";

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
// `;
// const div = styled.div`
//   display:inline-block;
//   flex: 1;
//   border: none;
//   background-color: teal;
//   color: white;
//   height: 30px;
//   width: 50px;
//   border-radius: 2px;
//   cursor: pointer;
// `;
// const Text = styled.input`
//   border: 2px solid #000;
// `;
// const TaskCount = styled.span`
//   margin: 10px;
// `;
// const Tasks = styled.div`
// `;
// const div = styled.li`
//     listStyle:"none";
//     text-decoration: "line-through";
// `;
function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const handleClick = () => {
    if (!input) {
      return;
    }
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        task: input,
        complete: false,
      },
    ]);
    setInput("");
  };
  const handleComplete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) {
        if (!task.complete) {
          //Task is pending, modifying it to complete and increment the count
          setCompletedTaskCount(completedTaskCount + 1);
        } else {
          //Task is complete, modifying it back to pending, decrement Complete count
          setCompletedTaskCount(completedTaskCount - 1);
        }
        item = { ...task, complete: !task.complete };
      } else item = { ...task };
      return item;
    });
    setTodoList(list);
  };
  console.log(todoList);
  return (
    <div>
      <div>
        <h2>Todo List</h2>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => handleClick()}>Add</button>
        <div>
          <span>
            <b>Pending Tasks {todoList.length - completedTaskCount}</b>
          </span>
          <br />
          <span>
            <b>Completed Tasks {completedTaskCount}</b>
          </span>
        </div>
        <div>
          <ul>
            {todoList.map((todo) => {
              return (
                <li
                  complete={todo.complete}
                  id={todo.id}
                  onClick={() => handleComplete(todo.id)}
                  style={{
                    listStyle: "none",
                    textDecoration: todo.complete && "line-through",
                  }}
                >
                  {todo.task}
                </li>
              );
            })}
          </ul>
        </div>
        <button
          onClick={() => {
            setTodoList([]);
            setCompletedTaskCount(0);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
