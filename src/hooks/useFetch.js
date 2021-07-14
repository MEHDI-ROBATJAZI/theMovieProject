import { useEffect , useState } from "react";


const useFetch = (url , query , method="GET")=>{

  const [data,setData] = useState(undefined)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)


  const reFetch=(URL=url ,ExtraQuery={})=>{

    const newQuery = {...query,...ExtraQuery}

    const queryParams = Object.keys(newQuery).length ? new URLSearchParams(newQuery).toString() : null



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
  },[])

  return {data,loading,error,reFetch}

}



export default useFetch