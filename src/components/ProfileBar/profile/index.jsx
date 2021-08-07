import React, { useContext, useEffect } from "react";
import "./profile.scss";
import { Tabs,Image } from "antd";
import { UserContext } from "../../../context/UserContext";
import Lists from "./list";
import Title from "../../../Seo/Title";
import useResponsive from "../../../hooks/useResponsive";
import { useHistory } from "react-router-dom";


const { TabPane } = Tabs;
const Profile = () => {
  const history = useHistory()
  const width = useResponsive()
  const { user } = useContext(UserContext);

  useEffect(() => {
    if(!user.success && !user.id){
      history.push("/")
    } 
  }, [user])
  return (
    <>
    <Title
        title="Profile"
        description="this is profile page"
      />
      <main id="container">
        {user.id && (
          <aside>
            <Image
              alt={user.username}
              src={
                user.avatar.tmdb.avatar_path ? 
                `https://image.tmdb.org/t/p/w500${user.avatar.tmdb.avatar_path}`
                :
                "/userIcon.png"
              }
            />
            <h3>{user.username}</h3>
          </aside>
        )}

        <section>
          <Tabs defaultActiveKey={1} tabPosition={width > 768 ? "left" : "top"}>
            <TabPane tab="favorate list" key={1}>
              <Lists state={"favorite"} />
            </TabPane>
            <TabPane tab="watch list" key={2}>
              <Lists state={"watchlist"} />
            </TabPane>
            <TabPane tab="rating" key={3}>
              <Lists state={"rated"} />
            </TabPane>
            <TabPane disabled tab="lists" key={4}>Content of tab</TabPane>
          </Tabs>
        </section>
      </main>
    </>
  );
};

export default Profile;
