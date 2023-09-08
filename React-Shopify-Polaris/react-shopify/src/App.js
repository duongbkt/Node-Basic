import "./App.css";
import { Header } from "./components/Header";

import ResourceListWithSelection from "./components/ResourceListWithSelection";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <ResourceListWithSelection />
      </div>
    </div>
  );
}

export default App;
