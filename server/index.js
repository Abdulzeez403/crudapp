const express =require("express");
const app = express();
const mongooseDB= require("mongoose");
const models = require("./models/User");
const cors = require("cors");
const port = 3001;



app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//const url = "mongodb+srv://Abdulazeezsodiq:ABDULAZ33Z@cluster1.yaohddx.mongodb.net/crud?retryWrites=true&w=majority";
const url = "mongodb+srv://sodiq:sodiq12345@cluster0.4nvfeif.mongodb.net/?retryWrites=true&w=majority";



mongooseDB.connect( url, 
 {useNewUrlParser: true}
 );

 // sending to the database
app.post("/insert", async(req, res) => {
 try{
  const Name  = req.body.filmName;
  const Review = req.body.filmReview;
  const film = new models({ filmName: Name, filmReview:  Review});
  await  film.save();
   res.send("Helo Earth!");
 }catch(err){
  console.log(err);
 }
}); 
 // Updating the  database value

app.put("/update", async(req, res) => {


 try{
  const id  = req.body.id;
  const updateName = req.body.updateName;
  await models.findById(id, (err, updateFunc )=>{
   updateFunc.filmName = updateName;
   updateFunc.save();
   res.send("Updated");
  })
  }
   catch(err){
  console.log(err);
 }
}); 


 // sending to the database
 app.get("/api", async(req, res) => {
  try{
   models.find({}, (err, result)=>{
    if(err){
    res.send(err);
   } else{
    res.send(result);
   }
    })  
  }catch(err){
   throw err ;
  }
 }); 


 //Deleting post 
 app.delete("/delete/:id", async (req, res)=>{
   const  id = req.params.id;
   await  models.findByIdAndRemove(id).exec();
   res.send("deleted");
 } )
app.listen(port, ()=>{
console.log("running server on por 3001");
});