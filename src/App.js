import React, { useState } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import { useRef } from 'react';

      function Todolist() {
      const [todo, setTodo] = useState({description: '', date: '', priority:''});
      const [todos, setTodos] = useState([]);

      const gridRef= useRef();

      const columns= [
        { headerName: "Description", field: "description", sortable: "true", filter: "true"},
        { headerName: "Date", field: "date", sortable: "true", filter: "true" },
        { headerName: "Priority", field: "priority", sortable: "true", filter: "true",
        cellStyle:params=> params.value===  "High"? {color:'red'}: {color:'black'} 
      }
      ]

      const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});
      }

      const addTodo = (event) => {
      setTodos([...todos, todo]);
      setTodo({description: '', date: '', priority: ''}); 
      }

      const deleteTodo = () => {
        setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex))
      }

  return (
    <div>
    <header className="header">
      <h1>TodoList</h1>
    </header>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
      <input type="text" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
      <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
    <div className="ag-theme-material" style={{height: '700px', width: '70%', margin: 'auto'}}>
      <AgGridReact
        ref= {gridRef}
        onGridReady={ params => gridRef.current = params.api}
        rowSelection="single"
        floatingFilter={true}
        animateRows={true}
        columnDefs={columns}
        rowData={todos}>
        </AgGridReact>
    </div>
    </div>
  );
};

export default Todolist;
    
