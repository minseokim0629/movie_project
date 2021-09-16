import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function LandingPage() {
  //movie api에서 movie 정보 가져오기

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    //인기있는 영화 가져오기, 페이지는 1페이지부터
    //const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    //response에 결과값이 떨어지는 것
    //response를 바로 가져올 수 없어서 윗 과정을 한번 거침
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        setMovies([...Movies, ...response.results]); //[]를 안해줘서 안떴던 것, loadmore 누르면 원래 내용에 추가되어 나타남.,
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
        //console.log(MainMovieImage); //이거는 null 찍힘
      });
  };
  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };
  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/*Main Image*/}
      {MainMovieImage && ( //mainmovieimage가 있으면 가져와라 이렇게 안해주면 backdrop_path 에러남
        <MainImage
          image={`${IMAGE_BASE_URL}w1280/${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />

        {/*Movie Grid Cards*/}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingpage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreItems}>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
