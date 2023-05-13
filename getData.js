
const fs = require('fs');
const https = require('https');
const { XMLParser } = require("fast-xml-parser");
const { content } = require('./content');


function getKeywords(str) {
    const keywords = {};
    const words = str.split(/\W+/);
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (word.length > 4) {
            if (i > 0 && word[0].match(/[A-Z]/)) {
                if (keywords[word]) {
                    keywords[word] += 3;
                } else {
                    keywords[word] = 2;
                }
            } else if (word.length > 4) {
                if (keywords[word]) {
                    keywords[word] += 3;
                } else {
                    keywords[word] = 1;
                }
            }
        }
    }
    return keywords;
}

const getSummary = (text) => {
    const regex = /(<([^>]+)>)/gi;
    const sentence = text.replace(regex, '').match(/[^\.\?\!]+[\.\?\!]/)[0].trim();
    if (sentence.split(" ").length > 15) {
        const words = sentence.split(" ");
        const newSentence = words.slice(0, 20).join(" ").replace(/[^\w\s]$/, '');
        return `${newSentence}...`;
    }
    return sentence;
}


async function getRssData() {
    content.forEach(async obj => {

        let rssData = [];
        try {
            // check if the rssData file already exists
            if (fs.existsSync('./rssData.js')) {
                // read the existing rssData array from the file
                const existingRssData = require('./rssData.js');
                rssData = existingRssData;
            }

            // get new data for each url
            if (obj.type === 'rss' && obj.urls) {

                for (const { url, source } of obj.urls) {

                    const data = await new Promise((resolve, reject) => {
                        https.get(url, res => {
                            let data = '';
                            res.on('data', chunk => {
                                data += chunk;
                            });
                            res.on('end', () => {
                                resolve(data);
                            });
                        }).on('error', err => {
                            reject(err);
                        });
                    });
                    const parser = new XMLParser();
                    const feed = parser.parse(data);
                    const items = feed.rss.channel.item;
                    // add new items to rssData array

                    items.forEach(item => {
                        const itemExists = rssData.some(entry => entry.guid === item.guid);
                        let titleKeywords = [];
                        let descriptionKeywords = [];
                        let summary = "Click to read more...";
                        if (!itemExists) {
                            if (item.title) {
                                titleKeywords = getKeywords(item.title);
                            }
                            if (item.description) {
                                console.log(item.description)
                                descriptionKeywords = getKeywords(item.description);
                                summary = getSummary(item.description);

                            }
                            const keywords = { ...titleKeywords, ...descriptionKeywords };
                            item.keywords = keywords;
                            if (item.summary) {

                            }
                            item.summary = summary;
                            item.source = source; //getDomainWithoutTLD(item.guid);
                            item.feed = url;
                            rssData.push(item);
                        }
                    });
                }
            }

            // write rssData array to file
            fs.writeFileSync('./rssData.js', `const rssData = ${JSON.stringify(rssData)};\n\nmodule.exports = rssData;`);
        } catch (error) {
            console.error(error);
        }
    });
}






getRssData()