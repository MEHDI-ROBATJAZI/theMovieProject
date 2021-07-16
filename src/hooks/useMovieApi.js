import useFetch from "./useFetch";


const useMovieApi = (apiEndPoint , query={})=>{
  return useFetch(`https://api.themoviedb.org/3/${apiEndPoint}` , {
    api_key:"cbaf0bf3f1b90c479d4e805aa371f6cb",
    page:1,
    ...query
  })
}


export default useMovieApi