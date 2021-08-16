import { Card, Col, Empty, Image, Pagination, Row, Spin } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import useMovieApi from "../../hooks/useMovieApi";
import Title from "../../Seo/Title"
import classes from './celebrity.module.scss'

const { Meta } = Card;
const CelebrityPopularPage = () => {
  const { data, loading, reFetch } = useMovieApi("person/popular");
  
  const reloadData = (page) => {
    reFetch("https://api.themoviedb.org/3/person/popular", { page });
  };


  return (
    <div id={classes.celebrityContainer} >
      <Title title="celebrity page" description="popular celebrities" />
      {data && (
        <div
          style={{
            textAlign: "center",
            marginBottom:"10px"
          }}
        >
          <Pagination
            size="small"
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

      <Row gutter={[16, 12]} justify="center" style={{padding:"10px"}}>
        {loading ? (
          <div id={classes.SpinContainer}>
            <Spin></Spin>
          </div>
        ) : (
          data.results.map((celeb) => (
            <Col xs={12} sm={8} md={6} lg={4} key={celeb.id}  >
              <Link to={`/celebrity/${celeb.id}`}>
                <Card
                  className={classes.cardStyles}
                  hoverable
                  cover={
                    celeb.profile_path ? (
                      <Image
                      preview={false}
                      alt={celeb.name}
                      src={`https://image.tmdb.org/t/p/w300${celeb.profile_path}`}
                      height="100%"
                    />
                    ):(
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )
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
