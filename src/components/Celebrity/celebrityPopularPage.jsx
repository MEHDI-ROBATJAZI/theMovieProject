import { Card, Col, Image, Pagination, Row, Spin } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import useMovieApi from "../../hooks/useMovieApi";

const { Meta } = Card;

const CelebrityPopularPage = () => {
  const { data, loading, reFetch } = useMovieApi("person/popular");

  const reloadData = (page) => {
    reFetch("https://api.themoviedb.org/3/person/popular", { page });
  };

  const SpinContainer = {
    margin: "20px 0",
    marginBottom: "20px",
    padding: "30px 50px",
    textAlign: "center",
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "4px",
  };

  return (
    <div>
      {data && (
        <div
          style={{
            textAlign: "center",
            paddingBottom: "30px",
          }}
        >
          <Pagination
            defaultCurrent={1}
            pageSize={1}
            showSizeChanger={false}
            showQuickJumper={true}
            total={data.total_pages}
            onChange={(page) => {
              reloadData(page);
            }}
          />
        </div>
      )}

      <Row gutter={[16, 12]} justify="center">
        {loading ? (
          <div style={SpinContainer}>
            <Spin></Spin>
          </div>
        ) : (
          data.results.map((celeb) => (
            <Col span={4}>
              <Link to={`/celebrity/${celeb.id}`}>
                <Card
                  hoverable
                  cover={
                    <Image
                      preview={false}
                      alt="example"
                      src={`https://image.tmdb.org/t/p/w500${celeb.profile_path}`}
                    />
                  }
                >
                  <Meta
                    title={celeb.name}
                    description={`popularity: ${celeb.popularity}`}
                  />
                </Card>
              </Link>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default CelebrityPopularPage;
