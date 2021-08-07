import React,{useState,useEffect} from 'react'
import AccountService from '../service/AccountService'
const UserContext = React.createContext({})

const UserContextProvider =({children})=>{

  const getLocalStorageSessionId = ()=>{
    const session = window.localStorage.getItem("session_id") 
    if(session){
      return session
    }else{
      return {}
    }
  }

  const [user,setUser] = useState({})
  const [session_id,setSessionId] = useState(getLocalStorageSessionId)
  useEffect(async()=>{
    try{
      if(session_id){

        window.localStorage.setItem("session_id" , session_id)
        
        const data = await AccountService.GetProfileDetails()
        setUser(data)
      }else{
        setUser({})
      }
    
    }catch(error){
      setUser({})
      console.error(error);
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