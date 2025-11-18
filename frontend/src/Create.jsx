import React,{useState} from 'react';
import axios from 'axios';
import './App.css';
function Create(props) {
  //https://deploying-backend-gact.onrender.com
  const [task,setTask]=useState("");
  const {callFunction}=props;
  const handleAdd=async()=>{
    axios.post("https://deploying-backend-gact.onrender.com/add",{task:task }  )  
    .then((res)=>{
    console.log(res.data);
    callFunction();
    } )
    .catch((err)=>console.log(err));
  }
  return (
    <div className='create_form'>
      <input type="text" name="" id="" placeholder='Enter Task' onChange={(e)=>setTask(e.target.value)}/>
      <button type='button' onClick={handleAdd}>Add Todo</button>
    </div>
  );
}

export default Create;