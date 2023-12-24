import "./styles.css";
import SinglePage from "./day15/SinglePage";

const ACTIVE_DAY = 15;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
