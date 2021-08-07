import React, { useState, useEffect, useContext, useRef } from "react";
import "./Bar.scss";
import {
  HeartOutlined,
  HeartTwoTone,
  PushpinOutlined,
  PushpinTwoTone,
  SelectOutlined,
  StarOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import { Tooltip, message, Rate } from "antd";
import AccountService from "../../../service/AccountService";

import { UserContext } from "../../../context/UserContext";

const AddSuccessfully = (icon) => {
  switch (icon) {
    case "favorite":
      message.success("Succesfully added to you'r favorite list ");
      break;
    case "watchlist":
      message.success("Succesfully added to you'r watchlist ");
      break;
    case "rate":
      message.success("Succesfully you'r rate saved ");
      break;

    default:
      return;
  }
};

const removeSuccessfully = (icon) => {
  switch (icon) {
    case "favorite":
      message.warning("Succesfully removed from you'r favorite list");
      break;
    case "watchlist":
      message.warning("Succesfully removed from you'r watchlist ");
      break;
    case "rate":
      message.warning("Succesfully removed you'r rate from database ");
      break;
    default:
      return;
  }
};
const Bar = ({ id, media_type }) => {
  const { user , session_id } = useContext(UserContext);
  const BarContainerRef = useRef(null);
  const RateParentRef = useRef(null);

  const [isFavorate, setIsFavorate] = useState(false);
  const [watchList, setToWatchlist] = useState(false);
  const [rate, rateIt] = useState(false);
  const [rateBox, toggleRateBox] = useState(false);

  const hiddenRateBar = () => {
    RateParentRef.current.style.visibility = "hidden";
    BarContainerRef.current.style.height = "44px";
  };
  const visibleRateBar = () => {
    BarContainerRef.current.style.height = "88px";
    RateParentRef.current.style.visibility = "visible";
  };

  useEffect(() => {
    if (rateBox === true) {
      visibleRateBar();
    } else {
      hiddenRateBar();
    }
  }, [rateBox]);

  return (
    <div id="BarContainer" ref={BarContainerRef} >
      <div className="IconParent">
        {isFavorate ? (
          <Tooltip
            placement="bottom"
            title={"you added this movie to your favorite list"}
          >
            <HeartTwoTone
              twoToneColor="#eb2f96"
              onClick={() => {
                AccountService.MarkAsFavorate(
                  user.id,
                  id,
                  media_type,
                  false
                ).then((resp) => {
                  console.log(resp);
                  setIsFavorate(false);
                  removeSuccessfully("favorite");
                });
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip placement="bottom" title={"add to your favorite list"}>
            <HeartOutlined
              onClick={() => {
                AccountService.MarkAsFavorate(
                  user.id,
                  id,
                  media_type,
                  true
                ).then((resp) => {
                  console.log(resp);
                  setIsFavorate(true);
                  AddSuccessfully("favorite");
                });
              }}
            />
          </Tooltip>
        )}
      </div>
      <div className="IconParent">
        {watchList ? (
          <Tooltip
            placement="bottom"
            title={"you added this movie to you'r watch list"}
          >
            <PushpinTwoTone
              onClick={() => {
                AccountService.MarkInWatchList(
                  user.id,
                  id,
                  media_type,
                  false
                ).then((resp) => {
                  console.log(resp);
                  setToWatchlist(false);
                  removeSuccessfully("watchlist");
                });
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip placement="bottom" title={"add to watch list"}>
            <PushpinOutlined
              twoToneColor="#eb2f96"
              onClick={() => {
                AccountService.MarkInWatchList(
                  user.id,
                  id,
                  media_type,
                  true
                ).then((resp) => {
                  console.log(resp);
                  setToWatchlist(true);
                  AddSuccessfully("watchlist");
                });
              }}
            />
          </Tooltip>
        )}
      </div>
      {!rate ? (
        <div className="IconParent">
          <Tooltip placement="bottom" title={"rate it"}>
            <StarOutlined
              twoToneColor="#2feb5e"
              onClick={() => {
                toggleRateBox(!rateBox);
              }}
            />
          </Tooltip>
        </div>
      ) : (
        <div className="IconParent">
          <Tooltip placement="bottom" title={"rate it"}>
            <StarTwoTone
              twoToneColor="#2feb5e"
              onClick={() => {
                AccountService.DeleteUserRate(media_type, id).then(() => {
                  (resp) => console.log(resp);
                  removeSuccessfully("rate")
                  rateIt(!rate )

                });
              }}
            />
          </Tooltip>
        </div>
      )}
      <div className="IconParent">
        <Tooltip placement="bottom" title={"add to your list"}>
          <SelectOutlined />
        </Tooltip>
      </div>
      <div
        className="UserRateMovie"
        ref={RateParentRef}
        style={{ visibility: "hidden" }}
      >
        <Rate
          allowHalf
          onChange={(val) => {
            AccountService.UserRate(media_type, id, val * 2);
            AddSuccessfully("rate");
            hiddenRateBar();
            rateIt(true);
            toggleRateBox(!rateBox)
          }}
        />
      </div>
    </div>
  );
};

export default Bar;
