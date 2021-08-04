import React, { useState } from "react";
import { Button, Space, Image, Row, Col, Spin } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import MySlider from "../Utils/mySlider";
import useMovieApi from "../../hooks/useMovieApi";
import "./TrendsStyle.css";

import { Link } from "react-router-dom";


const Persons = () => {
  const {
    data: persons = {},
    reFetch: refetchPersons,
    loading: PersonsLoading,
  } = useMovieApi(`trending/person/day`);

  
  const dayButtonClick = () => {
    refetchPersons(`https://api.themoviedb.org/3/trending//person/day`);
  };
  
  const weekButtonClick = () => {
    refetchPersons(`https://api.themoviedb.org/3/trending//person/week`);
  };

  const [personDetail, setPersonDetail] = useState({});
  const showDetailPerson = (person) => {
    setPersonDetail(person);
    window.scrollTo({ top: 1200, behavior: "smooth" });
  };

  
  return (
    <div>
      <Space style={{ padding: "10px 0" }}>
        <h1 className="trendsTitle">persons</h1>
        <Button type="dashed" shape="round" onClick={dayButtonClick}>
          day
        </Button>
        <Button type="dashed" danger shape="round" onClick={weekButtonClick}>
          week
        </Button>
      </Space>
      <MySlider slidesPerView={6}>
        {PersonsLoading ? (
          <div className="spinContainer">
            <Spin />
          </div>
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
                      : `https://image.tmdb.org/t/p/w300${p.profile_path}`
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
      </MySlider>
      {personDetail.name && (
        <Row>
          <Col span={12} className="personInfoBox">
            <div className="infoBox">
              <h1>
                <span>name</span>: {personDetail.name}
              </h1>
              <h1>
                <span>known for department</span>:{" "}
                {personDetail.known_for_department}
              </h1>
              <h1>
                <span>gender </span>:{" "}
                {personDetail.gender === 1 ? "female" : "male"}
              </h1>
              <Button type="danger">
                <Link to={`/celebrity/${personDetail.id}`}>
                  get more detail
                </Link>
              </Button>
            </div>
          </Col>
          <Col span={12} style={{ marginTop: "40px" }}>
            <Swiper navigation={true} className="mySwiper">
              {personDetail?.known_for?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div style={{ textAlign: "center" }}>
                    <h1 className="imageDesc">known with </h1>
                    <Link to={`/movieDetails/${item.id}?flag=${item.media_type}`}>
                    <Image
                      height="600px"
                      preview={false}
                      alt={item.original_title}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    />
                    </Link>
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
