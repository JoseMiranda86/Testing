const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");
 
async function Test(){

       let driver = await new Builder().forBrowser("chrome").build();
 
        await driver.get("http://google.com");
            
        await driver.findElement(By.name("q")).sendKeys("Automatic test web applications",Key.RETURN);
 
        var title = await driver.getTitle();
        console.log('Title is:',title);

        await driver.quit();
}
 
Test();