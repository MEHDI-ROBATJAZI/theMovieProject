import React, { useState,useContext } from "react";
import { LoginOutlined} from "@ant-design/icons";
import { Menu, Dropdown} from "antd";
import { UserContext } from "../../context/UserContext";
import Avatar from "antd/lib/avatar/avatar";

const localAddress = import.meta.env.VITE_LOCAL
const productAddress = import.meta.env.VITE_PRODUCT
const DevMode = String(import.meta.env.DEV)
const Environment_Base_Url = DevMode ? localAddress : productAddress


const ProfileBar = () => {
  const url = "https://api.themoviedb.org/3/";

  const Login = () => {
    fetch(
      `${url}authentication/token/new?api_key=cbaf0bf3f1b90c479d4e805aa371f6cb`
    )
      .then((resp) => resp.json())
      .then((result) => {
        if (result.success) {
          window.location = `https://www.themoviedb.org/authenticate/${result.request_token}?redirect_to=${Environment_Base_Url}Auth`;
        }
      });
  };

  const { user } = useContext(UserContext);
  console.log(user);

  const menu = (
    <Menu /*theme="dark"*/ onClick={(e) => Login()}>
      <Menu.Item key="login">
        <div>
          Login and Authentication
        </div>
      </Menu.Item>
    </Menu>
  );


  const profileBarMenu =(
    <Menu /*theme="dark"*/ onClick={(e) => Login()}>
      <Menu.Item key="username">
        <div>
          {
            user.username
          }
        </div>
      </Menu.Item>
      <Menu.Item key="profile">
        <div>
          profile
        </div>
      </Menu.Item>

      <Menu.Item key="logout">
        <div>
          
            logout
          
        </div>
      </Menu.Item>
    </Menu>
  )
  

  
  return (
    <div>
      {user.id ? (
        <Dropdown overlay={profileBarMenu} placement="bottomCenter" arrow>

        <Avatar
        style={{verticalAlign: 'middle' }} size={50}
          icon={
            <img
              src={`https://image.tmdb.org/t/p/w200${user.avatar.tmdb.avatar_path}`}
            />
          }
        ></Avatar>
        </Dropdown>

      ) : (
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <LoginOutlined rotate={123} style={{ fontSize: "2rem" }} />
        </Dropdown>
      )}
    </div>
  );
};

export default ProfileBar;
