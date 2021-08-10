import { Image } from 'antd'
import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'

const Page404 = () => {

  const width = useWindowSize()
  
  return (
    <div>
    <div style={{
      minHeight:"60vh",
      textAlign:"center",

      
    }}>
        <Image 
          width={
            width > 768 ? "700px" : "400px"
          }
          height={
            width>768 ? "400px" : "300px"
          }
          src="/404.png"
          preview={false}
        />


    </div>
    </div>
  )
}

export default Page404
