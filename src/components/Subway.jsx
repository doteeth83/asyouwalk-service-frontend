import "../styles/Subway.css";

const Subway = ({ number, type }) => {
  return <div className={`Subway Subway_${type}`}>{number}</div>;
};

export default Subway;
