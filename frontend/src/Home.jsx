import React,{useState} from 'react';

import Create from './Create.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
function Home() {
    const [todos, setTodos] = useState([]);
    const fetchTodos = () => {
    axios.get("https://deploying-backend-gact.onrender.com/get")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  };

    useEffect(()=>{
      fetchTodos();
    }, []);
    const checked=async(id)=>{
      console.log("clicked")
      axios.put("https://deploying-backend-gact.onrender.com/update/"+id)
      .then(() => fetchTodos()) 
      .catch(err=>console.log(err));
    }
    const deleted=async(id)=>{
      axios.delete("https://deploying-backend-gact.onrender.com/delete/"+id)
      .then(() => fetchTodos()) 
      .catch(err=>console.log(err));
    }
  return (
    <div className="home">
      <h1>Todo List</h1>
      <Create />
      {
        todos.length === 0 ? <p>No todos available</p> :  
        todos.map(todo => (
          <div className='task'>
            <div className="checkbox">
             
              <p className={todo.done?"f check":"f"}>{todo.task}</p>
              
             
            </div>
            <div>
             <button className='delete' onClick={()=>deleted(todo._id)}>Delete</button>
              <button className={todo.done?"round checkround":"default_round round "}  onClick={()=>checked(todo._id)}>{todo.done?"Marked":"Mark"}</button>
            </div>
            </div>
        ))
      }
    </div>
  );
}

export default Home;