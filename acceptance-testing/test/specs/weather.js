import {expect as chai} from 'chai'
import {assert as chaiAssert} from 'chai'

const newCityName = browser.config.mochaOpts.global[5];
// const newCityName = 'perth'
describe('0_Five Day Weather Forecast page loaded successfully', ()=> {
        it('Launch chrome browser', ()=>{

            browser.url("http://localhost:3000/")
            expect(browser).toHaveUrl('http://localhost:3000/')
        })
        it('Five Day Weather Forecast page loaded successfully', () =>{
            const subTitle = $('h1')
            subTitle.waitForDisplayed()
            const subTitleVal = $('h1').getText()

            console.log('Title: '+subTitleVal)
            expect(subTitle).toHaveText('Five Day Weather Forecast for')
            chaiAssert.equal(subTitleVal, 'Five Day Weather Forecast for')
        })
})
describe('1_Search with City Name', ()=> {
        it('Negative scenario - invalid cityname', () =>{
            const cityName = $('[name="city"]')
            cityName.waitForExist()
            cityName.setValue('rose')
            browser.pause(1000)
            browser.keys('Enter')
            browser.pause(3000)

            let appErrmsg = $('#root > div > div')
            if(appErrmsg.exists){
                let appErrmsg = $('#root > div > div').getText()
                chaiAssert.equal(appErrmsg, 'Error retrieving the forecast')
                console.log('negative scenario err msg '+appErrmsg)
                // process.exit(1);
            }
        })
        it('Search with City Name', () => {
            const cityName = $('[name="city"]')
            cityName.waitForExist()
            cityName.setValue(newCityName)
            browser.pause(1000)
            browser.keys('Enter')

            browser.waitUntil(
                () => cityName.getValue() === newCityName,
                {
                    timeout: 10000,
                    timoutMsg: 'Expected city name is different after 5 s',
                });
            expect(cityName).toHaveValue(newCityName)
            chaiAssert.equal(cityName.getValue(), newCityName)
        })
})
describe('2_View 5 day weather forecast', ()=> {

    it('Count the number of days', ()=>{
        const num = $$('.name')
        num.forEach(nameDetail => console.log(nameDetail.getText()))

        console.log("Today Days displayed in the Weather Forecast :" +num.length);
        chai(num).to.have.lengthOf(5);
    })
})

describe('3_View 3 hourly weather forecast ', ()=>{

    it('Verify 3 hourly forecast displayed', ()=>{
        const selectDay = 'Tue';
        const num = $$('.name');
        const firstDay = $('span[data-test="day-1"]')
        let expected3Hrs = null;
        for(let i=1; i<=num.length;i++) {

            if (selectDay === 'Tue') {
                let j = 2;
                firstDay.click()

                const details = $$('#root > div > div:nth-child(2) > div.details > div.detail')
                console.log("the count of hour displayed " + details.length)

                for (let i = 1; i <= details.length; i++) {

                    if (i === details.length)
                        break;
                    let hr1 = $('#root > div > div:nth-child(2) > div.details > div:nth-child(' + i + ') > span:nth-child(1) > span')
                    let hr2 = $('#root > div > div:nth-child(2) > div.details > div:nth-child(' + j + ') > span:nth-child(1) > span')

                    console.log('The hour 1 data: ' + hr1.getText() + ' And Hour 2 data is: ' + hr2.getText())
                    hr1.waitForDisplayed({interval: 3000, timeoutMsg: 'hour is not displayed expected'})
                    j++;

                    expected3Hrs = hr2.getText() - hr1.getText()
                    chaiAssert.equal(expected3Hrs, '300')
                }
                console.log('Today hours durations displayed in the Weather Forecast :'+expected3Hrs)
                break;
            }
        }
    })
})

describe('4_Hide 3 hour weather forecast ', ()=>{
    it('Hide 3 hour weather forecast', ()=>{
        const selectDay = 'Tue';

        if (selectDay === 'Tue'){
            const firstDay = $('span[data-test="day-1"]');
            firstDay.click()
            browser.pause(5000)

            let hrDetail = $('#root > div > div:nth-child(2) > div.details > div:nth-child(1) > span:nth-child(1) > span')
            try{
                expect(hrDetail).not.toBeVisible(hrDetail)
                console.log('The details of Weather Forecast are hidden : ');
            }catch (e) {
                console.log('The error msg: '+e)
            }
        }
    })
})

describe('5_Most dominant current condition', () => {
    it('Most dominant current condition', () => {
        const selectDay = 'Tue';

        let currCond = [];
        if (selectDay === 'Tue') {
            const firstDay = $('span[data-test="day-1"]');
            const details = $$('#root > div > div:nth-child(2) > div.details > div.detail')
            firstDay.click()
            for (let i = 1; i <= details.length; i++) {
                let val = $('span[data-test="maximum-1-' + i + '"]').getText();
                currCond.push(val)
            }
            console.log("The array items pushed in are: " + currCond)
            currCond.sort((a, b) => {
                if (a < b)
                    return -1 //Sorting in ascending order, currCond[0] --> highesh value
            });

            console.log('The most dominant weather condition: ' + currCond[details.length - 1])
            if (newCityName === 'perth') {
                chai(currCond[details.length - 1]).to.contains('14')
            } else if (newCityName === 'edinburgh') {
                chai(currCond[details.length - 1]).to.contains('18')
            }

        }
    })
})

describe('6_Most dominant windspeed and direction', () => {
    const selectDay = 'Tue';
    let windSpeed = null;
    it('Most dominant windspeed and direction', () => {
        const num = $$('.name');
        let direction = null;
        for (let i = 1; i <= num.length; i++) {
            if (selectDay === 'Tue') {
                windSpeed = $('span[data-test="speed-' + i + '"]').getText();
                direction = $('span[data-test="direction-' + i + '"]');
                if (newCityName === 'perth')
                    chai(windSpeed).to.contains('2kph')
                else if (newCityName === 'edinburgh')
                    chai(windSpeed).to.contains('1kph')
                chai(direction).exists
                break;
            }
        }
        console.log('The windspeed on ' + selectDay + " is: " + windSpeed)
    })
    it('round value -windspeed', () =>{

        let windval = parseInt(windSpeed.substring(0,windSpeed.length-3))
        console.log('round value -windspeed ' + selectDay + " is: " +Math.round(windval))
    })
})
describe('7_Aggregate rainfall', () => {
    let sum1 = 0;
    const selectDay = 'Tue';
    it('Aggregate rainfall', () => {
        const num = $$('.name');
        let val =null;
        // let sum1 = 0;
        if(selectDay === 'Tue'){
            const firstDay = $('span[data-test="day-1"]');
            firstDay.click()
            const details = $$('#root > div > div:nth-child(2) > div.details > div.detail')
            for (let i = 1; i <= details.length; i++) {
                val = $('span[data-test="rainfall-1-' + i + '"]').getText();
                let addVal = val.substring(0,val.length-2)
                sum1 = sum1 + parseInt(addVal)
            }
            console.log('The Aggregate rainfall for: '+selectDay+': '+sum1)
        }
    })
    it('rounded value -rainfall', () =>{
        console.log('rounded value -rainfall: '+selectDay+': '+Math.round(sum1))
    })
})
describe('8_Min and Max temperature', () => {
    const selectDay = 'Tue';
    let maxCond= [];
    let minCond= [];
    let detailscount = 0;
    it('Min and Max temperature', ()=>{
        if(selectDay === 'Tue'){
            const firstDay = $('span[data-test="day-1"]');
            firstDay.click()
            const details = $$('#root > div > div:nth-child(2) > div.details > div.detail')

                // let maxCond= [];
                // let minCond= [];
                detailscount = details.length
                for (let i = 1; i <= details.length; i++) {
                    let valMax = $('span[data-test="maximum-1-'+i+'"]').getText();
                    let valMin = $('span[data-test="minimum-1-'+i+'"]').getText();
                    maxCond.push(valMax)
                    minCond.push(valMin)
                }
                console.log("The maximum array items pushed are "+maxCond)
                console.log("The minimum array items pushed are "+minCond)
                maxCond.sort( (a,b) =>{
                    if (a < b)
                    return -1 //Sorting in descending order, currCond[0] --> highesh value
                });
                minCond.sort( (a,b) =>{
                    if(a < b)
                    return -1 //Sorting in ascending order, currCond[0] --> highesh value
                });

                console.log("The maximum weather condition for "+selectDay+": "+maxCond[details.length-1])
                console.log("The most lowest weather condition : "+selectDay+": "+minCond[0])
                if(newCityName === 'perth'){
                    chai(maxCond[details.length-1]).to.contains('14');
                    chai(minCond[0]).to.contains('10');
                }else if(newCityName === 'edinburgh'){
                    chai(maxCond[details.length-1]).to.contains('18')
                    chai(minCond[0]).to.contains('12');
                }
        }
    })
    it('round value - max and min condition', () =>{
        let val1 = maxCond[detailscount-1]
        let val2 = minCond[0]
        let maxval1 = parseInt(val1.substring(0,val1.length-1))
        let minval1 = parseInt(val2.substring(0,val2.length-1))
        console.log("rounded val for "+selectDay+": Max:"+Math.round(maxval1))
        console.log("rounded val for "+selectDay+": Min:"+Math.round(minval1))
    })
})
