const { Builder } = require('selenium-webdriver');

const { HOST } = require('../../../constant');
const { findClasses, findTags } = require('../../../utils/find-element');

module.exports = async () => {
  let driver = await new Builder().forBrowser('chrome').build();

  const featurePath = `${HOST}/users/dashboards/action`;

  try {
    await driver.get(featurePath);
    await (await findClasses(driver, 'collapsed')).click();
    await (await findTags(driver, 'a', 'History Update')).click();
    await findTags(driver, 'div', 'create');
    await (await findClasses(driver, 'fas fa-times')).click();
  } finally {
    await driver.quit();
  }
};
