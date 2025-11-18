import React, { useState, useEffect } from "react";
import Create from "./Create.jsx";
import axios from "axios";
import "./App.css";

function Home() {
  const [todos, setTodos] = useState([]);
  

  const fetchTodos = async () => {
   
    try {
      const result = await axios.get("https://deploying-backend-gact.onrender.com/get");
      setTodos(result.data);
    } catch (err) {
      console.log(err);
    }
    
  };
  
  useEffect(() => {
    fetchTodos();
  }, []);

  const checked = async (id) => {
    try {
      await axios.put(
        "https://deploying-backend-gact.onrender.com/update/" + id
      );
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };
  const deleted = async (id) => {
    try {
      await axios.delete(
        "https://deploying-backend-gact.onrender.com/delete/" + id
      );
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <h1>Todo List</h1>
      
      <Create  callFunction={fetchTodos}  />

     <h1>My Tasks</h1>
       <table border="1">
  <tr>
    <th>Name</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
  
  

      {
        todos.map((todo) => (
          <tr>
            <td><div className="task"><p className="task-name">{todo.task}</p><p className="date">{new Date(todo.startAt).toLocaleString()}</p></div></td>
            
            <td><div><p className={todo.done ? "Green" : "red"}>{`${todo.done ? "Done" : "Pending"}`}</p>
            {todo.done && <p className="date">{new Date(todo.completedAt).toLocaleString()}</p>}</div></td>
            
            <td> 
              
              <div className="delete" onClick={() => deleted(todo._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>
</div>

              
              {!todo.done&&(<div onClick={() => checked(todo._id) }><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg></div>)}
              
              </td>
         
        </tr>))
}
</table>
    </div>
  );
}

export default Home;
