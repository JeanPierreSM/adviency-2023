import "./styles.css";
import SinglePage from "./day3/SinglePage";

const ACTIVE_DAY = 3;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
