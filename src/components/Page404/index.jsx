import { Image } from 'antd'
import React from 'react'

const Page404 = () => {
  return (
    <div>
    <div style={{
      height:"60vh",
      textAlign:"center",

      
    }}>
        <Image 
          width="70%"
          height="400px"
          src="/404.png"
          preview={false}
        />


    </div>
    </div>
  )
}

export default Page404
