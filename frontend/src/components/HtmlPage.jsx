import { useEffect } from "react";

// Renders a cleaned static HTML page from /public/pages exactly as authored.
export const HtmlPage = ({ file, title }) => {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return (
    <iframe
      data-testid={`html-page-${file}`}
      src={`/pages/${file}.html`}
      title={title || file}
      className="block w-screen h-screen border-0"
    />
  );
};
