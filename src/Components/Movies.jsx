import React, { useEffect, useState } from "react";

import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { movieUrl } from "../common/baseUrl";
import Favorite from "./Favorite";

import "swiper/css";
import "swiper/css/bundle";

export function Movies({ urlRequest, title }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(urlRequest).then((response) => {
      setMovies(response.data.results);
    });
  }, [urlRequest]);
  const ellipsis = (str, maxlarge) => {
    if (str?.length > maxlarge) {
      return `${str.slice(0, maxlarge)}...`;
    }
    return str;
  };

  return (
    <>
      <h3 className="text-white mt-[15%] font-bold">{title}</h3>
      <Swiper
        className=" swiper-zoom-container"
        pagination={{
          type: "progressbar",
        }}
        navigation
        modules={[Pagination, Navigation]}
        spaceBetween={15}
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 2,
          },
        }}
        autoplay
        scrollbar={{ draggable: true }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="movie-img">
              <img src={movieUrl + movie?.backdrop_path} alt={movie?.title} />
            </div>
            <div className="text-white slide-content">
              <h2 className="text-white ">{movie?.title}</h2>
              <p className="content">{ellipsis(movie?.overview, 100)}</p>
            </div>
            <Favorite item={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
