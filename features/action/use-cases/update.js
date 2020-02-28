const { Builder } = require('selenium-webdriver');
const faker = require('faker');

const { HOST } = require('../../../constant');
const {
  findClasses,
  findTags,
  findInputs,
} = require('../../../utils/find-element');

module.exports = async () => {
  let driver = await new Builder().forBrowser('chrome').build();

  const featurePath = `${HOST}/users/dashboards/action`;

  try {
    const mockName = faker.lorem.words();

    await driver.get(featurePath);
    await (await findClasses(driver, 'fas fa-pen')).click();
    const inputEl = await findInputs(driver, 'Enter name');
    await inputEl.clear();
    await inputEl.sendKeys(mockName);
    await (await findClasses(driver, 'fas fa-save')).click();
    await (await findTags(driver, 'button', 'Ok')).click();
    await findTags(driver, 'div', mockName);
  } finally {
    await driver.quit();
  }
};
