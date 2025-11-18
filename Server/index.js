
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const todomodel=require('./Models/Todo');
const MONGODB_URI="mongodb+srv://jeevanteja334_db_user:todolist@cluster0.tkq7sku.mongodb.net/?appName=Cluster0";
const app=express();

app.use(cors( { methods:['GET','POST','PUT','DELETE'] }  ));
app.use(express.json());
mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(3001,()=>
    console.log('Server running on port 3001'));
})
.catch((err)=>{
    console.log('Error connecting to MongoDB:',err);
});


app.post('/add', async(req,res)=>{
    const task=req.body.task; 
    
    await todomodel.create({task:task,startAt:Date.now()})
    .then(result=>res.json(result))
    .catch(err=>res.status(500).json({error:'Failed to add task'}));
});
app.get('/get', async(req,res)=>{
    await todomodel.find()
    .then(result=>res.json(result))
    .catch(err=>res.status(500).json({error:'Failed to fetch tasks'}));
}); 
app.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    
    todomodel.findByIdAndUpdate({_id:id},{done:true, completedAt:Date.now()})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    todomodel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})