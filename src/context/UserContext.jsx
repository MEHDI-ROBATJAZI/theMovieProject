import React,{useState,useEffect} from 'react'
import AccountService from '../service/AccountService'
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
      
      AccountService.GetDetails().then(data=>setUser(data))
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