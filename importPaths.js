export const importPaths = {
    "": async () => await import(`./content/home.js`),
    "privacy": async () => await import(`./content/privacy.js`),
    "cookies": async () => await import(`./content/cookies.js`),
    "about": async () => await import(`./content/about.js`),
    "news": async () => await import(`./content/news.js`),
    "news/tech": async () => await import(`./content/news/tech.js`),
};
