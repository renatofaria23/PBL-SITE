import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventsAlt from "./pages/EventsAlt";
import Suporte from "./pages/Suporte";
import SuportePassword from "./pages/SuportePassword";
import SuporteConta from "./pages/SuporteConta";
import SuporteApp from "./pages/SuporteApp";
import SuporteDesativada from "./pages/SuporteDesativada";
import SuporteApagar from "./pages/SuporteApagar";
import SuporteContacto from "./pages/SuporteContacto";

import SuporteAlt from "./pages/SuporteAlt";
import SuportePasswordAlt from "./pages/SuportePasswordAlt";
import SuporteContaAlt from "./pages/SuporteContaAlt";
import SuporteAppAlt from "./pages/SuporteAppAlt";
import SuporteDesativadaAlt from "./pages/SuporteDesativadaAlt";
import SuporteApagarAlt from "./pages/SuporteApagarAlt";
import SuporteContactoAlt from "./pages/SuporteContactoAlt";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/events" element={<Events />} />
      <Route path="/eventsalt" element={<EventsAlt />} />
      <Route path="/suporte" element={<Suporte />} />
      <Route path="/suportepassword" element={<SuportePassword />} />
      <Route path="/suporteconta" element={<SuporteConta />} />
      <Route path="/suporteapp" element={<SuporteApp />} />
      <Route path="/suportedesativada" element={<SuporteDesativada />} />
      <Route path="/suporteapagar" element={<SuporteApagar />} />
      <Route path="/suportecontacto" element={<SuporteContacto />} />

      <Route path="/suportealt" element={<SuporteAlt />} />
      <Route path="/suportepasswordalt" element={<SuportePasswordAlt />} />
      <Route path="/suportecontaalt" element={<SuporteContaAlt />} />
      <Route path="/suporteappalt" element={<SuporteAppAlt />} />
      <Route path="/suportedesativadaalt" element={<SuporteDesativadaAlt />} />
      <Route path="/suporteapagaralt" element={<SuporteApagarAlt />} />
      <Route path="/suportecontactoalt" element={<SuporteContactoAlt />} />
    </Routes>
  );
}

export default App;
