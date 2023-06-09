const content = [


   {
      id: 1,
      parentId: null,
      title: "HOME",
      href: "/",
      shortDescription: "Welcome to Magic - a lightweight JS framework for building static sites with client-side rendering.",
      displayOptions: { displayInFooter: true, displayInTopNavigation: false, displayShareLinks: false },
      html: `<h1> Welcome to MagicCat... </h1>
    
    <h2> a simple vanilla javascript CMS web application...  </h2> 
        <img alt="A line drawing of a jumping cat" src="data:image/webp;base64,UklGRgwQAABXRUJQVlA4WAoAAAAQAAAAtwEAoQEAQUxQSGMOAAAB8JZtmxXbtm29Ej4JISEclHBQcVDCQcFB4qDiABxkOgAH4AAcRDh4fmRJyJItK5UYY8xZI2IC9M////z/z////P/P//+/g/4rFJiPyzUBQygtbBx+FZh15H75LCzRSa7nfnBFRd9ak4F0KS+StQCTLy+SnwHqIuJg3SI1GfAlJMC0TW6GxQqIB7ptchm6AqIW6LapAqoCoh5otqmH5AqIeiBssxWmEqIRpm3yQCwhLkOzTQ0sJUQ14LZZhlhCNMKwTQ0sRcQD9TbLEEuIGkjb1MBSRJTBb7MMsYj0UG9TA1MRiXDbYRlCCXHADvUwlBCtEHY4wJWQHpod6qEvITXc9gTACkiAaY9GaAqIgF0RUglZwe8RUEJGiGWmgWbXDKGAVDDuGsuIh+UZVQFRBr+ngaaE9NCWmQqWPTX0JUQZ/A4PyUpID+0OzRBLSAXLnhqmEqIMfocBroT00O7QDdoSUsGyp4KlhCiD36EMVQnpod/TwFJCPCTbYRliAdEKcYcaWEpIDdMeyxALiAF+hxpYCoh6aPdYhlhAAqQ9aiBZ+dAKcY9WuBaQGm67AlCVDwfYHrWQrHhohrjLVriWjxpuuxSAqng4wHaphWSlQzPEfbbCtXjUcNunANSlwwFun1pIrnDoBu0TbIapdFSQniAPNIVDK8QnqAZ84ahheIZGWKxsGOCf4TJ0ZUM99M9QBXRlI0CyZ6gHuqKhGa5PUQ90RaMCqqeoB2LJ0A2SPUU9EEuGZbg+RzMQC4YqoHqOzcBvKxe6QbKnyGZg8uXCMlyfI7sB6atYqAKq50h1Bq5WKnSDFJ4kPwNLKBWWgcuTZC3ApVDIZ+Bqz5GqDEyhTMhGYPFPkhsBOisSUgvw9SSpzkD6KhOqMtDZk+RuANMvKxFyMzD5J0lh5X65Xj6sNEg9kPyzpCbzcOk+rSwoZiA+Ta6fv7sfvnxJkM/A5Wn3PrbjN8DgCoJsBjr7gW99M9+RLgVBdgMm+yFJFnuAKZQDqQcW/2OS/Azw28qBIsDXC0h1BtJnOVCVgc5eQG4EWD6LgdwMTP4FpGoFGEIpkHogxVeQmgwwuFKgmIHfLyFruO9cIZCfgcm9guR6gHSxMqAOuNlrSG4ESF8lwE9ArxcOI8ASzr4wAPR67bgCXN2ZFwbuo16+zkC6nHafC/e903/QeoAlnHH2tXDfO/1HwwxwtbPNLgkgN07/4ToD6etciwkgN6b/tvUAUzjP7AqwRr3BsAJ0dpKFBVij3mSTgfR1il0AWtPbdDeAKZxeNgC50lsNK0Bn55ZNwOj0bpsMpOrMsglo9IbdDaCz08omIOo9hxVYwkllExD1rq0HuJwx7vOaUvfLnmeXBES98SoDkz9b7MrD6+dz7JIAot66jQBf54qb2Dq4fa7jfq307usMDO5E8Qm41c63M0D62vFr4H6N+gP6GUjVaRIBor51DcDwyx7YZeF+rPSHbACudo78BrLXYz9zP12HYeLhLejPGVZgCSeIXYHZaXNztzU3Tn9UawF+nx42Ab1pp2vGDWPUn7fKwORPjg5o9NQQQwj6U9sN4OvUqICoI1pnYLDzwiXodUz9DKTqtJhgtYMiNQCdnRMN4HVcwwos/owIQK0jazeAy/lgC4w6uFUGJnc2XCHb0ZEbgRTPhRqodIAbgKudCB5odYj9DKRwGtgEsw6ytQBfZ0EH2R0lqcpAZ6dABKIOtM3A5E4An6DXse6BFP76bILZDpYiwNffXgfZ63D7DHT2V1cBUQfcZmByf3GWoNcx74EU/t6usNpBUwT4+lurgKDD7jPQ2V+ZJWh14G0GJvc3doVsR07qgVT9fVVApZ/1n133y46MIkBnf1mW4KafdNfEt9dPd1zkV2Dyf1c9ZPuRiY2pOi6yHkjxbyoAlX6yAfKtbmbu43GRYgY6+2uyBW7aads80Oje1Svw+8DIz8Dk/5YayLbNhrDJJhj10GagOzCyHuDr78gDtTb7hW0tZPdIdgOudlykmIGrvRn/cfk9dL/sYAwwanOV2BaAqM09MNmBkZuBVL2Tr8TD4etI1IDbdIEdA9y0swEmd2CkFmBw78INbHbHwRI02mhX9gTItkcRSPHIqFqBdHkPlwSsY9uEZgbicahh1dYruwZotD9moLMDI2sBpl//Ofs1ATSmbxvoj8MCcUsHtOOmANmeIL8Ckz8wkp8Blk/7D31cBu5nr4c1LIchwqqNNdB6Ng3Q6KnWA+nryEh1Bki/3au5j4/LpRsGvs+1HrsEzWFYoN4QgV4TjHoYINtzpJiBqzsyck3mvgsv8vHr0g2JnXPrtHGCWUcxQrZHARjVQHaPBmj0dD8DDJ92XCSLK/fT5cP9hP+4dENi/9pWps0N4A/DAo0e+gSzeaDWwwDZnie13KfOHxdJ1cjDobt8uD0fn5dhYm8ex7apQzDt9UCjo+gg2wNLkM0mGPV4gEY/Gm58uwzD78vl6+PxoZBc/93jZbj//XtI7JzHpg5OT7cJRh3GCkZ9bxNkrytk96iCbD8jWb3y48MwDNfwJ5Osbse84Ynr2NTB6adbyO44NNA8uAJBDRD1eIFGL+j7/EPfD/5P9q2Fuh3znvnWVF6vWQFRx3GE6rsKiIpAq8cRsr2CZCGEumn68fFToHN/uI0+3NdNcHrlBDcdi/CNS9DKJ7jpsSVo9A5DCKHn/mLH4D/aw3Iwqm8GWM0SzLahgVXv090AlnDcLENzIBpo7mog2ATZ67FLEN+IFEaAy2FTDckfiquTXRK06oCgjROserNVBiZ31DQDnR2FCmBKwKwGiNrYAf7dyEYgxaPmAdLFjoG/u199BHptjEDUG64BrnbM5EeA6zGQxRuwRnlg1EafoNdb9jOw+GMmhRXojoEki0HSCLNtsAlme0+yFkjxoEk90B6F70eo9NgNkL3edpWB7qiph+lYNNA8sEsCKr1xPwOTHTQBh+P63WcCaPXWrQdSOGgr+ENRA93Hx+c1AcxB774G+DpmI1SHQj0b16g/YMjA1Y5YA82xUP9gbfRntBmY/BmkdhzHsfb6c7ZA+jyD/sAxA4MvMPIzwG87Vj3Uf3+yBiB9HqoF/AkguRFgcMfJAToJqxXgYkfJA+4kkDUAS3WQNEJ/Fkh+BBjcMQqAOw2kmAEu7ghphOuJIGu578IB8sCZIPmZ++nz8GiGcCpIceQ+XdzBGaE6GSTf820XDk0DzekgWbNyP30emAj9CSEpjtynizsq9Wkh+Z5vu3BMRohnhWTNyn3njgjgzgtJceT+Yoejglknp78BpMvRuEJ7dkhhBFg+D0UHVOeHVK0AUzgOHdDrHI0ZYPB/kI+Pn+iAXmepNRmgc38IN7E7XeyBdUCvE9X1AOlif4KvxDPT1zdhAXqdq24ESBd7dzYAjPuA4ffnFaDX6RpGgHR5by4Bs9feuPI4R52xcQVYPt/ZADR6Zr1+dzOdtHEFWD7fVgUEPdlCcxuDTty4AiyfbypBq/O6yQDL51sC7MSSNRlgCu9J57Y1GWAI78bDfHJJ1mSAIbyXAOPpJVnD/fBZXCTXc58urrRIrufbaygtkjUr98uXFRZJ1ch96nxpkVybuR8+S4tkceY+XVxhkRR6vr2G0iJZs3LfFRdJ1QgQC4zkbkD8r3iYzjtphuT/IwLOPJshuRIjn2GyEiMPDEVGEeiKjBqgLjLqgarIaITki4ytMFmJkc9wLTKKQFNk1AJVkdEIyb+cFQFbYXIvNUMoAvIZ0tcrtdCUAUWAyb9OhLEQyM8A9cs4SKVAaoD0Msrgi4H8CtXL9NCWA7Vwe5kKloLgAHsVZQjlQDPEl+lhKAg13F7GAaEcOMC9inqYyoFuUL+MZYjlIMLyMmpgKQfK4F/GMtTloIf+ZVRDsmLgIb2OVmiKgVaIrxMhlYMabq+jFWIxcIB7nRqWYqAb1K9jGUIxiLA8qXNPUAtDMVAG/xySf4IDXDHooX+Kg+T3qYe+GHhI9owAJL8vAFYKtEJ8RsN93KURmmJQw/SM9hvirgipGBjgnzBCNQNxj1aIpUA9tE9I4GwG4p4almIQID0BkGwG4g7LEEqBVoj7VvCSzUDcphb6YlDDsG+EIMlmSH6bA6wUGOCeJZsh+U2aoS4FukG7q4f6Ti5D8psiTMWggrSrgeYb+QyLbbEMvhRohfg8+QyTbVAPfTFoYNhTwe2BKuC6JUCyUuAAtyPA+EgRCBu0QiwFukH7E+phsQ01JCsFFSw/YhnaDZZhskKgFaqfUAWERwrAZIWggeFHNMK0QREYCoED3I+4DM0GRaArA+qh/xHVgNugBphcEQiA+xHN0G9RD6RQAjRC8zMBCFtUA1xKQAXJtk171MOwST4DVzv/tEK9wQC3xwHVJtkILP78i7Bs0A3qPWph2Sa1wGSnnzLEDRFuuyxD3KEqw/X8a2Da4ADbowaS7VAEmtPPMoRHmiHu0grdHrVAPPvUw7ChhmFfBOIejUA8+xzgHjnA7VIPxD02A/HkUw/9I92g36cZ8DtkMxBPvgC4RwGS7bMZkt8hmwF/7mmE5pFWqPfJMiTbIZthOPkqSPYowmL75DNMtkMOCOeeVqgfWYbuCfLAtEfj+Rch2QNFID5BEeieEE8+rdA+Ug/4JygCV9vUAc3ZVwHukc2w2BPUA6l6ZFdgtrNPIwyP5DJM9gS1AIP7xiagN53+HqgeqQKGZyisbG9VAltY7JEi0D1D1m6KKoKWodmgGuieIYX1QY4qhBGS26Ae6J5SIme4blEP1GUkAGGLeiAWEfWQ/BbNkHwRsQzJb7EZkpUQ+QzJb5DPMFkJkc+Q/AYFIBQR+QzJb1APTRmRz5A+N9RwKyTyGVg+HwRYSon8CrCEb2qYi4msyQBDkLRALCeSNRlg6BJkKymStTzsVVpdf7e2rrhIrq+9/vn/n///+f+f///5/9+7AQBWUDggggEAANArAJ0BKrgBogE+kUihTSWkIyIgCACwEglpbuF3YRtACewD32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvrAAP7/3giswAAAAAAAAAAAAAAAAAAAAAAAAAAA"
></img>
      <h3>Features </h3>
      <ul>
            <li><b>Mobile First:</b> pre-built client-side features for responsive design and mobile-friendly features (e.g. 'scroll to top' buttons)</li>
            <li><b>Decent Lighthouse scores: Content only rendered when needed so the bundle sizes are tiny. Equally, as long as content HTML is well structured, Accessibility should score 100% </b> </li>
            <li><b>Decent SEO:</b>All core SEO features out of the box. </li>
            <li><b>Easy Script Injection</b> Simply inject the scripts you need to run, will only run once user accepts cookies</li>
            <li><b>Configurable CSS:</b> Only file that needs to be configured is CSS. You can also add your own classes that you can use in your content files</li>
            <li><b>Fetch Data from RSS at Build Time</b> Any pages that need to have set content updated regularly? (e.g. news feeds). Options to configure rss endpoints in content files. </li>
            </ul>

            <p>
            To see a demo of the website in action, please visit <a href="https://agilecats.xyz/" target="_blank" rel="noreferrer">https://agilecats.xyz/</a>. This link will open in a new tab, allowing you to explore the demo without losing this page. The demo showcases all of the features mentioned, including the mobile-first design, the responsive layout, the optimized performance, and the easy-to-use script injection. 
            </p>
    
   `
   },
   {
      id: 2,
      parentId: null,
      title: "PRIVACY",
      href: "/privacy",
      shortDescription: "Privacy Policy - learn more about your privacy when using this website.",
      displayOptions: { displayInFooter: true, displayInTopNavigation: false, displayShareLinks: false },

      html: `    <h1>Privacy Policy</h1>
   <p>PLACE PRIVACY POLICY HERE</p>`
   },
   {
      id: 3,
      parentId: null,
      title: "COOKIES",
      href: "/cookies",
      shortDescription: "Cookie Policy - learn more about how we use cookies.",
      displayOptions: { displayInFooter: true, displayInTopNavigation: false, displayShareLinks: false },
      html: `<h1> Cookie Policy </h1> <p> PLACE COOKIE POLICY HERE </p>`
   },

   {
      id: 4,
      parentId: null,
      title: "ABOUT",
      href: "/about",
      shortDescription: "About - learn more about MagicCat features.",
      displayOptions: { displayInFooter: true, displayInTopNavigation: true, displayShareLinks: false },
      html: `  <h1>MagicCat Features</h1>
    
      <h2>Mobile First</h2>
      <p>The website has pre-built client-side features that enable it to have a responsive design and mobile-friendly features. This includes things like 'scroll to top' buttons that make navigating the website easier on a mobile device.</p>
      
      <h2>Decent Lighthouse scores</h2>
      <p>The website is optimized for performance and accessibility, and is designed to score well in Lighthouse tests. The content is only rendered when needed, which keeps the bundle sizes tiny. Additionally, if the content HTML is well structured, the website should score 100% on accessibility tests.</p>
      
      <h2>Decent SEO</h2>
      <p>The website comes with all the core SEO features out of the box, which makes it easier to optimize for search engines. This includes things like meta tags, sitemaps, and other elements that help search engines understand what the website is about.</p>
      
      <h2>Easy Script Injection</h2>
      <p>The website makes it easy to inject scripts that are needed to run certain features. These scripts will only run once the user accepts cookies, which ensures that the website complies with privacy laws like GDPR.</p>
      
      <h2>Configurable CSS</h2>
      <p>The only file that needs to be configured for the website is the CSS file. This makes it easy to customize the look and feel of the website without having to modify any other files. Additionally, you can add your own classes that can be used in your content files.</p>
      
      <h2>Fetch Data from RSS at Build Time</h2>
      <p>If you have pages that need to have set content updated regularly, like news feeds, the website has an option to fetch data from RSS feeds at build time. This makes it easy to keep the website up-to-date without having to manually update the content.</p>
     
      <h2>Examples</h2>
      <p>
            To see a demo of the website in action, please visit <a href="https://agilecats.xyz/" target="_blank" rel="noreferrer">https://agilecats.xyz/</a>. This link will open in a new tab, allowing you to explore the demo without losing this page. The demo showcases all of the features mentioned, including the mobile-first design, the responsive layout, the optimized performance, and the easy-to-use script injection. 
            </p>

      `
   },


   {
      id: 4,
      parentId: null,
      title: "NEWS",
      href: "/news",
      displayOptions: { displayInTopNavigation: true, displayInFooter: false, displayShareLinks: true },
      shortDescription: "A list of recent articles about Technology, Science and the Environment...",
      html: `
    <h1>NEWS</h1>
    <p>Recent news about technology, science, the environment & business...</p>

`
   },
   {
      id: 6,
      parentId: 5,
      title: "TECH NEWS",
      href: "/news/tech",
      displayOptions: { displayInTopNavigation: true, displayInFooter: false, displayShareLinks: true },
      shortDescription: "An example on how to add Rss feeds.",
      type: 'rss',
      urls: [
         { url: 'https://feeds.bbci.co.uk/news/technology/rss.xml', source: "BBC" },
         { url: 'https://www.techrepublic.com/rssfeeds/articles/', source: "TECH REPUBLIC" },
         { url: 'https://www.computerweekly.com/rss/Latest-IT-news.xml', source: "COMPUTER WEEKLY" }
      ],
      html: `
    <h1>TECH NEWS</h1>
    <p>A list of recent articles about Technology...</p>

`
   },



];

module.exports = { content };
