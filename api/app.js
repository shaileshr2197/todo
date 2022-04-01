require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');

const port = process.env.port;
const auth = require('./middleware/auth');
const routes = require('./routes');
const not = require('./module/notification');


const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(auth);


mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+process.env.DB_NAME).
then(c=>console.log('DB connected successfully ')).
catch(err=>console.log(err));

routes.forEach((route)=>{
    app.use(route.path,route.module);
})

var task = cron.schedule('5 * * * * *',()=>{
    console.log('cron', new Date().toLocaleTimeString());
    not();
})

app.listen(port,()=>{
    task.start();
    console.log('server started')
})