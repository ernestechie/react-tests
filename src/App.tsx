import Articles from "./components/cache/articles";
import Counter from "./components/counter/counter";

function App() {
  return (
    <div className="p-8">
      <Counter />
      <Articles />
    </div>
  );
}

export default App;
