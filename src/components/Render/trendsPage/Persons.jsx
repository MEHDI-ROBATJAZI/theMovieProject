import React, { useState } from "react";
import { Button, Space, Image, Row, Col } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import useMovieApi from "../../../hooks/useMovieApi";
import "./TrendsStyle.css"
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";

import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

const Persons = () => {
  const {
    data: persons = {},
    reFetch: refetchPersons,
    loading: PersonsLoading,
  } = useMovieApi(`trending/person/day`);
  console.log(persons);

  const dayButtonClick = () => {
    refetchPersons(`https://api.themoviedb.org/3/trending//person/day`);
  };

  const weekButtonClick = () => {
    refetchPersons(`https://api.themoviedb.org/3/trending//person/week`);
  };

  const [personDetail, setPersonDetail] = useState({});
  const showDetailPerson = (person) => {
    setPersonDetail(person)
  };

  return (
    <div>
      <Space style={{padding:"10px 0"}}>
        <h1>persons</h1>
        <Button type="dashed" shape="round" onClick={dayButtonClick}>
          day
        </Button>
        <Button type="dashed" danger shape="round" onClick={weekButtonClick}>
          week
        </Button>
      </Space>
      <Swiper
        spaceBetween={50}
        slidesPerView={5}
      >
        {PersonsLoading ? (
          <h1 style={{ textAlign: "center" }}>Loading</h1>
        ) : (
          persons.results.map((p) => (
            <SwiperSlide key={p.id} onClick={() => showDetailPerson(p)}>
              <div className="swiper-card-flex">
              <Image
                preview={false}
                height="250px"
                src={
                  p.profile_path === null
                    ? "/userIcon.png"
                    : `https://image.tmdb.org/t/p/w500${p.profile_path}`
                }
                alt={p.original_title}
              />
                <Space>
                <p>{p.name} ------</p>
                <p>{p.known_for_department}</p>
                </Space>
                </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
      {personDetail.name && (
        <Row>
          <Col span={12} style={{height:"600px" ,position:"relative"}}>
            <div style={{position:"absolute" , top:"50%" , left:"50%" ,transform:"translate(-50%,-50%)"}}>
            <h1>name : {personDetail.name}</h1>
            <h1>known for department : {personDetail.known_for_department}</h1>
            <h1>gender : {personDetail.gender === 1 ? "female" : 'male'}</h1>
            </div>
          </Col>
          <Col span={12} style={{marginTop:"40px"}} >
            <Swiper navigation={true} className="mySwiper">
              {personDetail?.known_for?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div style={{textAlign:"center"}}>
                  <h1>known with</h1>
                  <Image
                    height="600px"
                    preview={false}
                    alt={item.original_title}
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

          </Col>
        </Row>
      )}
    </div>
  );
};

export default Persons;
