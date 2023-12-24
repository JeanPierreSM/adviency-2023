import "./styles.css";
import SinglePage from "./day16/SinglePage";

const ACTIVE_DAY = 16;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
