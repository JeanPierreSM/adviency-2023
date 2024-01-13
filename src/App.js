import "./styles.css";
import SinglePage from "./day20/SinglePage";

const ACTIVE_DAY = 20;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
