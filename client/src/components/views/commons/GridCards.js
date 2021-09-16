/*gridcard는 landingpage안에 만들어도 되지만,
landingpage뿐만 아니라 다른 곳에서도 쓰일 수 있기 때문에
폴더를 따로 만들었음.*/

import React from "react";
import { Col } from "antd";

//한줄에 4개가 최대, 창을 줄이면 개수가 줄어들도록 설계
function GridCards(props) {
  if (props.landingpage) {
    return (
      <div>
        <Col lg={6} md={8} xs={24}>
          <div style={{ position: "relative" }}>
            <a href={`/movie/${props.movieId}`}>
              <img
                style={{ width: "100%", height: "320px" }}
                src={props.image}
                alt={props.movieName}
              />
              <img />
            </a>
          </div>
        </Col>
      </div>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            src={props.image}
            alt={props.characterName}
          />
          <img />
        </div>
      </Col>
    );
  }
}

export default GridCards;
