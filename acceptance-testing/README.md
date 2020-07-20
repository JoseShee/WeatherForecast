This application displays the 5 day weather forecast for a given location.

### Features

* Enter city name, get 5 day weather forecast
* Select day, get 3 hourly forecast
* Select day again, hide 3 hourly forecast
* Daily forecast should summarise the 3 hour data:
  * Most dominant (or current) condition
  * Most dominant (or current) wind speed and direction
  * Aggregate rainfall
  * Minimum and maximum temperatures
* All values should be rounded down

We would like the application to be tested against the requirements above. Please rewrite the requirements into an appropriate format, e.g. BDD with Gherkin, adding any other requirements that you think appropriate, such as edge cases, validation and error scenarios or accessibility improvements.

Please write a set of automated acceptance tests against those requirements using any language and / or test framework of your choice.

The application is running in "test" mode, using a set of test data, matching that which comes from the public API at OpenWeatherMap (http://openweathermap.org/forecast5). There is test data for a number of locations, found in the folder ```src/data```.

You should find that every important part of the HTML produced has been marked with ```data-test``` attributes.

### What we are looking for

This exercise is to examine your testing and analysis skills, and your technical knowledge; there are no tricks or hidden agendas. We are looking for a demonstration of your experience and skill using current testing technologies and methodologies.

Make sure that your test scenarios and code are clear, demonstrates good practices, and that you include a README file explaining how to build and run your solution - please don't spend more than 2 to 4 hours on this.

Bear in mind that your solution will form the basis for a follow-up conversation.

### Checklist

Please ensure you have submitted the following:

* A public repository (e.g. GitHub, BitBucket) containing the requirements and automated tests
* A readme explaining
  * How to build and execute your solution
  * Details on anything further that you would like to achieve given more time, including any trade-offs that you may have made


Good luck and thank you for your time - we look forward to seeing your creation.

### Running the app locally

You'll need node and npm installed - first off, install the required dependencies:

    $ npm install

To start up the application:

    $ npm run develop

############# Automation Test Detais ######################
#Framework: Mocha
#Automation Tool: WebdriverIO
#ScriptingLanguage Used: ECMAS
#Additional Config implemented: babel and gulp

#Steps implemented:
1. npm install --save-dev @wdio/cli

2. npx wdio config  --> This by default creates wdio.config.js file in root folder
(Select framework: Mocha, 
Select Reports: allure, spec and mochaawesome,
Remaining fields you can select the default)

3. In wdio.config.js, remove the default hardcoded values and pass our own custom values which can be done by:
    1. Create lib folder -> create weatherCOnfig.js file 
    2. In weatherconfig.js, we can create custom values & pass those to wdio.conf.js
    
4.npm i @wdio/allure-reporter --save-dev
5.npm i allure-commandline -g --save-dev
    
6.Now configure the wdio.config.js, under Reporters:
    reporterOptions: { allure: { outputDir: './reports/allure-results' } }
    
7. npm i --save-dev @babel/preset-env

8. Create babel.config.js in root folder and update the below code to set node version:
    module.exports = { presets: [ [ '@babel/preset-env', { targets: { node: 12, }, }, ], ], }
    
9. Under the test/specs folder, create the test files (weather.js) in mocha framework

10. npm install --save-dev gulp
11. npm install --global gulp-cli
12. npm install --save-dev gulp-run-command

13. npm install del --save-dev

14. Create gulpfile.js --> 
    write the code to execute the npm or any tasks in sequence 
    (In our code, 
    it first execute cleanreport, 
    then webdriverIO to execute test files, 
    then allure to generate reports)
    
15. In package.json , update the scripts: "test": "gulp gulptest" 
    -> This executes the gulp task mentioned in gulpfile.js
   
All set, we can execute the Automation script, follow the steps below:

#Steps To execute:

npm install
npm run develop (After Application server starts)

npm run test or gulp gulptest
(This will execute the Automation script and wait till the Allure report automatically opens in the chrome driver)
