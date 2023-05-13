
export class MetaTagsManager {
    static setMetaTags(brand, path) {
        // Remove existing meta and title tags, except the viewport meta tag
        const existingMetaTags = document.querySelectorAll("meta[name]:not([name='viewport']),title");
        existingMetaTags.forEach((tag) => {
            tag.remove();
        });



        // Create or update meta and title tags
        const description = document.createElement("meta");
        description.setAttribute("name", "description");
        description.setAttribute("content", path.shortDescription);
        document.head.appendChild(description);

        const title = document.createElement("title");
        title.innerText = brand + " - " + path.title;
        document.head.appendChild(title);
    }
}


