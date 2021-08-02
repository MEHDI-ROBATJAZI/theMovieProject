import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { Radio, Card } from "antd";
import { Link } from "react-router-dom";
import "./profile.scss";
const url = "https://api.themoviedb.org/3/account/";

const Lists = ({ state }) => {
  const { session_id, user } = useContext(UserContext);
  const [radio, setRadio] = useState("movies");
  const [data, setData] = useState([]);

  const onChange = (e) => {
    setRadio(e.target.value);
  };

  const GetData = () => {
    fetch(
      `${url}${user.id}/${state}/${radio}?api_key=cbaf0bf3f1b90c479d4e805aa371f6cb&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`
    )
      .then((resp) => resp.json())
      .then((d) => setData(d.results));
  };

  useEffect(() => {
    GetData();
  }, [session_id, user, radio]);

  return (
    <>
      <Radio.Group onChange={onChange} value={radio}>
        <Radio value={"movies"}>Movie</Radio>
        <Radio value={"tv"}>Tv</Radio>
      </Radio.Group>
      {data && (
        <div id="FavCards">
          {data.map((movie) => (
            <Card key={movie.id} bordered={false} className="favCards">
                <Link
                  to={`/movieDetails/${movie.id}?flag=${
                    radio === "movies" ? "movie" : "tv"
                  }`}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    width="130px"
                    height="160px"
                    className={"fav-card-img"}
                  />
                </Link>
                <div id="movie_info">
                  {radio === "movies" ? (
                    <p>
                      title <span>{movie.title}</span>
                    </p>
                  ) : (
                    <p>
                      name <span>{movie.name}</span>
                    </p>
                  )}

                  {radio === "movies" ? (
                    <p>
                      release date <span>{movie.release_date}</span>
                    </p>
                  ) : (
                    <p>
                      first air date <span>{movie.first_air_date}</span>
                    </p>
                  )}

                  <p>
                    vote_average <span>{movie.vote_average}</span>
                  </p>

                  {state === "rated" && (
                    <p>
                      your rate{" "}
                      <span style={{ background: "orange" }}>
                        {movie.rating}
                      </span>
                    </p>
                  )}
                </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default Lists;
