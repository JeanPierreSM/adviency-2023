import "./styles.css";
import SinglePage from "./day23/SinglePage";

const ACTIVE_DAY = 23;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
