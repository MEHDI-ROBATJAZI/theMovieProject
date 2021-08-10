import React, { useState, useEffect } from "react";
import { SelectOutlined } from "@ant-design/icons";
import { Tooltip, Modal, Input, Button } from "antd";
import AccountService from "../../../service/AccountService";
import "./Bar.scss";

const ListModal = ({ accountId, movieId }) => {
  const [Lists, setAccountLists] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeListItem, setActiveListItem] = useState(0);
  const [showInputs, setShowInputs] = useState(false);
  const [NewListNameInput , setNewListNameInput] = useState("")
  const [NewListDescriptionInput , setNewListDescriptionInput] = useState("")

  const showModal = async () => {
    const lists = await AccountService.GetAccountLists(accountId);
    setAccountLists(lists.results);

    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const response = await AccountService.AddMovieToList(
        activeListItem,
        movieId
      );
      if(response.success){
        Modal.success({
          content: `your movie successfully added to your list`,
        });
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const ActiveMovie = (event, listId) => {
    const BlockLists = document.getElementsByClassName("BlockList");
    for (const b of BlockLists) {
      b.style.background = "rgb(255, 227, 227)";
    }
    event.target.style.background = "rgb(91, 255, 50)";
    setActiveListItem(listId);
  };

  const NewList = async() =>{
    if(!NewListDescriptionInput || !NewListNameInput){
      alert('please fill all inputs')
    }else{
      try {
        const resp = await AccountService.AddNewList(NewListNameInput , NewListDescriptionInput)
        if(resp.success){
          Modal.success({
            content: `your New List successfully added to our database`,
          });
          setNewListDescriptionInput("")
          setNewListNameInput("")
          const lists = await AccountService.GetAccountLists(accountId);
          setAccountLists(lists.results);

        }else{
          Modal.error({content:`some error has happend`})
        }
      } catch (error) {
        console.error(error);
      }
    }
  }


  return (
    <div>
      <Tooltip placement="bottom" title={"add to your list"}>
        <SelectOutlined onClick={showModal} />
      </Tooltip>
      <Modal
        title="Your Lists"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div id="NewListContainer">
        <Button type="primary" onClick={()=>setShowInputs(!showInputs)}>{showInputs ? `X`:`Add New List ?` }</Button>
        <div style={showInputs===false ?{display:"none"} : {display:"block"}}>
          <Input placeholder="list name" value={NewListNameInput} onChange={(e)=>setNewListNameInput(e.target.value)} />
          <Input placeholder="list description" value={NewListDescriptionInput} onChange={(e)=>setNewListDescriptionInput(e.target.value)} />
        <Button type="danger" onClick={()=>NewList()}>add new list</Button>
        </div>
        </div>
        {Lists.map((list) => (
          <div
            onClick={(event) => ActiveMovie(event, list.id)}
            className="BlockList"
            key={list.id}
          >
            {list.name}
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default ListModal;
