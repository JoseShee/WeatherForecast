'***************Automation Testing *************'

npm install --save-dev @wdio/cli

npx wdio config (Give the necessary setting required like Mocha framework, Allure, spec & mochawesome reporters)

npm i --save-dev @babel/preset-env Create babel.config.js in root folder: module.exports = { presets: [ [ '@babel/preset-env', { targets: { node: 12, }, }, ], ], } Under the test/specs folder, create js file to write testcases

In package.json, Modify the test: "test": "wdio wdio.conf.js"

(Optional: If you want to debug the wdio, npx wdio run ./wdio.conf.js --watch)

Write the testcases in weather.js

Execute: npm run test

Reports: Install the package npm i @wdio/allure-reporter --save-dev Install Allure command globally npm i allure-commandline -g --save-dev Now configure the wdio.conf.js, add the below code under the Reporters reporterOptions: { allure: { outputDir: './reports/allure-results' } },

After this step, npm run test The allure-results, contains the test results in many json formats The below command generates the reports in HTML allure report allure generate ""

The above command, create HTML Allure report inside the allure-report folder.

Then run the below command to open the html file: allure open
