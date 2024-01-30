import "./styles.css";
import SinglePage from "./day22/SinglePage";

const ACTIVE_DAY = 22;

export default function App() {
  return (
    <div className="App">
      <SinglePage activeDay={ACTIVE_DAY} />
    </div>
  );
}
