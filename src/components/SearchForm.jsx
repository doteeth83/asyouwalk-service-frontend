import React from "react";
import "../styles/TmapRoute.css";
const SearchForm = ({
  startLocation,
  setStartLocation,
  endLocation,
  setEndLocation,
  onSubmit,
  onPlogging,
}) => (
  <form onSubmit={onSubmit}>
    <div className="search-bar">
      <div className="start-box">
        <div className="start-icon"></div>
        <input
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          required
          className="search-bar1"
        />
      </div>
      <div className="end-box">
        <span className="end-icon"></span>
        <input
          type="text"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          required
          className="search-bar2"
        />
      </div>
      <div className="route-buttons">
        <button type="submit" className="show-road">
          기본 경로 찾기
        </button>
        <button type="button" className="complete-button">
          완료
        </button>
        <button type="button" onClick={onPlogging} className="plogging-button">
          플로깅 경로 찾기
        </button>
      </div>
    </div>
  </form>
);

export default SearchForm;
