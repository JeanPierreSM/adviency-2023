import "./styles.css";
import SinglePage from "./day8/SinglePage";

const ACTIVE_DAY = 8;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
