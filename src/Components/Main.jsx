import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import requests from "../common/Request";
import { movieUrl } from "../common/baseUrl";

function Main() {
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const ellipsis = (str, maxlarge) => {
    if (str?.length > maxlarge) {
      return `${str.slice(0, maxlarge)}...`;
    }
    return str;
  };

  return (
    <div className="w-full h-[600px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black" />
        <img
          className="w-full h-full object-cover"
          src={movieUrl + movie?.backdrop_path}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[25%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <p className="description relative ">
            {ellipsis(movie?.overview, 180)}
          </p>

          <div className="mb-0 top-2 flex">
            <button className="border flex bg-gray-300 text-black border-gray-300 py-2 px-2">
              <svg
                aria-hidden="true"
                className=" h-5"
                fill="currentColor"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />{" "}
              </svg>
              Reproducir
            </button>

            <div className="flex flex-col ml-4">
              <Link to="/account">
                <svg
                  aria-hidden="true"
                  className=" align-middle w-10 text-white h-6"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                    fill="white"
                  />{" "}
                </svg>

                <p>Mi lista</p>
              </Link>
            </div>
          </div>
          <p className="text-gray-400 mt-3 text-sm">
            Estreno: {movie?.release_date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
