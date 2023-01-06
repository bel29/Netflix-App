import React from "react";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Favorite from "../../Components/Favorite";
import { movieUrl } from "../../common/baseUrl";
import { getMovies } from "../moviesSlice";

import "swiper/css";
import "swiper/css/bundle";

export function MovieListing() {
  const movies = useSelector(getMovies);
  if (movies.pending) {
    return (
      <div>
        <h3 className="text-white">Loading ...</h3>
      </div>
    );
  }
  let renderMovies;
  renderMovies = movies.data?.length ? (
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
      {movies.data.map((movie, index) => (
        <SwiperSlide key={movie?.id}>
          <div className="movie-img">
            <img src={movieUrl + movie?.backdrop_path} alt={movie?.title} />
          </div>
          <div className="text-white slide-content">
            <h2 className="text-white ">{movie?.title}</h2>
            <p className="content">{movie?.overview}</p>
          </div>
          <Favorite item={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div>
      <h3 className="text-white">{movies.error}</h3>
    </div>
  );
  return (
    <div id="test" className="movie-container">
      {renderMovies}
    </div>
  );
}
