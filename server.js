//Common code create App to MongoDB users
const express = require("express"); //backend package import to variable
const mongoose = require("mongoose");  //to connect db
const bodyParser =  require("body-parser"); //to convert json format to js object
const cors = require("cors"); //import cors to use as middleware

const app = express();

//import routes
const postRoutes = require('./routes/posts.js');

//App middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use("/post",postRoutes);


const PORT = 8060;
const MONGODB_URL = "mongodb+srv://it22341204:Malmi123@cluster0.apom3mt.mongodb.net/student_db?retryWrites=true&w=majority";

//MongoDB connection
mongoose.connect(MONGODB_URL
    //,{
   //options
   // useCreateIndex : true, 
   // useNewUrlParser :true,
   // useUnifiedTopology : true,
   // useFindAndModify : false }
)
.then(() => {
    console.log(`Mongodb Connection Success!!`);
   
})
.catch((error) => {
    console.log(`Mongodb Connection Error!!`,error);
})

app.listen(PORT,() =>{
    console.log(`Server is up and running on port number : ${PORT}`);
})

