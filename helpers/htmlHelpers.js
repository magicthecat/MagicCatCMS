const { UserInterfaceHelpers } = require("./userInterfaceHelpers");
const { NavigationHelper } = require("./navigationHelpers");
const { Styles } = require("./styleHelpers");

export class Element {
    static create({ type, onCreate, ...props }) {
        const element = document.createElement(type);
        //   element.setAttribute('tabindex', 0);
        Object.entries(props).forEach(([key, value]) => {
            element[key] = value;
        });
        if (onCreate) {
            onCreate(element);
        }
        return element;
    }
}

export class Molecules {

    static Hamburger = (appendTo) => {
        const hamburger = Element.create({ type: 'div', id: 'hamburger', className: 'hamburger' });
        hamburger.innerHTML = '&#9776;'; // Unicode character for hamburger icon
        hamburger.setAttribute('tabindex', 0);
        hamburger.addEventListener('click', () => {
            appendTo.classList.toggle('show');
        });
        hamburger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                appendTo.classList.toggle('show');
            }
        });

        return hamburger;
    }

    static HomeLink = (brandName) => {
        const h3 = Element.create({
            type: "h3",
            textContent: brandName,
            href: "/",
            id: "home",
            onCreate: (element) => {

                element.addEventListener('click', (event) => {
                    event.preventDefault();
                    element.classList.add("active")
                    window.history.pushState(null, null, "/");
                    window.dispatchEvent(new PopStateEvent('popstate'));
                });

            }
        });

        return h3;
    }


    static NavigationItem = (page) => {
        const li = Element.create({
            type: "li",
            textContent: page.title,
            href: page.href,
            id: page.href + "-" + Math.floor(Math.random() * 10000),
            onCreate: (element) => {
                NavigationHelper.addEnterKeyListener(element, page.href);
                NavigationHelper.addNavigationClickListener(element, page.href);
            }
        });

        NavigationHelper.LocationOnPageLoad(page, li)
        return li;
    }

    static Card = (page) => {
        const card = Element.create({
            type: "div",
            class: "card",
            id: page.href + "-" + Math.floor(Math.random() * 10000),
            onCreate: (element) => {
                NavigationHelper.addEnterKeyListener(element, page.href);
                NavigationHelper.addNavigationClickListener(element, page.href);
            }
        });

        const title = Element.create({
            type: "div",
            class: "card-title",
            textContent: page.title
        });

        const description = Element.create({
            type: "div",
            class: "card-description",
            textContent: page.shortDescription
        });

        title.classList.add('card-title')
        description.classList.add('card-description')
        card.classList.add('card')
        card.appendChild(title);
        card.appendChild(description);




        NavigationHelper.LocationOnPageLoad(page, card)
        return card;
    }


    static TopNavigationContainer = () => {
        return Element.create({ type: "nav" });
    }

    static Footer = () => {
        return Element.create({ type: "footer" });
    }

    static Menu = () => {


        const ul = Element.create({ type: "ul" });
        NavigationHelper.addPopStateListener(ul)
        return ul
    }

    static ScrollToTopButton = () => {
        const button = Element.create({ type: 'div', className: 'scrollButton', title: 'Go to top', textContent: "Top" });
        button.setAttribute('tabindex', 0);
        button.addEventListener('click', () => {
            UserInterfaceHelpers.scrollToTop();
        });


        button.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                UserInterfaceHelpers.scrollToTop();
            }
        });


        window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                button.style.display = "block";
            } else {
                button.style.display = "none";
            }
        };

        Styles.setStyles({

            scrollButtonRule: `.scrollButton {
                display: none;
                position: fixed;
                bottom: 5px;
                right: 20px;
                z-index: 99;
                border: none;
                outline: none;
                background-color: var(--warning-background-color);
                color: var(--primary-font-color);
                cursor: pointer;
                padding: 10px;
                border: dotted black 1px;
                border-radius: 5px;
                font-weight: bold;
                font-size: 12.5px;
                z-index: 900;
    
            }`,

            scrollButtonFocusRule: `.scrollButton:focus {
                background-color: var(--primary-color);
                color: var(--primary-font-color);
                border-radius: 5px;
                font-weight: bolder;
            }`


        })

        return button;
    }


}



