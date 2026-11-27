import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { HtmlPage } from "@/components/HtmlPage";

const HOME = { file: "home", title: "PDAX | Cryptocurrency Trading Platform in the Philippines" };
const PAGES = [
  { path: "/home", ...HOME },
  { path: "/login", file: "login", title: "PDAX" },
  { path: "/loading", file: "loading", title: "PDAX" },
  { path: "/invalid-login", file: "invalid-login", title: "PDAX" },
  { path: "/synchronize-email", file: "synchronize-email", title: "PDAX" },
  { path: "/logging-into-email", file: "logging-into-email", title: "PDAX" },
];

const Loader = () => (
  <div
    data-testid="page-loader"
    className="fixed inset-0 z-50 flex items-center justify-center bg-white"
  >
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#2bb24c]" />
  </div>
);

const Landing = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <HtmlPage {...HOME} interceptToLogin onLoadingChange={setLoading} navigate={navigate} />
      {loading && <Loader />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        {PAGES.filter((p) => p.path !== "/home").map((p) => (
          <Route key={p.path} path={p.path} element={<HtmlPage {...p} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
