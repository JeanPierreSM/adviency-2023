import "./styles.css";
import SinglePage from "./day9/SinglePage";

const ACTIVE_DAY = 9;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
