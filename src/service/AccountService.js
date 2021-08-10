import Request from "../helpers/service";

const ProfilePageRequest = (url,id,state,radio,session)=>{
  return Request.get(`${url}${id}/${state}/${radio}?api_key=cbaf0bf3f1b90c479d4e805aa371f6cb&session_id=${session}&language=en-US&sort_by=created_at.asc&page=1`)
}



const GetProfileDetails = ()=>{
  return Request.get({path:"account"})
}


const MarkAsFavorite = (account_id , movie_id , media_type , addFavorite)=>{
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


const GetAccountLists = (accountId)=>{
  return Request.get({path:`account/${accountId}/lists`})
}

const AddMovieToList = (listId,movieId)=>{
  return Request.post({path:`list/${listId}/add_item`},{
    media_id:movieId
  })
}
const AddNewList = (name,description)=>{
  return Request.post({path:`list`},{
      name,
      description,
      language: "en"
    
  })
}
const GetListData =(listId)=>{
  return Request.get({path:`list/${listId}`})
}
const Remove_A_List = (listId)=>{
  return Request.delete({path:`list/${listId}`})
}

const Remove_A_MovieFromList=(listId,movieId)=>{
  return Request.post({path:`list/${listId}/remove_item`},{
    media_id:movieId
  })
}

const AccountService = {
  ProfilePageRequest,
  GetProfileDetails,
  MarkAsFavorite,
  MarkInWatchList,
  UserRate,
  DeleteUserRate,
  GetAccountLists,
  AddMovieToList,
  AddNewList,
  GetListData,
  RemoveList:Remove_A_List, 
  RemoveMovieFromList:Remove_A_MovieFromList

}


export default AccountService