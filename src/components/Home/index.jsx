import React, { useEffect, useState } from "react";
import {
  Alert,
  Row,
  Col,
  Card,
  Pagination,
  Tabs,
  Image,
  Spin,
  Tag,
  Radio,
} from "antd";
import useMovieApi from "../../hooks/useMovieApi";
import { Link } from "react-router-dom";
import classes from "./home.module.scss";
import "./home.css";
import Title from "../../Seo/Title";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
const { Meta } = Card;

const { TabPane } = Tabs;

const Home = () => {
  const [tabState, setTabState] = useState("popular");
  const { data, error, reFetch, loading } = useMovieApi(`movie/${tabState}`);

  const [dataType, setDataType] = React.useState("movie");
  const { data: ApiGenres, loading: genreLoading } = useMovieApi(`genre/movie/list`);
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
    }
  };
  useEffect(() => {
    changeGenre();
  }, [data]);

  useEffect(() => {
    reFetch(`https://api.themoviedb.org/3/${dataType}/${tabState}`);
    changeGenre();
    setActiveGenre({ id: 0, name: "no filter" });
  }, [tabState, dataType]);

  const reloadData = (p) => {
    reFetch(`https://api.themoviedb.org/3/${dataType}/${tabState}`, {
      page: p,
    });
    // window.scrollTo({ top: 0, behavior: "smooth" });
    changeGenre();
    setActiveGenre({ id: 0, name: "no filter" });
  };

  const changeDataType = (e) => {
    setDataType(e.target.value);
  };

  const [eyeState, setEyeState] = useState(true);

  return (
    <div>
      {error !== "" && (
        <Alert
          message="Warning"
          description="please check your Interent and Vpn Connection"
          type="warning"
          showIcon
          closable
        />
      )}
      <Title title="Home" description="main page" />
      <Radio.Group
        onChange={changeDataType}
        value={dataType}
        id={classes.RadioGroup}
      >
        <Radio value={"movie"}>Movies</Radio>
        <Radio value={"tv"}>Tv Shows</Radio>
      </Radio.Group>
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
          {
            dataType === "movie" ? 
            <TabPane tab="upcoming" key="upcoming" /> : 
            <TabPane tab="on_the_air" key="on_the_air" />
          }
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
            {data && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  paddingTop: "60px",
                }}
              >
                <div
                  style={{ display: ActiveGenre.id !== 0 ? "block" : "none" }}
                  onClick={() => setEyeState(!eyeState)}
                >
                  {eyeState ? (
                    <EyeInvisibleOutlined
                      style={{ fontSize: "2rem", color: "green" }}
                    />
                  ) : (
                    <EyeOutlined style={{ fontSize: "2rem", color: "blue" }} />
                  )}
                </div>
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
            <div>
              <Row
                justify="center"
                gutter={[20, 30]}
                className={classes.CardsContainer}
              >
                {data?.results?.map((movie) => (
                  <Col
                    style={
                      ActiveGenre.id &&
                        !movie.genre_ids.includes(ActiveGenre.id) &&
                        eyeState === false && { padding: "0 0" } || {
                        padding: "0 10px",
                      }
                    }
                    key={movie.id}
                    span={{ xs: 24, sm: 12, md: 8, lg: 6 }}
                  >
                    <Link to={`/movieDetails/${movie.id}?flag=${dataType}`}>
                      <Card
                        hoverable
                        style={{ width: 240 }}
                        className={
                          (ActiveGenre.id &&
                            !movie.genre_ids.includes(ActiveGenre.id) &&
                            eyeState === true &&
                            "BlurFilter") ||
                          (ActiveGenre.id &&
                            !movie.genre_ids.includes(ActiveGenre.id) &&
                            eyeState === false &&
                            "CardFilter")
                        }
                        cover={
                          <Image
                            preview={false}
                            alt={
                              dataType === "movie"
                                ? movie.original_title
                                : movie.name
                            }
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          />
                        }
                      >
                        <Meta
                          title={
                            dataType === "movie"
                              ? movie.original_title
                              : movie.name
                          }
                          description={
                            dataType === "movie"
                              ? movie.release_date
                              : movie.first_air_date
                          }
                        />
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
