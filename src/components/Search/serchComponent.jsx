import React, { useEffect, useState } from "react";
import { Input, AutoComplete, Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import classes from "./Search.module.scss";
import useDelayFetch from "../../hooks/useDelayFetch";
import { Link } from "react-router-dom";

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

const renderItem = (media_type, title, id, profile_path) => ({
  value: title,
  label: (
    <Link
      to={
        (media_type === "movie" && `/movieDetails/${id}?flag=movie`) ||
        (media_type === "tv" && `/movieDetails/${id}?flag=tv`) ||
        (media_type === "person" && `/celebrity/${id}`)
      }
    >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
        {title}
      {profile_path && (
        <Avatar
        size="medium"
        icon={
          <Image
          preview={false}
          src={`https://image.tmdb.org/t/p/w200${profile_path}`}
          />
        }
        ></Avatar>
        )}
    </div>
        </Link>
  ),
});

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const debuncedQuery = useDelayFetch(query, 1000);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (debuncedQuery) {
      setData([])
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=cbaf0bf3f1b90c479d4e805aa371f6cb&language=en-US&query=${debuncedQuery}&page=1&include_adult=false`
      )
        .then((resp) => resp.json())
        .then((d) => setData(d.results));
    }
  }, [debuncedQuery]);

  const makeOptions = () => {
    if (data.length, query) {
      return [
        {
          label: renderTitle("Persons"),
          options: data
            .filter((d) => d.media_type === "person")
            .map((person) =>
              renderItem(
                person.media_type,
                person.name,
                person.id,
                person.profile_path
              )
            ),
        },
        {
          label: renderTitle("Movies"),
          options: data
            .filter((d) => d.media_type === "movie")
            .map((movie) =>
              renderItem(movie.media_type, movie.title, movie.id)
            ),
        },
        {
          label: renderTitle("Tv Shows"),
          options: data
            .filter((d) => d.media_type === "tv")
            .map((tv) => renderItem(tv.media_type, tv.name, tv.id)),
        },
      ];
    }
  };

  return (
    <div id={classes.SearchComponentStyles}>
      <AutoComplete
        dropdownClassName={classes.certainCategorySearchDropdown}
        options={makeOptions()}
        onSearch={v=> {setData([]) ; setQuery(v)}}
      >
        <Search
          id={classes.SearchInput}
          placeholder="input search text"
          loading={false}
          // onChange={(}
          enterButton
        />
      </AutoComplete>
    </div>
  );  
};

export default SearchComponent;
