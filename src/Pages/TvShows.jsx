import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import requests from "../utils/requests";
import Row from "../Components/Row/Row";

function TvShows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    async function fetchShows() {
      const res = await axios.get(requests.fetchTvShows);
      setShows(res.data.results);
    }
    fetchShows();
  }, []);

  return (
    <div style={{ color: "#fff", padding: "3rem" }}>
      <h1>TV Shows</h1>
      <Row title="Popular TV Shows" movies={shows} isPoster={false} />
    </div>
  );
}

export default TvShows;
