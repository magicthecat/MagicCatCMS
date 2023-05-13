export class UserInterfaceHelpers {

    static scrollToTop = () => {
        const documentHeight = document.documentElement.scrollHeight;
        const duration = Math.min(documentHeight / 2, 250);
        const scrollStep = -window.scrollY / (duration / 15);
        let scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }



}
