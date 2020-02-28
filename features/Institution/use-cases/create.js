const { Builder, By, Key, until } = require('selenium-webdriver');
const faker = require('faker');

const { HOST } = require('../../../constant');
const {
  findInputs,
  findTags,
  findClasses,
  matchUrl,
} = require('../../../utils/find-element');
const { timeout } = require('../../../utils/timeout');

module.exports = async () => {
  let driver = await new Builder().forBrowser('chrome').build();

  const featurePath = `${HOST}/users/dashboards/institution`;

  try {
    const mockName1 = faker.lorem.words();
    const mockName2 = faker.lorem.words();

    await driver.get(featurePath);

    await (await findClasses(driver, 'login-btn')).click();
    await timeout(500);
    const InputEm = driver.findElement(By.className("form-control ltr_override"));
    await InputEm.sendKeys("qa_test1@banpu.co.th");
    await (await findClasses(driver, 'btn btn-block btn-primary')).click();
    await timeout(2000);
    const InputPsw = driver.findElement(By.xpath(`//input[@name='passwd']`));
    await InputPsw.sendKeys("P@ssw0rd1");
    await (await driver.findElement(By.xpath("//input[@value='Sign in']"))).click();
    await (await driver.findElement(By.xpath("//input[@value='Yes']"))).click();
    await timeout(1000);
    await driver.findElement(By.xpath("//span[@class='select2 select2-container select2-container--bootstrap4']")).click();
    const Input_Draft_Customize = driver.findElement(By.xpath(`//input[@class='select2-search__field']`));
    await Input_Draft_Customize.sendKeys("PT. KITADIN");
    await driver.findElement(By.xpath(`//span[@class='select2-results']/ul/li[1]`)).click();
    await (await findTags(driver, 'a', 'Select')).click();
    await timeout(1000);
    await driver.findElement(By.xpath("//*[contains(text(),'Master Data')]")).click();
    await driver.findElement(By.xpath("//*[contains(text(),'Institution Management')]")).click();
    
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
    //await driver.quit();
  }
};
