const scrollToElementByXpath = (path) => {
    const result = document.evaluate(
        path, 
        document, 
        null, 
        XPathResult.FIRST_ORDERED_NODE_TYPE, 
        null).singleNodeValue;
        result.scrollIntoView(false);
}

module.exports = { scrollToElementByXpath }