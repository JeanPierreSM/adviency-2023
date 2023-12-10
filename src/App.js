import "./styles.css";
import SinglePage from "./day2/SinglePage";

const ACTIVE_DAY = 2;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
