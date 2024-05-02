import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "./constants";

function Sighting() {
  const [sighting, setSightingData] = useState([]);
  const { sightingIndex } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sightings = await axios.get(
          `${BACKEND_URL}/sightings/${sightingIndex}`
        );
        setSightingData(sightings.data);
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    };
    fetchData();
  }, [sightingIndex]);

  const showSighting = () => {
    return Object.entries(sighting).map(([key, value]) => {
      return (
        <div key={key}>
          <p>{`${key}: ${value}`}</p>
        </div>
      );
    });
  };

  return (
    <>
      <div className="card">
        <div style={{ padding: "1rem", marginBottom: "2rem" }}>
          <Link
            to="/"
            style={{ color: "yellow" }}
          >{`<< Back to list of Bigfoot sightings`}</Link>
        </div>
        <h2>{`Sighting Report: ${sighting["REPORT_NUMBER"]}`}</h2>
        {showSighting()}
      </div>
    </>
  );
}

export default Sighting;
