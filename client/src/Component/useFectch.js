import { useState, useEffect } from "react";
 

const useFetch = (url) =>{
 const [data, setData ]= useState(null);
 const [loading, setLoading ]= useState(true);
 const [handleError, setHandleError] = useState(null);


 useEffect(()=>{
  const abortcort = new AbortController();
  fetch(url, {signal: abortcort.signal})
  .then(res=>{
   if(!res.ok){
    throw Error ("There is an issue with the api!")
   }else{
    return res.json();
   }
  })
  .then(result =>{
   setData(result);
   setLoading(false);
   setHandleError(null)
   })
   .catch((err)=>{
    if(err.name === "AbortError"){
     console.log(
      "fetch aborted!")
    }else{
     setHandleError(err.message);
     setLoading(false);
    }
   
   
   }); 
   return ()=>abortcort.abort();
  }, [url]);


return {data, loading, handleError};
}
export default useFetch;