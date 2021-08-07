import React,{useState,useEffect} from "react";
import { SelectOutlined } from "@ant-design/icons";
import { Tooltip , Modal } from "antd";
import AccountService from "../../../service/AccountService";
import "./Bar.scss"



const ListModal = ({accountId}) => {
  const [Lists , setAccountLists] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeListItem , setActiveListItem] = useState(0)

  const showModal = async() => {

    const lists = await AccountService.GetAccountLists(accountId)
    setAccountLists(lists.results)


    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  
  const ActiveMovie =(event , listId)=>{

    event.target.style.background = "rgb(91, 255, 50)"
    setActiveListItem(listId)

  }

  useEffect(() => {
    const BlockLists = document.getElementsByClassName('BlockLists');
    for(const b of BlockLists){
      console.log(b);
    }
  }, [activeListItem])


  return (
    <div>
      <Tooltip placement="bottom" title={"add to your list"}>
        <SelectOutlined  onClick={showModal} />
      </Tooltip>
      <Modal title="Your Lists" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {
          Lists.map(list=>(
            <div onClick={(event)=>ActiveMovie(event , list.id)} className="BlockList" key={list.id}>{list.name}</div>
          ))
        }

      </Modal>
    </div>
  );
};

export default ListModal;
