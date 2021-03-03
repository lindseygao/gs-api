import { Container } from "react-bootstrap";

import NavBar from "./components/NavBar";
import ForecasterHome from './pages/Forecaster/index.js';
import InputForm from './pages/Forecaster/InputForm.js'


import "./App.css";

function App() {
  return (
    <div>
      <Container fluid className="App">
        <NavBar />
        <Container fluid>
         <ForecasterHome/>
         <InputForm/>
        </Container>
      </Container>
    </div>
  );
}

export default App;
