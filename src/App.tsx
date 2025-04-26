import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import RegistraRh from "./componentes/zonePublic/registraRh";
import ZonaTrX from "./componentes/zonePublic/zonaTrX";
import Login from "./componentes/login/login";

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={ <RegistraRh />}></Route>
          <Route path="registra-rh" element={<RegistraRh />} />
          <Route path="login-rh" element={<Login />} />
          <Route path="zona-trx" element={<ZonaTrX />} />          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
