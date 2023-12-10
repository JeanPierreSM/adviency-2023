import "./styles.css";
import SinglePage from "./day6/SinglePage";

const ACTIVE_DAY = 6;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
