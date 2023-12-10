import "./styles.css";
import SinglePage from "./day5/SinglePage";

const ACTIVE_DAY = 5;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
