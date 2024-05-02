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
        // Construct URL using '/sightings?year=2020&month=5'format
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

  const sortList = (order) => {
    if (order === "ascending") {
      setSightingsData(
        [...sightingsData].sort(
          (a, b) => a["REPORT_NUMBER"] - b["REPORT_NUMBER"]
        )
      );
    } else if (order === "descending") {
      setSightingsData(
        [...sightingsData].sort(
          (a, b) => b["REPORT_NUMBER"] - a["REPORT_NUMBER"]
        )
      );
    }
  };

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
      <p style={{ color: "lightblue" }}>Sort by Report Number</p>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <button onClick={() => sortList("ascending")}>Ascending</button>
        <button onClick={() => sortList("descending")}>Descending</button>
      </div>
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
