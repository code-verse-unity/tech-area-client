import Providers from "./components/Providers";
import Routes from "./components/Routes";
import "./assets/css/global.css";
import "highlight.js/styles/github.css";

function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
}

export default App;
