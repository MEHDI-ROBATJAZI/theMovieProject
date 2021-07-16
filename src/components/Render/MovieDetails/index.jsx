import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMovieApi from "../../../hooks/useMovieApi";
import { Image, Row,Col, Tabs, Collapse } from "antd";
import "./movieDetail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css";

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
  const { data:credits={} , loading:castLoading } = useMovieApi(`/movie/${id}/credits`)
  console.log(credits);
  // const {images,videos} = data
  const [imageState, setImageState] = useState([]);
  const [videoState, setVideoState] = useState([]);
  const [castState,setCastState] = useState([])

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

    const filteredCredits = credits?.cast?.filter((cast,index)=>{
      if(index<12){
        return cast
      }
    })
    setCastState(filteredCredits)
  }, [data,credits]);

  return (
    <>
      {!loading && (
      
          <div
            style={{
              zIndex: 10,
              backgroundImage:[
              `linear-gradient(to right, rgb(78 21 76) 150px, rgb(189 222 47 / 84%) 100%)`
              ,`url(
              "https://image.tmdb.org/t/p/w500${data.poster_path}"
            )`],
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Image
              style={{ marginTop: "50px" }}
              preview={false}
              src={`https://image.tmdb.org/t/p/w500${data.images.logos[0].file_path}`}
            />
            <div style={{ marginTop: "200px" }} className="card-container">
              <Tabs style={{padding:"50px"}} animated={true} type="card">
                <TabPane className="glassMorphism" tab="images" key="1">
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={4}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                  >
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
                        <SwiperSlide
                          key={vid.id}
                          style={{ background: "none" }}
                        >
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
                <TabPane className="glassMorphism" tab="informations" key="3">
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
                <TabPane className="glassMorphism" tab="casts" key="4" >
                <Swiper
                      className="mySwiper"
                      navigation={true}
                      spaceBetween={50}
                      slidesPerView={4}
                    >
                      {

                        castState?.map(cast=>(
                          
                          <SwiperSlide span={6}>
                            <Image
                              preview={false}
                              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                              />
                              {/* <p>{cast.original_name}</p> */}
                          </SwiperSlide>
                        ))
                      }
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
