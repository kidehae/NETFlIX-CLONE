import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import requests from "../utils/requests";

function MyList() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchPeople() {
      const res = await axios.get(requests.fetchPopularPeople);
      setPeople(res.data.results);
    }
    fetchPeople();
  }, []);

  return (
    <div style={{ color: "#fff", padding: "3rem" }}>
      <h1>Popular People</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        {people.map((person) => (
          <div key={person.id} style={{ width: 160, textAlign: "center" }}>
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w300/${person.profile_path}`
                  : undefined
              }
              alt={person.name}
              style={{
                width: "100%",
                borderRadius: 8,
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              }}
            />
            <div style={{ marginTop: 8 }}>{person.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyList;
