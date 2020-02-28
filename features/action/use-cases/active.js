const { Builder } = require('selenium-webdriver');

const { HOST } = require('../../../constant');
const { findClasses } = require('../../../utils/find-element');
const { timeout } = require('../../../utils/timeout');

module.exports = async () => {
  let driver = await new Builder().forBrowser('chrome').build();

  const featurePath = `${HOST}/users/dashboards/action`;

  try {
    await driver.get(featurePath);
    await (await findClasses(driver, 'collapsed')).click();
    const oldUpdatedTime = await (
      await findClasses(driver, 'updated-time')
    ).getText();
    await (await findClasses(driver, 'v-switch-core')).click();
    await timeout(1000);
    await (await findClasses(driver, 'v-switch-core')).click();
    const newUpdatedTime = await (
      await findClasses(driver, 'updated-time')
    ).getText();
    await timeout(1000);
    expect(newUpdatedTime).not.toBe(oldUpdatedTime);
  } finally {
    await driver.quit();
  }
};
