import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import Home from "../pages/Home";
import SuggestWorkOut from "../pages/SuggestWorkOut";
import Machines from "../pages/Machines";
import GymMapPage from "../pages/GymMap";
import TreinoPage from "../pages/Treino";
import Desafios from "../pages/Desafios";
import PerfilMorador from "../pages/PerfilMorador";
import Footer from "../components/Footer";
import Header from "../components/Header";

/** Moldura do totem: cabeçalho e rodapé comuns às telas navegáveis. */
function LayoutTotem() {
  return (
    <div className="flex min-h-screen flex-col bg-[#26303b]">
      <Header />
      {/* flex-1: o conteúdo ocupa a sobra e o rodapé fica sempre visível */}
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function SuggestWorkOutRoute() {
  const navigate = useNavigate();
  return <SuggestWorkOut onExit={() => navigate("/")} />;
}

function MachinesRoute() {
  const navigate = useNavigate();
  return <Machines onExit={() => navigate("/")} />;
}

function GymMapRoute() {
  const navigate = useNavigate();
  return <GymMapPage onExit={() => navigate("/")} />;
}

function TreinoRoute() {
  const { id } = useParams();
  return <TreinoPage treinoId={id} />;
}

function DesafiosRoute() {
  const navigate = useNavigate();
  return (
    <Desafios
      onExit={() => navigate("/")}
      onAbrirPerfil={(moradorId) => navigate(`/desafios/${moradorId}`)}
    />
  );
}

function PerfilMoradorRoute() {
  const navigate = useNavigate();
  const { moradorId } = useParams();
  return (
    <PerfilMorador moradorId={moradorId} onVoltar={() => navigate("/desafios")} />
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* telas do totem */}
        <Route element={<LayoutTotem />}>
          <Route path="/" element={<Home />} />
          <Route path="/suggest" element={<SuggestWorkOutRoute />} />
          <Route path="/machines" element={<MachinesRoute />} />
          <Route path="/map" element={<GymMapRoute />} />
          <Route path="/desafios" element={<DesafiosRoute />} />
          <Route path="/desafios/:moradorId" element={<PerfilMoradorRoute />} />
        </Route>

        {/* Tela do celular, aberta só pelo QR code: fica fora da moldura
            do totem e não tem navegação para o resto do sistema. */}
        <Route path="/treino/:id" element={<TreinoRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
