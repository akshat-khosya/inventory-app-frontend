import { useContextData } from "./context/useContext";
import Home from "./pages/Home";
import GlobalContext from "./context/GloablContext";

function App() {
  const context = useContextData();
  return (
    <GlobalContext.Provider value={context}>
      <Home />
    </GlobalContext.Provider>

  );
}

export default App;
