import {useState,useEffect} from 'react'


const useResponsive = ()=>{

  const [width , setWidth] = useState(0)


  useEffect(()=>{
    setWidth(window.innerWidth)
  },[])

  window.addEventListener("resize",(e)=>{
    setWidth(e.target.innerWidth);
  })


  return width

}

export default useResponsive
