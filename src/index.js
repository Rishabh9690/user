const express= require('express');
const bodyParser= require('body-parser');
const route= require('./routes/route');
const mongoose= require('mongoose');
const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017", {useNewUrlParser: true})
.then(()=>{console.log("MongoDb connected")})
.catch((err)=>{console.log(err)});

app.use('/', route);
app.listen(5050, ()=>{
    console.log("Express is connected");
});