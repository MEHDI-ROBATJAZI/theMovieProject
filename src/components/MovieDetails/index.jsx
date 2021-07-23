import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useMovieApi from "../../hooks/useMovieApi";
import { Image, Row, Col, Tabs, Collapse, Rate, Button, Tag } from "antd";
import "./MovieDetails.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css";
import FileImageOutlined from "@ant-design/icons";
const { TabPane } = Tabs;
const { Panel } = Collapse;
// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation]);

const MovieDetails = () => {
  const { id } = useParams();
  const { data, loading } = useMovieApi(`/movie/${id}`, {
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
    <>
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <div
          style={{
            zIndex: 10,
            backgroundImage: [
              `linear-gradient(to right, #7edda4 150px, rgb(106 117 255 / 84%) 100%)`,
              `url(
              "https://image.tmdb.org/t/p/w500${data.poster_path}"
            )`,
            ],
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div id="logoStyle">
            <div>
              <Image
                preview={false}
                src={`https://image.tmdb.org/t/p/w500${data.images.logos[0].file_path}`}
                alt={"no image"}
              />
            </div>
            <Rate
              className="RateStyles"
              disabled={true}
              allowHalf
              defaultValue={data.vote_average / 2}
            />
          <div className="TagStyles">
            {data.genres &&
              data.genres.map((genre) => (
                  <Tag key={genre.id} className="genre" color="success">{genre.name}</Tag>
              ))}
          </div>
              </div>

          <div
            style={{ marginTop: "200px", padding: "30px 0" }}
            className="cardContainer"
          >
            <Tabs style={{ padding: "50px" }} animated={true} type="card" centered>
              <TabPane className="glassMorphism" tab="images" key="1">
                <Swiper spaceBetween={50} slidesPerView={4}>
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
                </Swiper>
              </TabPane>
              <TabPane className="glassMorphism" tab="trailers" key="2">
                <div>
                  <Swiper
                    className="mySwiper"
                    navigation={true}
                    spaceBetween={50}
                    slidesPerView={1}
                  >
                    {videoState?.map((vid) => (
                      <SwiperSlide key={vid.id} style={{ background: "none",textAlign:"center" }}>
                        <iframe
                          width="70%"
                          height="500"
                          src={`https://www.youtube.com/embed/${vid.key}`}
                        ></iframe>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </TabPane>
              <TabPane
                className="glassMorphism"
                tab="informations"
                key="3"
              >
                <Collapse bordered={false}>
                  <Panel header="Title" key="1">
                    <strong>{data.title}</strong>
                  </Panel>
                  <Panel header="Overview" key="2">
                    <strong>{data.overview}</strong>
                  </Panel>
                  <Panel header="Release date" key="3">
                    <strong>{data.release_date}</strong>
                  </Panel>
                </Collapse>
              </TabPane>
              <TabPane className="glassMorphism" tab="casts" key="4">
                <Swiper
                  className="mySwiper"
                  navigation={true}
                  spaceBetween={50}
                  slidesPerView={4}
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
    </>
  );
};

export default MovieDetails;
