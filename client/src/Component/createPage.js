import {useState} from "react";
import Axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import useFetch from "./useFectch";

const CreatePage = () => {
 const url ="http://localhost:3001/api";
 const urlInsert ="http://localhost:3001/insert";
 const urlUpdate ="http://localhost:3001/update";
 //const urlDelete ="http://localhost:3001/delete";



 const urlmongooe = "mongodb+srv://sodiq:sodiq12345@cluster0.4nvfeif.mongodb.net/?retryWrites=true&w=majority";
 const [filmName, setName] =useState('');
 const [filmReview, setReview] =useState('');
 const [updateName, setUpdatename] =useState('');

 const {data, loading, handleError} = useFetch(url);

//Send data to the server side
 const Addtodata=()=>{
 try{
  Axios.post(urlInsert,{
   filmName: filmName,
   filmReview: filmReview,
  }) 
 }catch(err){
  throw err;
 }
}
 
 
//Prevent Default behavoiurs function
  const HandleSubmit =(e)=>{
e.preventDefault();
  };

  //updating the input 
  const UpdateFunction=(id)=>{
   try{
    Axios.put(urlUpdate,{
     id: id,
     updateName: updateName,
    }) 
   }catch(err){
    throw err;
   } 
    
  }

  //Deteling from the database
  
  const DeleteFunction=(id)=>{
   try{
    Axios.delete( `http://localhost:3001/delete/${id}`) 
   }catch(err){
    throw err;
   } 
    
  }


  return(
   < div  className="w-1/2 p-8 bg-grey-900 m-auto shadow-lg ">
   <form onSubmit={HandleSubmit} className="">
    <div className= " m-auto">

    <div className="m-4" >
     <label htmlFor="FilmName" className="block text-grey-100 font-bold ">  FilmName</label>
     <input className=" block w-full h-11 border-grey-200 rounded-lg bg-grey-200 p-5 outline-none shadow-md "
      type="text" 
     onChange={(e)=>{  setName(e.target.value) }} />
     </div>

     <div className="m-4">
  <label htmlFor="FilmReview"  className="block text-grey-100 font-bold">  FilmReview</label>
  <input className=" block w-full h-11 border-grey-200 rounded-lg bg-grey-200 p-5 outline-none  shadow-md "
   type="text" 
  onChange={(e)=>{setReview(e.target.value) }} />
  </div>
  <div className="mx-auto w-full">
<button onClick={()=>{Addtodata()}} className="border p-2 w-40 bg-blue-800 text-white rounded-lg  shadow-lg ">Create</button>
</div>
</div>
   </form>

   <div>


<div className="container">
 {loading && <div>Loading...</div>}
 {handleError && <div>{handleError}</div>}

 {data &&(data.map((data, index)=>{
  return(
 <div key={index}className="mt-5">

  <div className=" flex justify-between  p-1 shadow-lg border">
<h3 className="inline text-lg font-mono font-bold  ">{data.filmName}</h3>
<h3 className="inline  text-lg font-mono font-bold">{data.filmReview}</h3>

<div>
 <AiFillDelete className="inline mr-2 " style={{color:"red"}}
 onClick={()=>{DeleteFunction(data._id)}}    />
 < BiEdit className="inline" style={{color:"green"}} 
  onClick={()=>{UpdateFunction(data._id)}}   />
</div>
</div>
<input className=" block w-full h-11 border-grey-200 
rounded-lg bg-grey-200 p-5 outline-none  shadow-md "
  type="text" 
 onChange={(e)=>{setUpdatename(e.target.value) }} />
</div>
  )
}) 
  )}

  
  
</div>
</div>
</div>

  )
  }
 
  export default CreatePage;
