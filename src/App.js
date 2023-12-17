import "./styles.css";
import SinglePage from "./day13/SinglePage";

const ACTIVE_DAY = 13;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
