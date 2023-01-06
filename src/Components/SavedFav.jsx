import React, { useState, useEffect } from "react";

import { updateDoc, doc, onSnapshot } from "firebase/firestore";

import { AiOutlineClose } from "react-icons/ai";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { movieUrl } from "../common/baseUrl";
import { db } from "../common/firebase";
import { UserAuth } from "../context/AuthContext";

function SavedFav() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">Mis Peliculas</h2>
      <Swiper
        className="mt-20 mb-20"
        pagination={{
          type: "progressbar",
        }}
        navigation
        modules={[Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={3}
        autoplay
        onSlideChange={() => console.log("slide change")}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            {/*
             */}

            <div className="movie-img">
              <img src={movieUrl + movie.img} alt={movie?.title} />
            </div>
            <div className="text-white slide-content">
              <h2 className="text-white ">{movie?.title}</h2>
            </div>

            <p
              onClick={() => deleteShow(movie.id)}
              className="absolute top-4 right-4 text-gray-300"
            >
              <AiOutlineClose />
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SavedFav;
