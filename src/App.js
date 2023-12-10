import "./styles.css";
import SinglePage from "./day1/SinglePage";

const ACTIVE_DAY = 1;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
