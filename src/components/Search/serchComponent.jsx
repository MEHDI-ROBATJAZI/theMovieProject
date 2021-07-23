import React, { useEffect, useState } from "react";
import { Input, AutoComplete } from "antd";
import { UserOutlined } from "@ant-design/icons";
import classes from "./Search.module.scss";
import useDelayFetch from "../../hooks/useDelayFetch";

const { Search } = Input;

const renderTitle = (title) => (
  <span>
    {title}
    <a
      style={{
        float: "right",
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
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});

// const options = [
//   {
//     label: renderTitle("Libraries"),
//     options: [
//       renderItem("AntDesign", 10000),
//       renderItem("AntDesign UI", 10600),
//     ],
//   },
//   {
//     label: renderTitle("Solutions"),
//     options: [
//       renderItem("AntDesign UI FAQ", 60100),
//       renderItem("AntDesign FAQ", 30010),
//     ],
//   },
//   {
//     label: renderTitle("Articles"),
//     options: [renderItem("AntDesign design language", 100000)],
//   },
// ];

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const debuncedQuery = useDelayFetch(query, 1000);
  const [data, setData] = useState([]);

  // const onSearch = (value) => console.log(value);
  useEffect(() => {
    if (debuncedQuery) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=cbaf0bf3f1b90c479d4e805aa371f6cb&language=en-US&query=${debuncedQuery}&page=1&include_adult=false`
      )
        .then((resp) => resp.json())
        .then((d) => setData(d.results));
    }
  }, [debuncedQuery]);

  console.log(data);

  const makeOptions = () => {
    if(debuncedQuery.length){

    return [
        {
          label: renderTitle("Movies"),
          options: data.filter(d=>d.media_type === "movie").map(movie=>renderItem(movie.title,movie.id))
        },
        {
          label: renderTitle("Persons"),
          options: data.filter(d=>d.media_type === "person").map(movie=>renderItem(movie.title,movie.id))
        },
        {
          label: renderTitle("Tv Shows"),
          options: data.filter(d=>d.media_type === "tv").map(movie=>renderItem(movie.title,movie.id))
        },
      ];
    }
  };

  return (
    <div id={classes.SearchComponentStyles}>
      <AutoComplete
        dropdownClassName={classes.certainCategorySearchDropdown}
        options={makeOptions()}
        >
        <Search
          id={classes.SearchInput}
          placeholder="input search text"
          loading={false}
          // onSearch={onSearch}
          onChange={(e) => setQuery(e.target.value)}
          enterButton
        />
      </AutoComplete>
    </div>
  );
};

export default SearchComponent;
