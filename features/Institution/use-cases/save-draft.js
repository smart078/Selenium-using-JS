const { Builder } = require('selenium-webdriver');
const faker = require('faker');

const { HOST } = require('../../../constant');
const {
  findInputs,
  findTags,
  matchUrl,
} = require('../../../utils/find-element');
const { timeout } = require('../../../utils/timeout');

module.exports = async () => {
  let driver = await new Builder().forBrowser('chrome').build();

  const featurePath = `${HOST}/users/dashboards/institution`;

  try {
    const mockName1 = faker.lorem.words();

    await driver.get(featurePath);
    await (await findTags(driver, 'a', 'Draft')).click();
    const inputEl = await findInputs(driver, 'Enter name');
    await inputEl.clear();
    await inputEl.sendKeys(mockName1);
    await (await findTags(driver, 'button', 'Save Draft')).click();
    await timeout(1000);
    await (await findTags(driver, 'a', 'Cancel')).click();
    await matchUrl(driver, featurePath);
    await (await findTags(driver, 'a', 'Draft')).click();
    const input1Text = await (await findInputs(driver, 'Enter name')).getAttribute('value');
    expect(input1Text).toBe(mockName1);
  } finally {
    await driver.quit();
  }
};
