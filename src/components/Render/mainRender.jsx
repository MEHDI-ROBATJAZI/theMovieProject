import React, { useEffect } from "react";
import { Row, Col, Card } from "antd";
import useMovieApi from "../../hooks/useMovieApi";

const { Meta } = Card;

const MainRender = ({ navState }) => {

  const { data, error,reFetch, loading } = useMovieApi(`movie/${navState}`);


  useEffect(() => {
    reFetch(`movie/${navState}`);
  }, [navState])

  return (
    <div style={{ margin: "20px 0" }}>
      {loading ? (
        <h1 style={{textAlign:"center"}}>LOAIDNG...</h1>
      ) : (
        <Row justify="center" gutter={[20, 30]}>
          {data?.results?.map((movie) => (
            <Col key={movie.id} span={{ xs: 24, sm: 12, md: 8, lg: 6 }}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  />
                }
              >
                <Meta
                  title={movie.original_title}
                  description={movie.release_date}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MainRender;
