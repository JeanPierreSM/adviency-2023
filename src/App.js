import "./styles.css";
import SinglePage from "./day12/SinglePage";

const ACTIVE_DAY = 12;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
