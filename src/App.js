import "./styles.css";
import SinglePage from "./day18/SinglePage";

const ACTIVE_DAY = 18;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
