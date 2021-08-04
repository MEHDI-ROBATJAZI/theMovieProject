import React, { useState, useContext } from "react";
import { LoginOutlined } from "@ant-design/icons";
import { Menu, Dropdown as Dd } from "antd";
import { UserContext } from "../../context/UserContext";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";
import UserService from "../../service/UserService";

const Dropdown = () => {
  const localAddress = import.meta.env.VITE_LOCAL;
  const productAddress = import.meta.env.VITE_PRODUCT;
  const DevMode = String(import.meta.env.DEV);
  const Environment_Base_Url = DevMode === true ? productAddress : localAddress;

  // console.log(localAddress);
  // console.log(productAddress);
  // console.log(DevMode);
  // console.log(Environment_Base_Url);

  const Login = () => {
    UserService.createRequestToken().then((result) => {
      if (result.success) {
        window.location = `https://www.themoviedb.org/authenticate/${result.request_token}?redirect_to=${Environment_Base_Url}Auth`;
      }
    });
  };

  const { user } = useContext(UserContext);
  const menu = (
    <Menu /*theme="dark"*/>
      <Menu.Item key="login">
        <div onClick={() => Login()}>Login and Authentication</div>
      </Menu.Item>
    </Menu>
  );

  const profileBarMenu = (
    <Menu /*theme="dark"*/>
      <Menu.Item key="username" disabled style={{ cursor: "none" }}>
        {user.username}
      </Menu.Item>
      <Menu.Item key="profile">
        <Link to="/profile">profile</Link>
      </Menu.Item>

      <Menu.Item key="logout">
        <div>logout</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {user.id ? (
        <Dd overlay={profileBarMenu} placement="bottomCenter" arrow>
          <Avatar
            style={{ verticalAlign: "middle" }}
            size={50}
            icon={
              <img
                src={`https://image.tmdb.org/t/p/w200${user.avatar.tmdb.avatar_path}`}
              />
            }
          ></Avatar>
        </Dd>
      ) : (
        <Dd overlay={menu} placement="bottomCenter" arrow>
          <LoginOutlined rotate={123} style={{ fontSize: "2rem" }} />
        </Dd>
      )}
    </div>
  );
};

export default Dropdown;
