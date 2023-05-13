export class Styles {
    static setStyles = (styles) => {
        const style = document.createElement("style");
        document.head.appendChild(style);
        Object.values(styles).forEach((rule) => {
            style.sheet.insertRule(rule, style.sheet.cssRules.length);
        });
    };
}