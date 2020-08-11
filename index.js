const puppeteer = require('puppeteer');

//user credentials
const userEmail = '';
const userPassword = '';

//selector constants
const EMAIL_SELECTOR = '#__layout > div > div.background-container > div > div > div > div > div > div:nth-child(2) > div > div > div.input-field--relative-container > input';
const PASSWORD_SELECTOR = '#__layout > div > div.background-container > div > div > div > div > div > div:nth-child(3) > div > div > div.input-field--relative-container > input';
const LOGIN_BUTTON = '#__layout > div > div.background-container > div > div > div > div > div > button';
const CONTROL_CENTER = '#__layout > div > div > div:nth-child(1) > div > aside > div.SideNavbar__nav-container > div > a:nth-child(1)';
const DOWN_ARROW = '#__layout > div > div.main-content-flex-wrapper.is-loaded.shift-right > div.ControlCenter__container.main-content-flex > section > section > div.FilteredListing__list > ul > li > div:nth-child(2) > div > div > div.mt-18.pl-10 > img';
const ENGINE_TOGGLE = '#__layout > div > div.main-content-flex-wrapper.is-loaded.shift-right > div.ControlCenter__container.main-content-flex > section > section > div.FilteredListing__list > ul > li > div:nth-child(2) > div > div.VehicleCard__contents.pt-20.pb-15 > div > div > div > button:nth-child(1)';
const CONFIRM_BUTTON = '#__layout > div > div.main-content-flex-wrapper.is-loaded > div.ControlCenter__container.main-content-flex > section > section > div.FilteredListing__list > ul > li > div:nth-child(2) > div > div.VehicleCard__contents.pt-20.pb-15 > div > div > div > button.base__button.base__block.iot-command.confirm-command';


async function run() {

  async function checkAndClick (selector, seconds, input=null){
  	let trigger = 0
  	do{
	  	try{
	  		if(seconds >0){
	  			await page.waitFor(seconds*1000);
	  		};
	  		await page.waitForSelector(selector);
	  		await page.click(selector);
	  		if(input){
	  			await page.keyboard.type(input);
	  		}
	  		trigger = 1;
	  	}catch(e){console.log(e)}
	}while(trigger ==0);
  }

  //pretty code
  const browser = await puppeteer.launch({
  	headless:false
  });
  const page = await browser.newPage();
  await page.goto('https://accounts.dronemobile.com/login');
  await checkAndClick(EMAIL_SELECTOR,1,userEmail);
  await checkAndClick(PASSWORD_SELECTOR,1,userPassword);
  await checkAndClick(LOGIN_BUTTON,1);
  await checkAndClick(CONTROL_CENTER, 1);
  await checkAndClick(DOWN_ARROW, 1);
  await checkAndClick(ENGINE_TOGGLE, 10);
  await checkAndClick(CONFIRM_BUTTON, 1);
  
  await page.waitFor(10000);

  browser.close();
}

run();