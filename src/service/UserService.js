import Request from "../helpers/service";

const createRequestToken =()=>{
  return Request.get({path:"authentication/token/new"})

}


const createRequestSession=(request_token)=>{
  return Request.post({path:"authentication/session/new"},{
    request_token
  })
}



const UserService = {
  createRequestToken,
  createRequestSession
}


export default UserService