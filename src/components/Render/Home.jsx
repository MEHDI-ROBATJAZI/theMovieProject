import React, { useEffect, useState } from "react";
import { Row, Col, Card, Pagination, Tabs, Image } from "antd";
import useMovieApi from "../../hooks/useMovieApi";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { TabPane } = Tabs;

const Home = () => {
  const [tabState, setTabState] = useState("popular");
  const { data, error, reFetch, loading } = useMovieApi(`movie/${tabState}`);

  const siteLayoutContent = {
    margin: "0 0",
    padding: "24px",
  };

  useEffect(() => {
    reFetch(`https://api.themoviedb.org/3/movie/${tabState}`);
  }, [tabState]);

  const reloadData = (p) => {
    reFetch(`https://api.themoviedb.org/3/movie/${tabState}`, { page: p });
  };

  return (
    <div>
      <div>
        <Tabs
          size="large"
          centered={true}
          defaultActiveKey="1"
          onChange={(k) => setTabState(k)}
        >
          <TabPane tab="popular" key="popular" />
          <TabPane tab="upcoming" key="upcoming" />
        </Tabs>
      </div>

      {data && (
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            // background: "#efecf8",
          }}
        >
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
      <div className="HomeGlassMorphism" style={siteLayoutContent}>
        {loading ? (
          <h1 style={{ textAlign: "center" }}>LOAIDNG...</h1>
        ) : (
          <Row justify="center" gutter={[20, 30]}>
            {data?.results?.map((movie) => (
              <Col key={movie.id} span={{ xs: 24, sm: 12, md: 8, lg: 6 }}>
                <Link to={`/movieDetails/${movie.id}`}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                      <Image
                        preview={false}
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
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Home;
