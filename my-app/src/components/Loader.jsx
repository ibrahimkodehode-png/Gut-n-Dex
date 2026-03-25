import React from "react";
import "../styles/loader.css";

export default function Loader() {
  return (
    <div className="center-page">
      <h1>Loading Books...</h1>
      <div className="loader">Loading...</div>
    </div>
  );
}
