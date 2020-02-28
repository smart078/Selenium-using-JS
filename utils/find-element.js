const { By, until } = require('selenium-webdriver');
const { ELEMENT_TIMEOUT } = require('../constant');

const findInputs = async (driver, placeholder, index = 0) => {
  const located = By.xpath(`//input[@placeholder='${placeholder}']`);
  return findElement(driver, located, index);
};

const findTags = async (driver, tag, text, index = 0) => {
  const located = By.xpath(`//${tag}[contains(.,'${text}')]`);
  return findElement(driver, located, index);
};

const findClasses = async (driver, className, index = 0) => {
  const located = By.className(className);
  return findElement(driver, located, index);
};

const findElement = async (driver, located, index = 0) => {
  await driver.wait(until.elementLocated(located), ELEMENT_TIMEOUT);
  const items = await driver.findElements(located);
  return driver.wait(until.elementIsVisible(items[index]), ELEMENT_TIMEOUT);
};

const matchUrl = async (driver, url) => {
  return driver.wait(until.urlIs(url), ELEMENT_TIMEOUT);
};

module.exports = {
  findInputs,
  findTags,
  findClasses,
  matchUrl,
};
