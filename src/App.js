import "./styles.css";
import SinglePage from "./day7/SinglePage";

const ACTIVE_DAY = 7;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
