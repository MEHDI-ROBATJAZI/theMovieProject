import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import useMovieApi from "../../hooks/useMovieApi";
import { Image, Row, Col, Tabs, Collapse, Rate, Button, Tag, Spin } from "antd";
import "./MovieDetails.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css";
import Title from "../../Seo/Title";

const { TabPane } = Tabs;
const { Panel } = Collapse;

// import Swiper core and required modules
import SwiperCore, { Navigation, Autoplay } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const MovieDetails = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const { id } = useParams();
  const { data, loading } = useMovieApi(`/${query.get("flag")}/${id}`, {
    append_to_response: "videos,images",
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

    const filteredVideos = data?.videos?.results.filter((vid, index) => {
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
            zIndex: 10,
            backgroundImage: [
              `linear-gradient(to right, rgb(126 221 164 / 70%) 150px, rgb(255 202 106 / 58%) 100%)`,
              `url(
              "https://image.tmdb.org/t/p/w500${data.poster_path}"
            )`,
            ],
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div id="logoStyle">
            {data.images.logos[0] && (
                <Image
                  preview={false}
                  src={`https://image.tmdb.org/t/p/w500${data.images.logos[0].file_path}`}
                  alt={"no image"}
                />
            )}
            <Rate
              className="RateStyles"
              disabled={true}
              allowHalf
              defaultValue={data.vote_average / 2}
            />
            <div className="TagStyles">
              {data.genres &&
                data.genres.map((genre) => (
                  <Tag key={genre.id} className="genre" color="success">
                    {genre.name}
                  </Tag>
                ))}
            </div>
          </div>

          <div
            style={{ marginTop: "200px", padding: "30px 0" }}
            className="cardContainer"
          >
            <Tabs
              animated={true}
              type="card"
              centered
            >


              <TabPane className="glassMorphism" tab="images" key="1">
              {/* movie images */}
                <Swiper
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={10}
                  slidesPerView={1}
                  breakpoints={{
                    "640": {
                      "slidesPerView": 2,
                      "spaceBetween": 20
                    },
                    "768": {
                      "slidesPerView": 3,
                      "spaceBetween": 40
                    },
                    "1024": {
                      "slidesPerView": 4,
                      "spaceBetween": 50
                    }
                  }}
                >
                  <div>
                    {imageState?.map((img) => (
                      <SwiperSlide key={img.file_path}>
                        <Image
                          preview={false}
                          src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                          // height="550px 
                        />
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </TabPane>
              <TabPane className="glassMorphism" tab="trailers" key="2">
                {/* trailer */}
                <div>
                  <Swiper
                    className="mySwiper"
                    navigation={true}
                    spaceBetween={50}
                    slidesPerView={1}
                   
                  >
                    {videoState?.map((vid) => (
                      <SwiperSlide
                        key={vid.id}
                        style={{ background: "none", textAlign: "center" }}
                      >
                        <iframe
                          className="trailerIframeStyles"
                          width="80%"
                          src={`https://www.youtube.com/embed/${vid.key}`}
                        >

                        </iframe>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </TabPane>
              <TabPane className="glassMorphism" tab="informations" key="3">
                {/* information */}
                <Collapse bordered={false} style={{width:"600px" , margin:"auto"}}>
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
                <Swiper
                autoplay={{
                  "delay": 2500,
                  "disableOnInteraction": false
                }} 
                  className="mySwiper"
                  navigation={true}
                  spaceBetween={50}
                  slidesPerView={1}
                  breakpoints={{
                    "640": {
                      "slidesPerView": 2,
                      "spaceBetween": 20
                    },
                    "768": {
                      "slidesPerView": 3,
                      "spaceBetween": 40
                    },
                    "1024": {
                      "slidesPerView": 4,
                      "spaceBetween": 50
                    }
                  }}
                >
                  {castState?.map((cast) => (
                    <SwiperSlide span={6} key={cast.id}>
                      <Link to={`/celebrity/${cast.id}`}>
                        <Image
                          preview={false}
                          src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                          height={500}
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
