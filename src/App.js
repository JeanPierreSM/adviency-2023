import "./styles.css";
import SinglePage from "./day14/SinglePage";

const ACTIVE_DAY = 14;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
