import React from "react";
import { useParams } from "react-router-dom";
import useMovieApi from "../../../hooks/useMovieApi";
import { Image, Row ,Col} from "antd";
import CelebrityImageSlider from './celebrityImageSlider'
import MovieImageSlider from "./movieImageSlider";

const Celebrity = () => {
  const { id } = useParams();
  // const id = 1245

  const { data, loading} = useMovieApi(`person/${id}`);

  return (
    <div>
      {!loading && (
        <div>
          <Row>
            <Col id="information" span={18} style={{padding:'30px 100px'}}>
              <h1> <span>name </span> {data.name} </h1>
              <h1> <span>gender  </span> {data.gender === 2 ?"male" : "female"} </h1>
              <h1> <span>known for department </span> {data.known_for_department} </h1>
              <h1> <span>place of birth </span> {data.place_of_birth} </h1>
              <h1> <span>birthday </span> {data.birthday} </h1>
              <h1> <span>popularity </span> {data.popularity} </h1>
              <h1> <span>bio</span> {data.biography} </h1>
            </Col>





            <Col span={6}>
              <CelebrityImageSlider id={id} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <MovieImageSlider id={id} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Celebrity;
