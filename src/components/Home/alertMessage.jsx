import React,{useEffect , useState} from 'react'
import { Alert } from 'antd'

const AlertMessage = ({loading}) => {

  const [showAlert ,setShow] = useState(false)

  useEffect(()=>{
    if(loading===true){
      console.log(loading);
      setTimeout(()=>{
        if(loading===true){
          setShow(true)

        }
      },3000)
    }
  },[])



  return (
    <div>
      {showAlert === true ? (
        <Alert
          message="Warning"
          description="please check your Interent and Vpn Connection"
          type="warning"
          showIcon
          closable
        />
      ):(
        <div></div>
      )} 
    </div>
  )
}

export default AlertMessage
