import Request from "../helpers/service";

const GetDetails = ()=>{
  return Request.get({path:"account"})
}

const MarkAsFavorate = (account_id , movie_id , media_type , addFavorite)=>{
  return Request.post({path:`account/${account_id}/favorite`},{
    "media_type": media_type,
    "media_id": Number(movie_id),
    "favorite": addFavorite
  })
}


const MarkInWatchList = (account_id , movie_id ,media_type,addWatchList)=>{
  return Request.post({path:`account/${account_id}/watchlist`},{
    "media_type": media_type,
    "media_id": Number(movie_id),
    "watchlist": addWatchList
  })
}

const UserRate = (media_type , movie_id, value)=>{
  return Request.post({path:`${media_type}/${movie_id}/rating`},{
    value
  }) 
}

const DeleteUserRate=(media_type,movie_id)=>{
  return Request.delete({path:`${media_type}/${movie_id}/rating`})
}

const AccountService = {
  GetDetails,
  MarkAsFavorate,
  MarkInWatchList,
  UserRate,
  DeleteUserRate
}


export default AccountService