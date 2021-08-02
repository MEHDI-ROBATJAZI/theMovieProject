import { Card, Col, Image, Pagination, Row, Spin } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import useMovieApi from "../../hooks/useMovieApi";
import Title from "../../Seo/Title"
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
    <div /*style={{paddingBottom:"60px"}}*/ >
      <Title title="celebrity page" description="popular celebrities" />
      {data && (
        <div
          style={{
            textAlign: "center",
            // paddingBottom: "30px",
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

      <Row gutter={[16, 12]} justify="center" style={{padding:"40px"}}>
        {loading ? (
          <div style={SpinContainer}>
            <Spin></Spin>
          </div>
        ) : (
          data.results.map((celeb) => (
            <Col xs={12} sm={8} md={6} lg={4} key={celeb.id}  >
              <Link to={`/celebrity/${celeb.id}`}>
                <Card
                  hoverable
                  cover={
                    <Image
                      preview={false}
                      alt="example"
                      src={`https://image.tmdb.org/t/p/w400${celeb.profile_path}`}
                    />
                  }
                >
                  <Meta
                    style={{height:"60px"}}
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
