export class NavigationHelper {
    static addTargetBlankClickListener(element, targetClass) {
        const targetContainer = document.getElementById(element)
        targetContainer.addEventListener("click", (event) => {
            let target = event.target;
            while (target !== targetContainer && !target.classList.contains(targetClass)) {
                target = target.parentNode;
            }
            if (target.classList.contains(targetClass) && target.getAttribute("id") !== null) {
                window.open(target.getAttribute("id"), '_blank', 'noopener,noreferrer');
            }
        });
    }

    static addNavigationClickListener(element, href) {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            window.history.pushState(null, "", href);
            window.dispatchEvent(new PopStateEvent("popstate"));
        });
    }


    static addToggleButtonListener(contentId, element) {

        const content = document.getElementById(contentId);

        let isContentVisible = true;

        element.addEventListener('click', () => {
            if (isContentVisible) {
                content.style.display = 'none';
                isContentVisible = false;

            } else {
                content.style.display = 'block';
                isContentVisible = true;
            }
        });

        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (isContentVisible) {
                    content.style.display = 'none';
                    isContentVisible = false;
                } else {
                    content.style.display = 'block';
                    isContentVisible = true;
                }
            }
        });

    }


    static addEnterKeyListener(element, href) {
        element.setAttribute('tabindex', '0');
        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                window.history.pushState(null, "", href);
                window.dispatchEvent(new PopStateEvent("popstate"));
            }
        });
    }

    static LocationOnPageLoad = (page, appendTo) => {
        const pathParts = window.location.pathname.split('/');
        const pageParts = page.href.split('/').filter(part => part !== '');
        if (pathParts.length === 0 && pageParts.length === 0) {
            appendTo.classList.add('active');
            return;
        }

        const matchingParts = pathParts.filter(part => pageParts.includes(part));

        if (matchingParts.length === pageParts.length) {
            appendTo.classList.add('active');
            const subMenu = appendTo.closest('.sub-menu');
            if (subMenu) {
                subMenu.classList.add('show');
            }
        } else {
            appendTo.classList.remove('active');
        }
    }



    static addPopStateListener(ul) {
        window.addEventListener('popstate', () => {
            const pathParts = window.location.pathname.split('/');
            ul.querySelectorAll('li').forEach(li => {
                let liParts = [];
                if (li && li.href) {
                    liParts = li.href.split('/').filter(part => part !== '');
                }
                const matchingParts = pathParts.filter(part => liParts.includes(part));
                if (li.href === '/' && window.location.pathname === li.href) {
                    if (window.location.pathname === '/' && li.href.length === 1) {
                        li.classList.add('active');
                    } else {
                        li.classList.remove('active');
                    }
                } else if (matchingParts.length === liParts.length) {
                    li.classList.add('active');
                    ul.classList.add('show');

                } else {
                    li.classList.remove('active');
                }
            });
        });
    }










}