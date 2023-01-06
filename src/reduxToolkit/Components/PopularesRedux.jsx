import React, { useEffect } from "react";

import { fetchAsyncMovies } from "../moviesSlice";
import "swiper/css";
import "swiper/css/bundle";
import { useDispatch } from "react-redux";
import { MovieListing } from "./MovieListing";

export function PopularesRedux({ urlRequest, title }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncMovies());
  }, [dispatch]);

  return (
    <>
      <h3 className="text-white mt-[15%] font-bold">{title}</h3>
      <MovieListing />
    </>
  );
}
