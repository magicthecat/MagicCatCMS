const NotFound = `
<h1>Sorry you've 404'd</h1>
<p>Page not Found</p>`

const CookieBanner = `
  
<p>
  This website uses cookies to improve your browsing experience and to personalize content and ads. By clicking "Accept" or continuing to use our site, you agree to our use of cookies. You can manage your cookie preferences in your browser settings. For more information, please see our <a rel="noopener noreferrer" target="_blank" href="/privacy"> Privacy Policy </a> and <a target="_blank" href="/cookies" rel="noopener noreferrer"> Cookie Policy </a>.
</p>
    <button id='accept-button' >Accept</button>

`

const LoadingHtml = `
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
<h3 style="animation: throb 1.5s infinite;">
We're just loading the page...
</h3>
</div>

<style>
@keyframes throb {
0% {
transform: scale(1);
}
50% {
transform: scale(1.1);
}
100% {
transform: scale(1);
}
}
</style>
`

const ShareBox = `      <button class="close-button">×</button>
<ul>
  <li><a href="#" class="twitter-share">Twitter</a></li>
  <li><a href="#" class="facebook-share">Facebook</a></li>
  <li><a href="#" class="reddit-share">Reddit</a></li>
  <li><a href="#" class="linkedin-share">LinkedIn</a></li>
  <li><button class="copy-link">Copy link</button></li>
</ul>`

module.exports = { CookieBanner, NotFound, LoadingHtml, ShareBox };