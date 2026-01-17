import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventsAlt from "./pages/EventsAlt";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import EditProfile from "./pages/EditProfile";
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

import RecoverPassword from "./pages/RecoverPassword";
import EventDetails from "./pages/EventDetails";
import EventDetailsAlt from "./pages/EventDetailsAlt";
import Comprar from "./pages/Comprar";
import ComprarAlt from "./pages/ComprarAlt";
import MeusBilhetes from "./pages/MeusBilhetes";
import ProximosBilhetes from "./pages/ProximosBilhetes";
import Favoritos from "./pages/Favoritos";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/eventsalt" element={<EventsAlt />} />
      <Route path="/eventsalt/:id" element={<EventDetailsAlt />} />
      <Route path="/comprar/:id" element={<Comprar />} />
      <Route path="/compraralt/:id" element={<ComprarAlt />} />
      <Route path="/criar-evento" element={<CreateEvent />} />
      <Route path="/editar-evento/:id" element={<EditEvent />} />
      <Route path="/editar-perfil" element={<EditProfile />} />
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
      <Route path="/meus-bilhetes" element={<MeusBilhetes />} />
      <Route path="/proximos-bilhetes" element={<ProximosBilhetes />} />
      <Route path="/favoritos" element={<Favoritos />} />
    </Routes>
  );
}

export default App;
