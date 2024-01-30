import "./styles.css";
import SinglePage from "./day21/SinglePage";

const ACTIVE_DAY = 21;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
