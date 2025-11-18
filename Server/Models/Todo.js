const mongoose=require('mongoose');
const todoSchema=new mongoose.Schema({
    task:{
        type:String,
    },
    done:{
            type:Boolean,
            default:false
          
  },
  startAt: { type: Date },
  completedAt: { type: Date }
});

const todomodel=mongoose.model('Todo',todoSchema);
module.exports=todomodel;