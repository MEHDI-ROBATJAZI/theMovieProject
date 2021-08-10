import React, { useEffect, useState, useContext } from "react";
import AccountService from "../../../service/AccountService";
import { UserContext } from "../../../context/UserContext";
import { DeleteFilled, MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Badge, Button, Input, Modal, Tooltip,Typography } from "antd";
const {Text} = Typography

const List = (props) => {
  const { user } = useContext(UserContext);
  const [ListItems, setListItems] = useState([]);

  const GetListItems = async () => {
    try {
      const lists = await AccountService.GetAccountLists(user.id);
      setListItems(lists.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetListItems();
  }, [user]);

  const RemoveAList = async (listId) => {
    try {
      await AccountService.RemoveList(listId);
      GetListItems();
      Modal.success({ content: "your list removed correctly" });
    } catch (error) {
      console.error(error);
    }
  };

  const [showInputButton, changeShowInputButton] = useState(false);
  const [newListNameInput, setNewListNameInput] = useState("");
  const [newListDescInput, setNewListDescInput] = useState("");
  const AddNewList =async()=>{
    if(newListNameInput && newListDescInput){
      const resp = await AccountService.AddNewList(newListNameInput,newListDescInput)
      if(resp.success){
        GetListItems()
        Modal.success({content:"your list addedd successfully to our database"})
        changeShowInputButton(false)
        setNewListNameInput("")
        setNewListDescInput("")
      }
    }else{
      alert("please fill all inputs")
    }
  }

  return (
    <div>
      <div id="addListNameContainer">
      <div id="showInputButtonContainer">
        {
        showInputButton ? (
          (<MinusCircleFilled 
            style={{ fontSize: "2rem", lineHeight: "60px" }}
            onClick={() => changeShowInputButton(!showInputButton)}/>
          )
          ):
          <PlusCircleFilled
            style={{ fontSize: "2rem", lineHeight: "60px" }}
            onClick={() => changeShowInputButton(!showInputButton)}
          />

      }
      </div>
      {showInputButton &&(
        
      <div id="addNewListContainer">

        <Input onChange={(e)=>setNewListNameInput(e.target.value)} value={newListNameInput} className="InputAddNewList" type="text" placeholder="your list name" /> 
        <Input onChange={(e)=>setNewListDescInput(e.target.value)} value={newListDescInput} className="InputAddNewList" type="text" placeholder="list description" /> 
        <Button 
          block
          type="primary"
          disabled={newListDescInput && newListNameInput ?false :true}
          onClick={()=>AddNewList()}
        >Add
        </Button>
      </div>)}
      </div>
      <div id="ListboxContainer">
        {ListItems.map((item) => (
          <div
          key={item.id} className="ListBox">
            <Badge count={item.item_count}>
            <Tooltip placement="bottom" title={item.description}>
              <Text 
              
              disabled = {item.item_count === 0 ? true : false }
              onClick={() => props.listSelection(item.id)}>{item.name}</Text>
            </Tooltip>
            </Badge>
            <DeleteFilled
              className="deleteIcon"
              onClick={() => RemoveAList(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
 