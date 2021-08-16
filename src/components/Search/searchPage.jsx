import React, { useState, useEffect } from "react";
import useDelayFetch from "../../hooks/useDelayFetch";
import { useParams } from "react-router";
import { Avatar, Input, Typography } from "antd";
import classes from "./Search.module.scss";
import Request from "../../helpers/service";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

const SearchPage = ({}) => {
  const [query, setQuery] = useState("");
  const debuncedQuery = useDelayFetch(query, 1000);
  const { text } = useParams();

  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(async () => {
    await setMovies([]);
    await setTvs([]);
    await setPersons([]);
    if (debuncedQuery) {
      try {
        const data = await Request.get(
          `https://api.themoviedb.org/3/search/multi?api_key=cbaf0bf3f1b90c479d4e805aa371f6cb&language=en-US&query=${debuncedQuery}&page=1&include_adult=false`
        );

        data.results.forEach((d) => {
          if (d.media_type === "movie") {
            setMovies((prevState) => [...prevState, d]);
          } else if (d.media_type === "tv") {
            setTvs((prevState) => [...prevState, d]);
          } else if (d.media_type === "person") {
            setPersons((prevState) => [...prevState, d]);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [debuncedQuery]);

  useEffect(() => {
    setQuery(text);
    window.history.replaceState({}, document.title, "/" + "search");
  }, [text]);

  return (
    <div id={classes.SearchPage}>
      <div id={classes.SearchHeader}>
        <h1>Search</h1>
        <Input
          placeholder="search in movies tv-shows and persons"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          id={classes.InputSearch}
        />
      </div>

      <div id={classes.board}>
        {movies.length !== 0 && (
          <div className={classes.banner}>
            <Text strong className={classes.bannerHeader}>
              movie
            </Text>
            <div className={classes.bannerBody}>
              {movies.map((movie) => (
                <Link
                  className={classes.bannerCard}
                  to={`/movieDetails/${movie.id}?flag=movie`}
                  key={movie.id}
                >
                  <Text>{movie.title}</Text>
                  <Avatar
                    size={64}
                    shape="square"
                    icon={
                      movie.poster_path ? (
                        <img
                          alt={"movie image not found"}
                          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                        />
                      ) : (
                        <img
                          alt={"movie image not found"}
                          src={`https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`}
                        />
                      )
                    }
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        {tvs.length !== 0 && (
          <div className={classes.banner}>
            <Text strong className={classes.bannerHeader}>
              tv shows
            </Text>
            
            <div className={classes.bannerBody}>
              {tvs.map((tv) => (
                <Link className={classes.bannerCard} to={`/movieDetails/${tv.id}?flag=tv`} key={tv.id}>
                  <Text key={tv.id}>
                    {tv.name}
                  </Text>
                  <Avatar
                    size={64}
                    shape="square"
                    icon={
                      tv.poster_path ? (
                        <img
                          alt={"tv show image not found"}
                          src={`https://image.tmdb.org/t/p/w200/${tv.poster_path}`}
                        />
                      ) : (
                        <img
                          alt={"tv show image not found"}
                          src={`https://image.tmdb.org/t/p/w200/${tv.backdrop_path}`}
                        />
                      )
                    }
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        {persons.length !== 0 && (
          <div className={classes.banner}>
            <Text strong className={classes.bannerHeader}>
              person
            </Text>
            <div className={classes.bannerBody}>
              {persons.map((person) => (
                <Link
                  key={person.id}
                  className={classes.bannerCard}
                  to={`/celebrity/${person.id}`}
                >
                  <Text>{person.name}</Text>
                  <Avatar
                    size="large"
                    style={{ marginTop: "10px" }}
                    icon={
                      person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`}
                        />
                      ) : (
                        <UserOutlined />
                      )
                    }
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
