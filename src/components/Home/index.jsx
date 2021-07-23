import React, { useEffect, useState } from "react";
import { Row, Col, Card, Pagination, Tabs, Image, Spin, Tag } from "antd";
import useMovieApi from "../../hooks/useMovieApi";
import { Link } from "react-router-dom";
import classes from "./home.module.scss";
import "./home.css";
// import { UserOutlined } from "@ant-design/icons";

const { Meta } = Card;

const { TabPane } = Tabs;

const Home = () => {
  const [tabState, setTabState] = useState("popular");
  const { data, error, reFetch, loading } = useMovieApi(`movie/${tabState}`);
  const { data: ApiGenres, loading: genreLoading } =
    useMovieApi(`genre/movie/list`);
  const [MoviesId, setMoviesId] = useState([]);
  const [ActiveGenre, setActiveGenre] = useState({});

  const changeGenre = () => {
    if (!loading) {
      const arr = data.results.map((movie) => movie.genre_ids);
      // movie id
      const Mid = [];

      for (const ids of arr) {
        for (const id of ids) {
          Mid.push(id);
        }
      }
      const myids = Array.from(new Set(Mid));

      setMoviesId(myids);
      console.log(myids);
    }
  };
  useEffect(() => {
    changeGenre();
  }, [data]);

  useEffect(() => {
    reFetch(`https://api.themoviedb.org/3/movie/${tabState}`);
    changeGenre();
    setActiveGenre({ id: 0, name: "no filter" });
  }, [tabState]);

  const reloadData = (p) => {
    reFetch(`https://api.themoviedb.org/3/movie/${tabState}`, { page: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
    changeGenre();
    setActiveGenre({ id: 0, name: "no filter" });
  };

  return (
    <div>
      <div className={classes.TabsStyle}>
        <Tabs
          size="large"
          centered={true}
          defaultActiveKey="1"
          onChange={(k) => {
            setTabState(k);
          }}
        >
          <TabPane tab="popular" key="popular" />
          <TabPane tab="upcoming" key="upcoming" />
          <TabPane tab="top rated" key="top_rated" />
        </Tabs>
      </div>

      <div className={classes.HomeGlassMorphism}>
        {loading ? (
          <div className="spinContainer">
            <Spin />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Tag
              className="TagStyle"
              color="green"
              onClick={() => setActiveGenre({ id: 0, name: "no filter" })}
            >
              no filter
            </Tag>
            {!genreLoading &&
              MoviesId.length &&
              ApiGenres.genres.map(
                (genre) =>
                  // console.log(genre);
                  MoviesId.includes(genre.id) && (
                    <Tag
                      className="TagStyle"
                      key={genre.id}
                      color={ActiveGenre.id === genre.id ? "blue" : "red"}
                      onClick={() => setActiveGenre(genre)}
                    >
                      {genre.name}
                    </Tag>
                  )
              )}
            <div>
              <Row
                justify="center"
                gutter={[20, 30]}
                className={classes.CardsContainer}
              >
                {data?.results?.map((movie) => (
                  <Col key={movie.id} span={{ xs: 24, sm: 12, md: 8, lg: 6 }}>
                    <Link to={`/movieDetails/${movie.id}`}>
                      <Card
                        hoverable
                        style={{ width: 240 }}
                        className={
                          ActiveGenre.id &&
                          !movie.genre_ids.includes(ActiveGenre.id) &&
                          classes.BlurFilter
                        }
                        cover={
                          <Image
                            preview={false}
                            alt={movie.title}
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          />
                        }
                      >
                        <Meta
                          title={movie.original_title}
                          description={movie.release_date}
                        />
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>

              {data && (
                <div
                  style={{
                    textAlign: "center",
                    paddingTop: "60px",
                  }}
                >
                  <Pagination
                    defaultCurrent={1}
                    pageSize={1}
                    showSizeChanger={false}
                    showQuickJumper={true}
                    total={data.total_pages}
                    onChange={(page) => {
                      reloadData(page);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
