import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import useMovieApi from "../../hooks/useMovieApi";
import { Image, Tabs, Collapse, Rate, Tag, Spin } from "antd";
import "./MovieDetails.scss";
import { SwiperSlide } from "swiper/react";
import MySlider from "../Utils/mySlider";
import Title from "../../Seo/Title";
import { UserContext } from "../../context/UserContext";
const { TabPane } = Tabs;
const { Panel } = Collapse;

// import Swiper core and required modules
import Bar from "../ProfileBar/Bar";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";

const MovieDetails = () => {
  const { user } = useContext(UserContext);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const { id } = useParams();
  const { data, loading } = useMovieApi(`/${query.get("flag")}/${id}`, {
    append_to_response: "videos,images",
    include_image_language: "en",
  });
  const { data: credits = {}, loading: castLoading } = useMovieApi(
    `/movie/${id}/credits`
  );
  const [imageState, setImageState] = useState([]);
  const [videoState, setVideoState] = useState([]);
  const [castState, setCastState] = useState([]);

  useEffect(() => {
    // console.log(data);
    const filteredImages = data?.images?.posters?.filter((img, index) => {
      if (index <= 4) {
        return img;
      }
    });
    setImageState(filteredImages);

    const filteredVideos = data?.videos?.results?.filter((vid, index) => {
      if (index <= 3) {
        return vid;
      }
    });
    setVideoState(filteredVideos);

    const filteredCredits = credits?.cast?.filter((cast, index) => {
      if (index < 12) {
        return cast;
      }
    });
    setCastState(filteredCredits);
  }, [data, credits]);

  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  return (
    <div id="container">
      <Title
        title="Movie Detail"
        description="detail for your favorate-movie"
      />
      {loading ? (
        <div id="SpinContainer">
          <Spin></Spin>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            backgroundImage: [
              `linear-gradient(to right, rgb(126 221 164 / 70%) 150px, rgb(255 202 106 / 58%) 100%)`,
              `url(
              "https://image.tmdb.org/t/p/w500${data.poster_path}"
            )`,
            ],
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <div id="logoStyle">
            {data?.images?.logos[0] && (
              <Image
                preview={false}
                src={`https://image.tmdb.org/t/p/w500${data?.images?.logos[0].file_path}`}
                alt={"no image"}
              />
            )}
            <Rate
              className="RateStyles"
              disabled={true}
              allowHalf
              defaultValue={data.vote_average / 2}
              character={({ index }) => customIcons[index + 1]}
            />
            <div className="TagStyles disable-select">
              {data.genres &&
                data.genres.map((genre) => (
                  <Tag key={genre.id} className="genre" color="success">
                    {genre.name}
                  </Tag>
                ))}
            </div>
          </div>
          <div>{user.id && <Bar id={id} media_type={query.get("flag")} />}</div>
          <div className="cardContainer">
            <Tabs
              className="disable-select"
              animated={true}
              type="card"
              centered
            >
              <TabPane className="glassMorphism" tab="images" key="1">
                {/* movie images */}
                <MySlider slidesPerView={5}>
                  <div>
                    {imageState?.map((img) => (
                      <SwiperSlide key={img.file_path}>
                        <Image
                          preview={false}
                          src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                        />
                      </SwiperSlide>
                    ))}
                  </div>
                </MySlider>
              </TabPane>
              <TabPane className="glassMorphism" tab="trailers" key="2">
                {/* trailer */}
                <div>
                  <MySlider slidesPerView={1}>
                    {videoState?.map((vid) => (
                      <SwiperSlide
                        key={vid.id}
                        style={{ background: "none", textAlign: "center" }}
                      >
                        <iframe
                          allowfullscreen="allowfullscreen"
                          mozallowfullscreen="mozallowfullscreen"
                          msallowfullscreen="msallowfullscreen"
                          oallowfullscreen="oallowfullscreen"
                          webkitallowfullscreen="webkitallowfullscreen"
                          className="trailerIframeStyles"
                          width="80%"
                          src={`https://www.youtube.com/embed/${vid.key}`}
                        ></iframe>
                      </SwiperSlide>
                    ))}
                  </MySlider>
                </div>
              </TabPane>
              <TabPane
                className="glassMorphism"
                className="tabPaneStyles"
                tab="informations"
                key="3"
              >
                {/* information */}
                <Collapse
                  bordered={false}
                  style={{ maxWidth: "600px", margin: "auto" }}
                >
                  <Panel header="Title" key="1">
                    {query.get("flag") === "movie" ? (
                      <strong>{data.title}</strong>
                    ) : (
                      <strong>{data.name}</strong>
                    )}
                  </Panel>
                  <Panel header="Overview" key="2">
                    <strong>{data.overview}</strong>
                  </Panel>
                  <Panel header="Release date" key="3">
                    {query.get("flag") === "movie" ? (
                      <strong>{data.release_date}</strong>
                    ) : (
                      <strong>{data.first_air_date}</strong>
                    )}
                  </Panel>
                </Collapse>
              </TabPane>
              <TabPane className="glassMorphism" tab="cast" key="4">
                {/* cast  */}

                <MySlider slidesPerView={4}>
                  {castLoading ? (
                    <div className="spinContainer">
                      <Spin />
                    </div>
                  ) : (
                    <>
                      {castState?.map((cast, index) => (
                        <div key={cast.id + "" + index}>
                          {cast.profile_path && (
                            <SwiperSlide span={6}>
                              <Link to={`/celebrity/${cast.id}`}>
                                <Image
                                  preview={false}
                                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                                />
                              </Link>
                            </SwiperSlide>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </MySlider>
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
