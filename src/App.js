import "./styles.css";
import SinglePage from "./day4/SinglePage";

const ACTIVE_DAY = 4;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
