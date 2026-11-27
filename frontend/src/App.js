import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HtmlPage } from "@/components/HtmlPage";

const PAGES = [
  { path: "/home", file: "home", title: "PDAX | Cryptocurrency Trading Platform in the Philippines" },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HtmlPage {...PAGES[0]} />} />
        {PAGES.map((p) => (
          <Route key={p.path} path={p.path} element={<HtmlPage {...p} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
