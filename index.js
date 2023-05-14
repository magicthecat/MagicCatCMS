const { Partials } = require('./helpers/partialHelpers.js');
const { PageRender } = require('./helpers/renderHelpers.js');
const { paths } = require('./paths.js');
const { CookieBanner } = require('./partials.js');

const siteConfig = {
    brand: "MagicCat",
    tagLine: "A vanilla JS CMS framework",
    scriptFunctions: () => {
        //Add any script functions you want to initialise here. For example Google Analytics. 
        console.log("I'm a script function")
    }
}



PageRender.handleRoutingPageRender(siteConfig.brand)
Partials.createNavigation(paths, `${siteConfig.brand}: ${siteConfig.tagLine}`)
Partials.handleCookieConsent(CookieBanner, siteConfig.scriptFunctions());
