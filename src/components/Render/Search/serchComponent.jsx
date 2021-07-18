import React, { useEffect ,useState } from "react";
import { Input, AutoComplete } from "antd";
import { UserOutlined } from '@ant-design/icons';
import classes from "./Search.module.scss";
import useDelayFetch from "../../../hooks/useDelayFetch";

const renderTitle = (title) => (
  <span>
    {title}
    <a
      style={{
        float: 'right',
      }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);

const renderItem = (title, count) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});

const options = 
  data.map(obj=>{
    {
      label: renderTitle("person"),
      options:()=>{ 
        const persons = obj.filter(p=>p.media_type === "person")
        // return  [renderItem("AntDesign design language", 100000)],

    }
    },
  {
    label: renderTitle("movie"),
    
    options : obj.filter(m=>m.media_type==="movie")
    // options: [
      // renderItem("AntDesign", 10000),
      // renderItem("AntDesign UI", 10600),
    // ],
  },
  {
    label: renderTitle("tv shows"),
    options :
    // options: [
    //   renderItem("AntDesign UI FAQ", 60100),
    //   renderItem("AntDesign FAQ", 30010),
    // ],
  },

})

const { Search } = Input;

const SearchComponent = () => {
  
  const [query,setQuery] = useState('')
  const debuncedQuery = useDelayFetch(query , 500)
  const [data,setData] = useState([])


  const makeOptions = ()=>{
    if(data.lenght && query){
      return [
        {
            label:renderTitle("Movies"),
            options:data
              .filter()
              .map()      
        },
        {
            label:renderTitle("Tv Shows"),
            options:data
              .filter()
              .map()      
        },
        {
             label:renderTitle("People"),
             options:data
              .filter()
              .map()       
        }

      ]
    }
  }

  
  // const onSearch = (value) => console.log(value);
  useEffect(()=>{
  if(debuncedQuery){
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=cbaf0bf3f1b90c479d4e805aa371f6cb&language=en-US&query=${debuncedQuery}&page=1&include_adult=false`)
      .then(resp=>resp.json())
      .then(d=>setData(d.results))
    }
  },[debuncedQuery])



  return (
    <div id={classes.SearchComponentStyles}>
    <AutoComplete
      dropdownClassName={classes.certainCategorySearchDropdown}
      options={options}
    >
      <Search
        placeholder="input search text"
        loading={false}
        // onSearch={onSearch}
        onChange={(e)=>setQuery(e.target.value)}
        enterButton
      />
    </AutoComplete> 

    </div>
  )
}

export default SearchComponent;
