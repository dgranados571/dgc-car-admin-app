import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ZonaTrX from "./componentes/zonePublic/zonaTrX";
import IndexPublic from "./componentes/zonePublic/indexPublic";

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={ <IndexPublic />}></Route>
          <Route path="index-rh" element={<IndexPublic />} />
          <Route path="zona-trx" element={<ZonaTrX />} />          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
