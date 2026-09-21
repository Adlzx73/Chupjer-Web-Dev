/**
 * Runs before hydration to set data-theme, preventing a flash of the
 * wrong palette. Uses the same `theme` localStorage key as the live site
 * so returning visitors keep their preference.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
