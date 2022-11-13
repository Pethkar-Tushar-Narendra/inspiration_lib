import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from '../../Components/Card';
import AddTodoToggle from '../../Components/models/AddTodoToggle';
import { Store } from '../../Store';
import './todocss.css';

function TodolistScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { todoList } = state;
  let tempList = todoList;
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const deleteTodo = (index) => {
    tempList.splice(index, 1);
    ctxDispatch({ type: 'SAVE_TODO', payload: tempList });
    localStorage.setItem('todoList', JSON.stringify(tempList));
  };

  const save = (taskObj) => {
    tempList.push(taskObj);
    ctxDispatch({ type: 'SAVE_TODO', payload: tempList });
    localStorage.setItem('todoList', JSON.stringify(tempList));
  };
  return (
    <>
      {console.log(todoList)}
      <div className="header text-center">
        <h1>Todo List</h1>
        <Button className="btn btn-primary mt-2" onClick={toggle}>
          Create Todo
        </Button>
      </div>
      <div className="task-container">
        {todoList &&
          todoList.map((todo, i) => (
            <Card key={i} taskObj={todo} index={i}></Card>
          ))}
      </div>
      <AddTodoToggle modal={modal} toggle={toggle} save={save} />
    </>
  );
}

export default TodolistScreen;
