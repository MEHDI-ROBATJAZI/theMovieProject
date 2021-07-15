import React, { useEffect } from "react";
import { Row, Col, Card, Pagination } from "antd";
import useMovieApi from "../../hooks/useMovieApi";
const { Meta } = Card;
const MainRender = ({ navState }) => {
  const { data, error, reFetch, loading } = useMovieApi(`movie/${navState}`);

  const siteLayoutContent = {
    margin: "30px 0",
    minHeight: "280px",
    padding: "24px",
    background: "#fff",
  };

  useEffect(() => {
    reFetch(`https://api.themoviedb.org/3/movie/${navState}`);
  }, [navState]);

  const reloadData = (p) => {
    reFetch(`https://api.themoviedb.org/3/movie/${navState}`,{page:p})
  };

  return (
    <div>
      {data && (
        <div style={{ textAlign: "center", paddingTop: "30px" }}>
          <Pagination
            defaultCurrent={1}
            pageSize={1}
            showSizeChanger={false}
            showQuickJumper={true}
            total={data.total_pages}
            onChange={(page) => reloadData(page)}
          />
        </div>
      )}
      <div style={siteLayoutContent}>
        {loading ? (
          <h1 style={{ textAlign: "center" }}>LOAIDNG...</h1>
        ) : (
          <Row justify="center" gutter={[20, 30]}>
            {data?.results?.map((movie) => (
              <Col key={movie.id} span={{ xs: 24, sm: 12, md: 8, lg: 6 }}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt={movie.title}
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
    </div>
  );
};

export default MainRender;
