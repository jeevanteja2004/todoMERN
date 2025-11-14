const mongoose=require('mongoose');
const todoSchema=new mongoose.Schema({
    task:{
        type:String,
    },
    done:{
            type:Boolean,
            default:false
        }
    
});
const todomodel=mongoose.model('Todo',todoSchema);
module.exports=todomodel;