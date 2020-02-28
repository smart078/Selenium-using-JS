const { Builder } = require('selenium-webdriver');
const faker = require('faker');

const { HOST } = require('../../../constant');
const {
  findInputs,
  findTags,
  findClasses,
  matchUrl,
} = require('../../../utils/find-element');

module.exports = async () => {
  let driver = await new Builder().forBrowser('chrome').build();

  const featurePath = `${HOST}/users/dashboards/action`;

  try {
    const mockName1 = faker.lorem.words();
    const mockName2 = faker.lorem.words();

    await driver.get(featurePath);
    await (await findTags(driver, 'a', 'Create')).click();
    await (await findTags(driver, 'a', 'Publish')).click();
    await (await findTags(driver, 'button', 'Ok')).click();
    await (await findClasses(driver, 'fas fa-plus')).click();
    await (await findInputs(driver, 'Enter name')).sendKeys(mockName1);
    await (await findInputs(driver, 'Enter name', 1)).sendKeys(mockName2);
    await (await findClasses(driver, 'fas fa-minus', 1)).click();
    await (await findTags(driver, 'button', 'Ok')).click();
    await (await findClasses(driver, 'far fa-clone')).click();
    await (await findClasses(driver, 'fas fa-minus', 1)).click();
    await (await findTags(driver, 'button', 'Ok')).click();
    await (await findTags(driver, 'a', 'Publish')).click();
    await (await findTags(driver, 'button', 'Ok')).click();
    await matchUrl(driver, featurePath);
    await findTags(driver, 'div', mockName1);
  } finally {
    await driver.quit();
  }
};
