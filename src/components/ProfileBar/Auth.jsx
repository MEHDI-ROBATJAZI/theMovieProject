import Title from '../../Seo/Title'
import React,{useEffect,useContext} from 'react'
import { useLocation,useHistory } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import UserService from '../../service/UserService'
const Auth = () => {
  const {setSessionId} = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  const requestToken = new URLSearchParams(location.search).get("request_token")

  useEffect(() => {
    if(requestToken){
      
    UserService.createRequestSession(requestToken).then(data=>{
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
      <Title
          title="Auth Page"
          description="detail for your favorate-movie"
        />
      <h1 style={centerMessage}>
        Your Authentication Is Here !!!
      </h1>
    </div>
  )
}

export default Auth
