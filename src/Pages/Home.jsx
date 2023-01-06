import React from "react";

import Main from "../Components/Main";
import { Movies } from "../Components/Movies";
import { PopularesRedux } from "../reduxToolkit/Components/PopularesRedux";
import requests from "../common/Request";

function Home() {
  return (
    <>
      <Main />
      <PopularesRedux
        title="Populares con redux toolkit"
        urlRequest={requests.requestPopular}
      />
      <Movies title="Populares" urlRequest={requests.requestPopular} />
      <Movies title="Horror" urlRequest={requests.requestHorror} />
      <Movies title="Mejor puntuadas" urlRequest={requests.requestTopRated} />
      <Movies title="Trending" urlRequest={requests.requestTrending} />
      <Movies title="Proximamente" urlRequest={requests.requestUpcoming} />
    </>
  );
}

export default Home;
