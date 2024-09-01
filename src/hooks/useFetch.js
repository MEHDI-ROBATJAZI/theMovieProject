import { useEffect , useState } from "react";


const useFetch = (url , query , method="GET")=>{

  const [data,setData] = useState(undefined)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")


  const reFetch=(URL=url ,ExtraQuery={})=>{

    const newQuery = {...query,...ExtraQuery}
    
    const queryParams = Object.keys(newQuery).length ? new URLSearchParams(newQuery).toString() : null
    
    console.log("🚀 ~ reFetch ~ URL:", URL)
    console.log("🚀 ~ reFetch ~ newQuery:", newQuery)
    console.log("🚀 ~ reFetch ~ queryParams:", queryParams)


    fetch(`${URL}${`${queryParams ? `?${queryParams}` : ""}`}` ,{
      method,
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(resp=>resp.json())
    .then(setData)
    .catch(setError)
    .finally(()=>setLoading(false))
  }

  useEffect(()=>{
    reFetch(url , query)
  },[url])

  return {data,loading,error,reFetch}

}



export default useFetch