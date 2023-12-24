import "./styles.css";
import SinglePage from "./day19/SinglePage";

const ACTIVE_DAY = 19;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
