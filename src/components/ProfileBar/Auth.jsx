import React,{useState,useEffect,useContext} from 'react'
import { useLocation,useHistory } from 'react-router-dom'

import { UserContext } from '../../context/UserContext'
const Auth = () => {
  const {setSessionId} = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  const requestToken = new URLSearchParams(location.search).get("request_token")
  const url ="https://api.themoviedb.org/3/" 

  useEffect(() => {
    if(requestToken){
    fetch(`${url}authentication/session/new?api_key=cbaf0bf3f1b90c479d4e805aa371f6cb`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        request_token : requestToken
      })
    })
      .then(resp=>resp.json())
      .then(data=>{
        console.log(data);
        setSessionId(data.session_id)
        history.replace("/")
      })
    }
  }, [])

  const centerMessage = {
    lineHeight:"40vh",
    textAlign:"center",
    width:"100%"
  }

  return (
    <div style={{height:"60vh"}}>
      <h1 style={centerMessage}>
        Your Authentication Is Here !!!
      </h1>
    </div>
  )
}

export default Auth
