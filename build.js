const fs = require('fs');
const path = require('path');
const { content } = require('./content');


const generatePaths = (content) => {
    const paths = content.map(obj => {
        const splitHref = obj.href.split('/');
        const depth = splitHref.length - 1;
        const root = depth > 1 ? splitHref.slice(0, -1).join('/') : null;
        const parent = depth > 1 ? splitHref.slice(0, -2).join('/') : null;
        const filePath = `./content/${obj.href.replace(/\/+$/, '')}.js`;
        const type = obj.type !== null || obj.type !== undefined ? obj.type : "html";
        return { href: obj.href, type, depth, root, parent, filePath, displayOptions: obj.displayOptions, shortDescription: obj.shortDescription, id: obj.id, title: obj.title };
    });
    return `export const paths = ${JSON.stringify(paths)};`;
};

const generatePageData = () => {
    const hrefHtml = content.map(obj => {
        return { href: obj.href, html: obj.html, displayShareLinks: obj.displayOptions.displayShareLinks };
    });
    return `export const hrefHtml = ${JSON.stringify(hrefHtml)};`;
};

const generateSitemap = (content, baseUrl) => {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    content.forEach(page => {
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}${page.href}</loc>\n`;
        sitemap += `  </url>\n`;
    });
    sitemap += `</urlset>`;
    return sitemap;
}


async function appendRssEntries(obj, pageData) {

    function convertDate(rfcDate) {
        let date = new Date(rfcDate);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    try {

        // read the existing rssData array from the file
        const existingRssData = require('./rssData.js');

        const flattenKeys = (obj) => {
            let values = Object.values(obj);
            let sum = values.reduce((a, b) => a + b, 0);
            let mean = Math.floor(sum / values.length);
            return Object.keys(obj).filter(key => obj[key] >= 2).join(' ');
        }

        // let allItems = existingRssData;
        let allItems = existingRssData.filter(item => obj.urls.some(urlObj => urlObj.url === item.feed));
        allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        let rssHtml = '<div id="rss-path-container"><ul>';
        allItems.forEach(item => {
            // limit summary to 10 characters and add ellipsis
            let summary = item.summary.substring(0, 80).replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
            const date = convertDate(item.pubDate)

            if (item.summary.length > 80) {
                summary = summary.substring(0, summary.length - 1) + "...";
            }

            rssHtml += `
            <li class="external-card-link" href="${item.link}">
                <div id="${item.guid}" tabindex="0" class="card">
                    <div class="external-card-title">${item.title}</div>
                    <div class="external-card-description">${summary}</div>
                    <div class="external-card-invisible">${flattenKeys(item.keywords)}</div>
                    <div class="card-subtitle-left">${date} </div>
                    <div class="card-subtitle-right">${item.source}</div>
                </div>
            </li>`;
        });
        rssHtml += '</ul></div>';
        pageData.html += rssHtml;
    } catch (error) {
        console.error(error);
    }
}


const generatePageFiles = (content) => {
    content.forEach(async obj => {
        const pageData = {
            href: obj.href,
            html: obj.html,
            displayShareLinks: obj.displayOptions.displayShareLinks
        };
        if (obj.type === 'rss' && obj.urls) {
            await appendRssEntries(obj, pageData);
        }
        const pageDataString = `export default ${JSON.stringify(pageData)};`;
        const pageDir = path.join(__dirname, 'content', path.dirname(obj.href));
        fs.mkdirSync(pageDir, { recursive: true });
        let pageName = path.basename(obj.href);
        if (pageName === '') {
            pageName = 'home';
        }
        const pageDataPath = path.join(pageDir, `${pageName}.js`);
        fs.writeFileSync(pageDataPath, pageDataString);
    });
};


const generateImportPathsFile = (content) => {
    let importPathsString = 'export const importPaths = {\n';
    importPathsString += '    "": async () => await import(`./content/home.js`),\n';
    content.forEach(obj => {
        let pagePath = obj.href;
        if (pagePath.startsWith('/')) {
            pagePath = pagePath.slice(1);
        }
        if (pagePath !== '') {
            const importPath = `./content/${pagePath}.js`;
            importPathsString += `    "${pagePath}": async () => await import(\`${importPath}\`),\n`;
        }
    });
    importPathsString += '};\n';

    const filePath = path.join(__dirname, 'importPaths.js');
    fs.writeFileSync(filePath, importPathsString);
};

generatePageFiles(content)

const baseUrl = process.argv[2];
const sitemap = generateSitemap(content, baseUrl);
const pageData = generatePageData(content);
const paths = generatePaths(content);


// define the output path
const outputPath = path.join(__dirname, 'sitemap.xml');
const hrefPath = path.join(__dirname, 'paths.js');
const pageDataPath = path.join(__dirname, 'pageData.js');

generateImportPathsFile(content);
fs.writeFileSync(outputPath, sitemap);
fs.writeFileSync(hrefPath, paths);
fs.writeFileSync(pageDataPath, pageData)
