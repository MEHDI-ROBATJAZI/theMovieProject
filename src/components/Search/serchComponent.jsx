import React, { useState } from "react";
import { Input,Button } from "antd";
import classes from "./Search.module.scss";
import { useHistory } from "react-router";
const SearchComponent = () => {


  const [data, setData] = useState([]);
  const history = useHistory()
  const startSearch=()=>{
    history.push(`/search/${data}`)
  }


  return (
    <div id={classes.SearchComponentStyles}>
        <Input
          value={data}
          id={classes.SearchInput}
          placeholder="input search text"
          loading={false}
          onChange={(e)=>setData(e.target.value)}
          onPressEnter={()=>startSearch()}
          >
        </Input>    
          <Button
            onClick={startSearch}
          >search</Button>
      </div>
  );
};

export default SearchComponent;
