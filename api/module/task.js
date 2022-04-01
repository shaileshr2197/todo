const express = require("express");
const tasks = require('../model/task.model');
const router = express.Router();

router.post('/',(req,res)=>{
    const {name,due,status} = req.body
    if(name && due){
        const newTask = new tasks({ name, due, status });
        newTask.save().then((tasks)=>{
            res.status(200).send({tasks})
        }).catch((err)=>res.status(500).send({err}))
    }
})

router.put('/',(req,res)=>{
    const {_id,name,due,status} = req.body;
    const taskD = new tasks({name,due,status});
    const uData = taskD.toObject();
    delete uData.id;
    tasks.updateOne({_id},{name,due,status},{ upsert: true }).then((tasks)=>{
        res.status(200).send({tasks})
    }).catch((err)=>res.status(500).send({err}))
})

router.get('/',(_req,res)=>{
    const response = {
        todo:[],
        completed:[]
    }
    tasks.find().then((data)=>{
        data.forEach((data)=>{
            data.status === 'completed' ? response.completed.push(data) : response.todo.push(data);
        })
        res.status(200).send({response});
    }).catch((err)=>{
        res.status(401).send({response:err});
    })
})

router.delete('/',(req,res)=>{
    const ids = req.body.ids;
    console.log(ids,req.body)
    tasks.deleteMany({_id:{$in:ids}}).then((data)=>{
        console.log(data);
        res.status(200).send({data});
    })
})

module.exports = router