/* GitHub Pages cannot redirect, so /pricing/ and /Pricing 404. If the
   normalised path (no trailing slash, lower case, no .html) is a different
   URL, send the visitor there; the real 404 status stays for crawlers. */
(function () {
  var p = location.pathname;
  var n = p.replace(/\/+$/, '').replace(/\.html$/, '').toLowerCase() || '/';
  if (n !== p && n !== p.replace(/\.html$/, '')) location.replace(n + location.search + location.hash);
})();
