export class LoadingHelpers {

    static generateShareUrl = (attribute) => {
        const anchorName = attribute.getAttribute('id');
        const pageUrl = window.location.href.split('#')[0];
        if (anchorName === null) {
            return pageUrl;
        } else {
            return `${pageUrl}#${anchorName}`;
        }
    }

    static concatURIEncodedLink = (parentUrl, childUrl) => {

        return `${parentUrl}${encodeURIComponent(childUrl)}`
    }


    static generateSocialMediaLinks = (copyMessageDestination, shareTarget, socialMedia, copyLinkLocation) => {
        const shareUrl = this.generateShareUrl(shareTarget);


        socialMedia.forEach(media => {
            this.openNewWindow({
                onClickTarget: copyLinkLocation.querySelector(`.${media.name}-share`),
                destinationUrl: this.concatURIEncodedLink(media.url, this.generateShareUrl(shareTarget))
            });
        });

        const copyLinkButton = copyLinkLocation.querySelector('.copy-link');
        copyLinkButton.addEventListener('click', () => {
            navigator.clipboard.writeText(shareUrl);
            const copiedMessage = document.createElement('h3');
            copiedMessage.classList.add('copied-message');
            copiedMessage.innerHTML = '📋';
            copyMessageDestination.appendChild(copiedMessage);
            setTimeout(() => {
                copiedMessage.remove();
            }, 1500);
        });

    }



    static lazyLoadImages = (container) => {
        const images = container.querySelectorAll("img[data-src]");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach((img) => observer.observe(img));
    };



    static openNewWindow = ({ onClickTarget, destinationUrl }) => {
        const target = onClickTarget;
        target.addEventListener('click', () => {
            window.open(destinationUrl);
        });


    }

    static loadGoogleAdsScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7486693483632710';
            script.crossOrigin = 'anonymous';
            script.onload = () => resolve();
            document.head.appendChild(script);
        });


    }






}