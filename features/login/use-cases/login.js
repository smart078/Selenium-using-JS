const { Builder, By, Key, until } = require('selenium-webdriver');

const { HOST } = require('../../../constant');
const { findClasses, findTags } = require('../../../utils/find-element');
const { timeout } = require('../../../utils/timeout');


module.exports = async () => {
  let driver = await new Builder().forBrowser('chrome').build();

  const featurePath = `${HOST}/users/dashboards/`;
  try {
    await driver.get(featurePath);
    await (await findClasses(driver, 'login-btn')).click();
    await timeout(1000);
    const InputEm = driver.findElement(By.className("form-control ltr_override"));
    await InputEm.sendKeys("qa_test1@banpu.co.th");
    await (await findClasses(driver, 'btn btn-block btn-primary')).click();
    await timeout(2000);
    const InputPsw = driver.findElement(By.xpath(`//input[@name='passwd']`));
    await InputPsw.sendKeys("P@ssw0rd1");
    await (await driver.findElement(By.xpath("//input[@value='Sign in']"))).click();
    await (await driver.findElement(By.xpath("//input[@value='Yes']"))).click();
    await timeout(2000);
    await driver.findElement(By.id("dropdownMenuButton")).click();
    await (await findTags(driver, 'a', 'Sign out')).click();

    } finally {
    //await driver.quit();
  }
};