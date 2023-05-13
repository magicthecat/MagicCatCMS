const { LoadingHelpers } = require("./loadingHelpers");
const { Element, Molecules } = require("./htmlHelpers");
const { NavigationHelper } = require("./navigationHelpers");
import { Styles } from "./styleHelpers";

class Partials {


    static getPartialHtml = (id, partials) => {

        const partial = partials.find(
            (partial) => partial.id === id
        );

        return partial.html

    }

    static handleCookieConsent = (CookieBanner, scriptFunctions) => {
        // Load the scripts initially

        if (document.cookie.includes('cookiesAccepted=true')) {
            scriptFunctions

            return;
        }

        const banner = Element.create({
            type: 'div', className: 'cookie-banner', innerHTML: CookieBanner
        });


        // Append the banner to the document body
        Styles.setStyles({
            cookieBannerRule: `     .cookie-banner {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background-color: rgb(255, 193, 7);
    ;
    color: var(--primary-font-color);
    text-align: left;
    z-index: 9999;
    margin-bottom: 10px;
}`,
            cookieBannerButtonRule:

                `.cookie-banner button {
    margin-left: 10px;
}`

        })
        document.body.appendChild(banner);

        // Add an event listener to the accept button
        banner.querySelector('#accept-button').addEventListener('click', () => {
            // Set a cookie to remember that the user has accepted cookies & add Google Analytics
            document.cookie = 'cookiesAccepted=true';

            scriptFunctions;
            document.body.removeChild(banner);
        });
    };


    static addButtonToggle = (containerId, contentId) => {
        const container = document.getElementById(containerId);
        const button = Element.create({ type: 'div', id: 'hamburger', className: 'hamburger' });
        button.innerHTML = '&#9776;'; // Unicode character for hamburger icon
        button.setAttribute('tabindex', 0);
        container.appendChild(button);
        NavigationHelper.addToggleButtonListener(contentId, button)

    }

    static addBrand = (brandName) => {
        const brand = Molecules.HomeLink(brandName)
        const brandContainer = document.getElementById('brand');
        brandContainer.append(brand)
    }

    static createInteractiveNavigation = (type, paths, root = null, brand = null) => {

        let nav = Molecules.TopNavigationContainer();
        const menu = Molecules.Menu();

        if (type === "footer") {
            nav = Molecules.Footer();
        }

        if (type === "top") {
            this.addBrand(brand)
        }


        const createNavLinks = (paths) => {

            const menuItemType = (page, type, root) => {
                return (type === 'footer' ? page.displayOptions.displayInFooter : page.displayOptions.displayInTopNavigation) && (page.root === root);
            }

            paths
                .sort((a, b) => a.id - b.id)
                .filter(page => menuItemType(page, type, root))
                .forEach((page) => {
                    const navItem = Molecules.NavigationItem(page);
                    menu.appendChild(navItem);
                    navItem.addEventListener('click', () => {
                    });

                });

        }

        if (paths && paths.length > 0) {
            createNavLinks(paths)
            nav.appendChild(menu);
            document.getElementById("nav").appendChild(nav);
        }


    };


    static createNavigation = (paths, brand) => {
        this.createInteractiveNavigation('top', paths, null, brand);
        this.createInteractiveNavigation('footer', paths, null, null);

    }


}

module.exports = {
    Partials
}