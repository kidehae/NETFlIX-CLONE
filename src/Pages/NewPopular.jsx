import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import requests from "../utils/requests";
import Row from "../Components/Row/Row";

function NewPopular() {
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resPopular = await axios.get(requests.fetchPopularMovies);
      setPopular(resPopular.data.results);
      const resUpcoming = await axios.get(requests.fetchUpcomingMovies);
      setUpcoming(resUpcoming.data.results);
    }
    fetchData();
  }, []);

  return (
    <div style={{ color: "#fff", padding: "3rem" }}>
      <h1>New & Popular</h1>
      <Row
        title="Popular Now"
        movies={popular}
        isPoster={true}
        onPlayTrailer={() => {}}
      />
      <Row
        title="Upcoming"
        movies={upcoming}
        isPoster={true}
        onPlayTrailer={() => {}}
      />
    </div>
  );
}

export default NewPopular;
