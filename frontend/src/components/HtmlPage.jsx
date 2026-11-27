import { useEffect, useRef } from "react";

// Renders a cleaned static HTML page from /public/pages exactly as authored.
// When interceptToLogin is set, any click inside the page shows a 1s loader
// then navigates to /login (used on the landing page).
export const HtmlPage = ({ file, title, interceptToLogin, onLoadingChange, navigate }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  const handleLoad = () => {
    if (!interceptToLogin) return;
    const doc = ref.current?.contentDocument;
    if (!doc) return;
    const go = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onLoadingChange(true);
      setTimeout(() => {
        onLoadingChange(false);
        navigate("/login");
      }, 1000);
    };
    doc.addEventListener("click", go, true);
  };

  return (
    <iframe
      ref={ref}
      onLoad={handleLoad}
      data-testid={`html-page-${file}`}
      src={`/pages/${file}.html`}
      title={title || file}
      className="block w-screen h-screen border-0"
    />
  );
};
