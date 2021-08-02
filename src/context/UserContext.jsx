import React,{useState,useEffect} from 'react'
const UserContext = React.createContext({})

const UserContextProvider =({children})=>{

  const getLocalStorageSessionId = ()=>{
    return window.localStorage.getItem("session_id")
  }

  const [user,setUser] = useState({})
  const [session_id,setSessionId] = useState(getLocalStorageSessionId)
  useEffect(()=>{
    if(session_id){
      window.localStorage.setItem("session_id" , session_id)

      fetch(`https://api.themoviedb.org/3/account?api_key=cbaf0bf3f1b90c479d4e805aa371f6cb&session_id=${session_id}`)
        .then(resp=>resp.json())
        .then(data=>setUser(data))

    }

  },[session_id])



  return (
    <UserContext.Provider value={{user,setUser,session_id,setSessionId}}>
      {
        children
      }
    </UserContext.Provider>
  )
}

export {UserContext , UserContextProvider}