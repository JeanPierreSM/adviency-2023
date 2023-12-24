import "./styles.css";
import SinglePage from "./day17/SinglePage";

const ACTIVE_DAY = 17;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
