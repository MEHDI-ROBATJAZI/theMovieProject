import React from "react";
import { useParams } from "react-router-dom";
import useMovieApi from "../../../hooks/useMovieApi";
import { Switch, Row, Col, Typography } from "antd";
import CelebrityImageSlider from "./celebrityImageSlider";
import MovieImageSlider from "./movieImageSlider";
import Title from "../../../Seo/Title";

const Celebrity = () => {
  const { id } = useParams();
  // const id = 1245

  const { data, loading } = useMovieApi(`person/${id}`);
  const [ellipsis, setEllipsis] = React.useState(false);
  return (
    <div>
      <Title title="celebrity detail" description="detail celebrities" />

      {!loading && (
        <div>
          <Row>
            <Col
              id="information"
              xs={24}
              sm={24}
              md={14}
              lg={15}
              span={24}
            >
              <Typography.Title level={1}>
                
                <Typography.Text mark> name </Typography.Text> <Typography.Text className="data">{data.name}</Typography.Text>
              </Typography.Title>
              <Typography.Title level={1}>
                
                <Typography.Text mark>gender </Typography.Text>
                <Typography.Text className="data">{data.gender === 2 ? "male" : "female"}</Typography.Text>
              </Typography.Title>
              <Typography.Title level={1}>
                
                <Typography.Text mark>
                  known for department
                </Typography.Text>
                
                <Typography.Text className="data">{data.known_for_department}</Typography.Text>
              </Typography.Title>
              <Typography.Title level={1}>
               
                <Typography.Text mark>place of birth </Typography.Text>
                <Typography.Text className="data">{data.place_of_birth}</Typography.Text>
              </Typography.Title>
              <Typography.Title level={1}>
                
                <Typography.Text mark>birthday </Typography.Text>
                <Typography.Text className="data">{data.birthday}</Typography.Text>
              </Typography.Title>
              <Typography.Title level={1}>
                
                <Typography.Text mark>popularity </Typography.Text>
                <Typography.Text className="data">{data.popularity}</Typography.Text>
              </Typography.Title>
              <Typography.Title level={1}>
                
                <Typography.Text mark>bio</Typography.Text>
              </Typography.Title>
              <Switch
                checked={ellipsis}
                onChange={() => {
                  setEllipsis(!ellipsis);
                }}
              />
              <Typography.Paragraph ellipsis={!ellipsis}>
                {data.biography}
              </Typography.Paragraph>
            </Col>

            <Col xs={24} sm={24} md={10} lg={9}>
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
