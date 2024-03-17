import "./styles.css";
import SinglePage from "./day24/SinglePage";

const ACTIVE_DAY = 24;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
