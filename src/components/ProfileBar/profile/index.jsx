import React, { useContext,useState,useEffect } from "react";
import "./profile.scss";
import { Tabs,Image } from "antd";
import { UserContext } from "../../../context/UserContext";
import SavedMovies from "./savedMovies";
import Title from "../../../Seo/Title";
import useWindowSize from "../../../hooks/useWindowSize";
import { useHistory } from "react-router-dom";
import List  from "./list";


const { TabPane } = Tabs;
const Profile = () => {
  const history = useHistory()
  const [width] = useWindowSize()
  const { user } = useContext(UserContext);

  useEffect(() => {
    if(!user.success && !user.id){
      history.push("/")
    } 
  }, [user])


  const [selectedListId, setSelectedListId] = useState(0)

  function listSelection(id){
    setSelectedListId(id)
  }


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
          <Tabs defaultActiveKey={1} tabPosition={width > 768 ? "left" : "top"}  onChange={(k)=>listSelection(0)}>
            <TabPane tab="favorate list" key={1}>
              <SavedMovies state={"favorite"} />
            </TabPane>
            <TabPane tab="watch list" key={2} >
              <SavedMovies state={"watchlist"} />
            </TabPane>
            <TabPane tab="rating" key={3} >
              <SavedMovies state={"rated"} />
            </TabPane>
            <TabPane tab="lists" key={4} >
              {
                selectedListId === 0 ?(
                  <List listSelection={listSelection} />
                ) : (
                  <SavedMovies state={"list"} listId={selectedListId} listSelection={listSelection} />
                )
              }
            </TabPane>
          </Tabs>
        </section>
      </main>
    </>
  );
};

export default Profile;
