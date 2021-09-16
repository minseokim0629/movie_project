import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";
function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };
  //dom이 켜지자마자 무엇을 할 것인지
  useEffect(() => {
    //서버부분에 요청 보내기, 몇명이 좋아하는지
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      //데이터 받아오기
      console.log(response.data);
      setFavoriteNumber(response.data.favoriteNumber);
      if (response.data.success) {
        //성공
      } else {
        alert("숫자 정보를 가져오는데 실패했습니다.");
      }
    });

    Axios.post("/api/favorite/favorited", variables).then((response) => {
      //데이터 받아오기
      if (response.data.success) {
        //성공
        setFavorited(response.data.favorited);
        // console.log(response.data);
        // console.log(movieId);
      } else {
        alert("정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const onClickFavorite = () => {
    //Favorite 여부에 따라 다른 요청(Axios)을 준다.
    if (Favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
            console.log(FavoriteNumber);
          } else {
            alert("Favorite 리스트에서 지우는 걸 실패했습니다.");
          }
        }
      );
    } else {
      Axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          console.log(FavoriteNumber);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 리스트에서 추가하는 걸 실패했습니다.");
        }
      });
    }
  };
  return (
    <div>
      <button onClick={onClickFavorite}>
        {Favorited ? "Not Favorite " : "Add to Favorite "}
        {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
