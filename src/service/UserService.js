import Request from "../helpers/service";

const createRequestToken =()=>{
  return Request.get({path:"authentication/token/new"})

}


const createRequestSession=(request_token)=>{
  return Request.post({path:"authentication/session/new"},{
    request_token
  })
}

const logoutUser =(session_id)=>{
  return Request.delete({path:"authentication/session"},{
    session_id
  })
}


const UserService = {
  createRequestToken,
  createRequestSession,
  logoutUser
}


export default UserService