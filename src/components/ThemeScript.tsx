/**
 * Runs before hydration to set data-theme, preventing a flash of the
 * wrong palette. The theme is resolved ONCE: a stored choice wins;
 * otherwise the OS preference is used and — per product decision —
 * persisted, so the OS preference is only followed on the very first
 * opening. Later visits and locale switches always replay the stored
 * choice.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";try{localStorage.setItem("theme",t);}catch(e){}}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
