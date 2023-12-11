import "./styles.css";
import SinglePage from "./day10/SinglePage";

const ACTIVE_DAY = 10;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
