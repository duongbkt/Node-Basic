import { Header } from "../Header";
import ResourceListWithSelection from "../ResourceListWithSelection";
import "./App.css";


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
