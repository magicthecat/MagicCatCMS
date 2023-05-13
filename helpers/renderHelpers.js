const { LoadingHelpers } = require('./loadingHelpers.js');
const { Molecules } = require('./htmlHelpers.js');
import { NotFound, ShareBox } from '../partials.js';
import { paths } from '../paths.js';
import { importPaths } from '../importPaths.js';
import { MetaTagsManager } from './metaTagHelpers.js';
import { NavigationHelper } from './navigationHelpers.js';

class PageTooling {
    static insertAnchors = () => {
        const app = document.getElementById('app');
        const h2Tags = app.querySelectorAll('h2');
        if (!h2Tags || h2Tags.length < 3) return;

        const anchors = Array.from(h2Tags).map((tag) => {
            const anchorName = tag.textContent
                .replace(/[^a-z0-9\s]/gi, '')
                .replace(/\s+/g, '-')
                .toLowerCase();
            tag.setAttribute('tabindex', '0');
            tag.setAttribute('id', anchorName);
            return `<li class="anchor-link"><a class="smooth-scroll anchor-link" id='${anchorName}-link' href="#${anchorName}">${tag.textContent}</a></li>`;
        });

        const anchorList = `<div id="anchor-box" class="anchor-box">
          <ul>${anchors.join('')}</ul>
          </div>`;

        const h1Tag = app.querySelector('h1');
        if (!h1Tag) {
            app.innerHTML = anchorList + app.innerHTML;
            return;
        }

        h1Tag.insertAdjacentHTML('afterend', anchorList);
        const content = document.createElement('div');
        content.classList.add('content');
        while (h1Tag.nextSibling.nextSibling) {
            content.appendChild(h1Tag.nextSibling.nextSibling);
        }
        h1Tag.nextSibling.insertAdjacentElement('afterend', content);
    };

    static insertShareIcons = (tagType, shareMessage, sharePanelClassName, shareLinkClassName) => {
        const app = document.getElementById('app');
        const Tags = app.querySelectorAll(tagType);
        const socialMedia = [
            { name: 'twitter', url: 'https://twitter.com/intent/tweet?url=' },
            { name: 'facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
            { name: 'reddit', url: 'https://www.reddit.com/submit?url=$' },
            { name: 'linkedin', url: 'https://www.linkedin.com/shareArticle?mini=true&url=$' }
        ];

        Tags.forEach((tag) => {
            const shareContainer = document.createElement('div');
            shareContainer.classList.add('share-container');
            const shareLink = document.createElement('div');

            shareLink.classList.add(shareLinkClassName);
            shareLink.innerHTML = shareMessage;
            shareContainer.appendChild(shareLink);
            tag.insertAdjacentElement('afterend', shareContainer);
            shareLink.addEventListener('click', () => {
                const sharePanel = document.createElement('div');
                sharePanel.classList.add(sharePanelClassName);
                sharePanel.innerHTML = ShareBox
                sharePanel.classList.add('active');
                app.appendChild(sharePanel);
                const closeButton = sharePanel.querySelector('.close-button');
                closeButton.addEventListener('click', () => {
                    sharePanel.remove();
                });

                document.addEventListener('click', (event) => {
                    if (!sharePanel.contains(event.target) && event.target !== shareLink) {
                        sharePanel.remove();
                    }
                });

                LoadingHelpers.generateSocialMediaLinks(app, tag, socialMedia, sharePanel)

            });



        });
    };

    static renderStaticContent = (page) => {
        if (page) {
            const app = document.getElementById("app");
            app.innerHTML = page.html;
            LoadingHelpers.lazyLoadImages(app);
            this.insertAnchors();
            const scrollToTopButton = Molecules.ScrollToTopButton();
            document.body.appendChild(scrollToTopButton);


            window.addEventListener('scroll', function () {
                var anchorBox = document.querySelector('.anchor-box');

                if (anchorBox) {
                    if (window.pageYOffset > 200) {
                        anchorBox.classList.add('sticky');

                    } else {
                        anchorBox.classList.remove('sticky');
                    }

                }
            });


            window.addEventListener('scroll', () => {


                // Get all the h2 elements
                const h2Tags = document.querySelectorAll('h2');

                // Initialize a variable to store the active h2 element
                let activeH2;

                // Loop through all the h2 elements
                for (let i = 0; i < h2Tags.length; i++) {
                    // Get the current h2 element
                    const h2Tag = h2Tags[i];
                    // Check if the position of the h2 element is less than or equal to 0
                    if (h2Tag.getBoundingClientRect().top <= 0) {
                        // Add an active class to the h2 element
                        h2Tag.classList.add('active');
                        // Store a reference to the active h2 element
                        activeH2 = h2Tag;
                    } else {
                        // Remove the active class from the h2 element
                        h2Tag.classList.remove('active');
                    }
                }

                // Check if an active h2 element was found
                if (activeH2) {
                    // Get the id of the active h2 element
                    const id = activeH2.getAttribute('id');

                    // Get all the anchor links
                    const anchorLinks = document.querySelectorAll('.anchor-link');

                    // Loop through all the anchor links
                    for (let i = 0; i < anchorLinks.length; i++) {
                        // Get the current anchor link
                        const anchorLink = anchorLinks[i];
                        // Check if the id of the anchor link matches the id of the active h2 element
                        if (anchorLink.getAttribute('id') === id + '-link') {
                            // Calculate the position of the horizontal scrollbar in the anchor-box div
                            const scrollLeft = anchorLink.offsetLeft;
                            // Update the position of the horizontal scrollbar in the anchor-box div
                            document.getElementById('anchor-box').scrollLeft = scrollLeft;
                        }
                    }
                }
            });


        }
    };

    static generateParentPage = (paths) => {
        const currentPath = window.location.pathname;
        const currentPathParts = currentPath.split('/');
        const firstLevelRoute = currentPathParts[1];
        const app = document.getElementById('sub-menu-container');

        const componentName = document.createElement('h2');
        componentName.textContent = 'CONTENT';


        app.innerHTML = '';

        // Remove the backLink element if it exists
        const nav = document.getElementById('back-button-container');
        const backLink = nav.querySelector('.back-link');
        if (nav && backLink) {
            nav.removeChild(backLink);
        }

        const childPages = paths.filter((path) => path.root === `/${firstLevelRoute}`);
        let filteredPages = [...childPages];

        const searchInput = document.createElement('input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('id', 'search-bar');
        searchInput.setAttribute('placeholder', 'Search...');
        searchInput.setAttribute('tabindex', 0);

        const searchButton = document.createElement('button');
        searchButton.setAttribute('type', 'button');
        searchButton.setAttribute('tabindex', 0);
        searchButton.textContent = 'Search';
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const searchWords = searchTerm.split(' ');
            filteredPages = childPages.filter((page) => {
                const description = page.shortDescription.toLowerCase();
                const title = page.title.toLowerCase();
                const maxDistance = 2; // maximum Levenshtein distance allowed
                return searchWords.some(word => {
                    const descriptionDistance = levenshteinDistance(word, description);
                    const titleDistance = levenshteinDistance(word, title);
                    return (description.includes(word) || title.includes(word)) ||
                        (descriptionDistance <= maxDistance || titleDistance <= maxDistance);
                });
            });
            updateCardLinks(filteredPages);
        });

        function levenshteinDistance(a, b) {
            if (a.length === 0) return b.length;
            if (b.length === 0) return a.length;

            const matrix = [];
            for (let i = 0; i <= b.length; i++) {
                matrix[i] = [i];
            }
            for (let j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) === a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(
                            matrix[i - 1][j - 1] + 1,
                            matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1
                        );
                    }
                }
            }
            return matrix[b.length][a.length];
        }

        const clearButton = document.createElement('button');
        clearButton.setAttribute('type', 'button');
        clearButton.textContent = 'Refresh';
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            filteredPages = childPages;
            updateCardLinks(filteredPages);
        });

        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search-bar-container');
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchButton);
        searchContainer.appendChild(clearButton);

        if (childPages.length > 0 && currentPathParts.length === 2) {
            app.appendChild(searchContainer);
        }

        if (currentPathParts.length < 2 && !filteredPages.length) {
            return;
        }

        if (currentPathParts.length > 2) {
            const backLink = Molecules.NavigationItem({
                href: `/${firstLevelRoute}`,
                title: `BACK TO ${firstLevelRoute.toUpperCase()}`,
            });
            backLink.classList.add('back-link');
            if (nav && backLink) {
                nav.appendChild(backLink);
                backLink.addEventListener('click', () => {
                    // Check if backLink is still a child of nav before attempting to remove it
                    if (nav.contains(backLink)) {
                        nav.removeChild(backLink);
                    }
                });
            }
        } else {

            updateCardLinks(filteredPages);
        }

        function updateCardLinks(filteredPages) {
            const menu = Molecules.Menu();
            const links = filteredPages.map((page) => {
                const link = Molecules.Card(page);
                const li = document.createElement('li');
                li.classList.add('card-link');
                li.appendChild(link);
                if (li) {
                    menu.appendChild(li);
                }
            });


            if (childPages.length > 0 && currentPathParts.length === 2) {

                app.innerHTML = '';
                app.appendChild(componentName);
                app.appendChild(searchContainer); // add searchContainer to app
                app.appendChild(menu);
            }
        }
    };

    static generateParentLinks = (paths) => {
        const currentPath = window.location.pathname;
        const app = document.getElementById('primary-path-container');
        app.innerHTML = '';


        const firstLevelRoutes = paths.filter(path => path.root === null && path.href !== "/" && path.href !== "/cookies" && path.href !== "/privacy");
        const menu = Molecules.Menu();
        firstLevelRoutes.map((route) => {
            const link = Molecules.Card(route);
            const li = document.createElement('li');
            li.classList.add('card-link');
            li.appendChild(link);
            if (li) {
                menu.appendChild(li);
            }
        });

        if (window.location.pathname === "/") {
            app.appendChild(menu);

        }

    };

    static createSearchBar(targetId) {

        function levenshteinDistance(a, b) {
            if (a.length === 0) return b.length;
            if (b.length === 0) return a.length;

            const matrix = [];

            // increment along the first column of each row
            for (let i = 0; i <= b.length; i++) {
                matrix[i] = [i];
            }

            // increment each column in the first row
            for (let j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }

            // Fill in the rest of the matrix
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) === a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(
                            matrix[i - 1][j - 1] + 1, // substitution
                            Math.min(
                                matrix[i][j - 1] + 1, // insertion
                                matrix[i - 1][j] + 1 // deletion
                            )
                        );
                    }
                }
            }

            return matrix[b.length][a.length];
        }

        function fuzzySearch(string, search) {
            const words = string.split(/\s+/);
            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                const distance = levenshteinDistance(word.toLowerCase(), search.toLowerCase());
                if (distance < Math.min(search.length / 2, 3)) {
                    return true;
                }
            }
            return false;
        }

        const targetElem = document.getElementById(targetId);

        // Create search bar container
        const searchBarContainer = document.createElement("div");
        searchBarContainer.classList.add("search-bar-container");

        // Create search bar input element
        const searchBarInput = document.createElement("input");
        searchBarInput.type = "text";
        searchBarInput.placeholder = "Search...";
        searchBarContainer.appendChild(searchBarInput);

        const displayNoResult = (card) => {
            card.style.display = "none";
        }

        // Create search button
        const searchButton = document.createElement("button");
        searchButton.textContent = "Search";
        searchButton.addEventListener("click", function () {
            const searchText = searchBarInput.value.trim().toLowerCase();
            const searchWords = searchText.split(" ");
            const cards = targetElem.querySelectorAll(".external-card-link");
            cards.forEach((card) => {
                const title = card.querySelector(".external-card-title").textContent.trim();
                const description = card.querySelector(".external-card-description").textContent.trim();
                const keywords = card.querySelector(".external-card-invisible").textContent.trim();

                for (let i = 0; i < searchWords.length; i++) {
                    const word = searchWords[i];

                    if (fuzzySearch(title, word) || fuzzySearch(description, word) || fuzzySearch(keywords, word)) {
                        //score++;
                        card.style.display = "block";
                    }
                    else displayNoResult(card)
                }

            });
        });
        searchBarContainer.appendChild(searchButton);

        // Create refresh button
        const refreshButton = document.createElement('button');
        refreshButton.setAttribute('type', 'button');
        refreshButton.textContent = 'Refresh';
        refreshButton.addEventListener('click', () => {
            searchBarInput.value = '';
            const cards = targetElem.querySelectorAll('.external-card-link');
            cards.forEach(card => {
                card.style.display = 'block';
            });
        });
        searchBarContainer.appendChild(refreshButton);


        // Append search bar container above target element
        targetElem.parentNode.insertBefore(searchBarContainer, targetElem);

        return searchBarInput;
    }

}

class Page {

    static genereratePage = (brand, htmlModule) => {

        const html = htmlModule.default.html;
        const page = { html: html };
        PageTooling.renderStaticContent(page);
        PageTooling.generateParentPage(paths);
        PageTooling.generateParentLinks(paths);
        MetaTagsManager.setMetaTags(brand, paths.find((path) => path.href === window.location.pathname));
        const currentPath = paths.find((path) => path.href === window.location.pathname);

        if (currentPath.type === "rss") {
            PageTooling.createSearchBar('rss-path-container');
            NavigationHelper.addTargetBlankClickListener('rss-path-container', 'card')

        }

        if (htmlModule.default.displayShareLinks) {
            PageTooling.insertShareIcons('h1', "Share ➪", 'side-panel', 'share-page-link');
            PageTooling.insertShareIcons('h2', "Share Section ➪", 'side-panel', 'share-link');
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });


    }

    static generateNotFoundPage = () => {
        const page = { html: NotFound };
        PageRender.renderStaticContent(page);
    }


}

class PageRender {



    static handleRoutingPageRender = (brand) => {

        async function importHtmlForRoute(route) {
            const routeName = route.replace(/^\//, ""); // Remove leading '/'

            let htmlModule;
            try {
                htmlModule = await importPaths[routeName]();
            } catch (error) {
                console.error(error);
                const app = document.getElementById("app");
                app.innerHTML = NotFound;
                return;
            }
            return htmlModule;
        }

        // Function to render the HTML for the current route
        async function renderCurrentRoute() {
            const currentRoute = window.location.pathname;
            const htmlModule = await importHtmlForRoute(currentRoute);
            if (htmlModule) {
                Page.genereratePage(brand, htmlModule)
            } else {
                const app = document.getElementById("app");
                app.innerHTML = NotFound;
            }
        }

        // Listen for changes to the URL
        window.addEventListener("popstate", renderCurrentRoute);

        // Render the  HTML for the current route
        renderCurrentRoute();
    }



}


module.exports = {
    PageRender
}

