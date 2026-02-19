import "./App.css";
import "./scss/app.scss";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
