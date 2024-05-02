import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "./constants";

function List() {
  const [sightingsData, setSightingsData] = useState([]);
  const [filterYear, setFilterYear] = useState("");
  const [filterMonth, setFilterMonth] = useState("");

  const getFilteredList = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        // Construct URL using '/sightings?year=2020&month=5' format
        const sightings = await axios.get(
          `${BACKEND_URL}/sightings?${filterYear ? `year=${filterYear}` : ""}${
            filterYear && filterMonth ? "&" : ""
          }${filterMonth ? `month=${filterMonth}` : ""}`
        );
        console.log(sightings.data);
        setSightingsData(sightings.data);
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sightings = await axios.get(`${BACKEND_URL}/sightings`);
        setSightingsData(sightings.data);
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={getFilteredList} style={{ marginBottom: "3rem" }}>
        <label>
          Filter by year: {""}
          <input
            type="number"
            style={{
              padding: "0.5rem",
              marginLeft: "0.5rem",
              marginRight: "2rem",
              width: "70px",
            }}
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          />
        </label>
        <label>
          Filter by month: {""}
          <input
            type="text"
            style={{
              padding: "0.5rem",
              marginLeft: "0.5rem",
              marginRight: "2rem",
              width: "70px",
            }}
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {sightingsData.length === 0 && <p>No results found.</p>}
      {sightingsData.map((sighting, index) => {
        return (
          <Link key={index} to={`/sightings/${index}`}>
            <div
              style={{
                marginBottom: "4rem",
                border: "2px solid gray",
                borderRadius: "8px",
                padding: "2rem",
                color: "white",
              }}
            >
              <h2>{`Sighting Report: ${sighting["REPORT_NUMBER"]}`}</h2>
              <p>{`Season: ${sighting["SEASON"]}`}</p>
              <p>{`Year: ${sighting["YEAR"]}`}</p>
              <p>{`Month: ${sighting["MONTH"] ? sighting["MONTH"] : "N/A"}`}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default List;
