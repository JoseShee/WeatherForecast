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

'***************Automation Testing *************'

npm install --save-dev @wdio/cli

npx wdio config (Give the necessary setting required like Mocha framework, Allure, spec & mochawesome reporters)

npm i --save-dev @babel/preset-env
Create babel.config.js in root folder:
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 12,
                },
            },
        ],
    ],
}
Under the test/specs folder, create js file to write testcases

In package.json, Modify the test:
"test": "wdio wdio.conf.js"

(Optional: If you want to debug the wdio, npx wdio run ./wdio.conf.js --watch)

Write the testcases in weather.js

Execute: npm run test

Reports: 
Install the package
npm i @wdio/allure-reporter --save-dev
Install Allure command globally
npm i allure-commandline -g --save-dev
Now configure the wdio.conf.js, add the below code under the Reporters
reporterOptions: {
        allure: {
            outputDir: './reports/allure-results'
        }
    },

After this step, 
npm run test
The allure-results, contains the test results in many json formats
The below command generates the reports in HTML allure report
allure generate "<path of the allure-results>"

The above command, create HTML Allure report inside the allure-report folder.

Then run the below command to open the html file:
allure open







