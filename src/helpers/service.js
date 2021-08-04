const options = (body , method)=> {
  return {
    method , 
    headers : {
      "Content-Type":"application/json"
    },
    ...(body &&  {body : JSON.stringify(body)})
  }
}

function URL (url){
  if(typeof url === "string"){
    // string
    return url
  }else{
    // object

    const session_id = window.localStorage.getItem("session_id")

    const CustomQuery = {
      api_key : "cbaf0bf3f1b90c479d4e805aa371f6cb",
      ...(session_id && {session_id}),
      ...url.query
    }

    const queryParams = new URLSearchParams(CustomQuery).toString()

    return `https://api.themoviedb.org/3/${url.path}?${queryParams}`
  }
}


const Http = (url , body , method)=>{

  return new Promise((resolve,reject)=>{

    fetch(URL(url) , options(body,method))
      .then(resp=>resp.json())
      .then(resolve)
      .catch(reject)

  })
}

const Request = {
  get :(url)=> Http(url , null , "GET") ,
  post :(url,body)=> Http(url , body , "POST"),
  delete :(url,body=null)=> Http(url , body , "DELETE")
}

export default Request