
describe('Launching the Five Day Weather Forecast', ()=>{
    it('Launch the chrome browser', ()=>{
        browser.url("http://localhost:3000/")
        expect(browser).toHaveUrl('http://localhost:3000/')
    })
    it('Five Day Weather Forecast page loaded successfully', () =>{
        const subTitle = $('h1')
        const subTitleVal = $('h1').getText()
        expect(subTitle).toHaveText('Five Day Weather Forecast for')
        console.log("Title: " +subTitleVal)
    })
 })
describe('View 5 day weather forecast', ()=>{
    it('Search with City Name', ()=>{
        const cityName = $('[name="city"]')
        cityName.waitForExist()
        cityName.setValue('perth')
        browser.pause(5000)
        browser.keys('Enter')
        browser.pause(5000)
    })
    it('Count the number of days', ()=>{

        let daysCount =0;

        for (let i=1; i<=5; i++){
            const dayValue = $('span[data-test="day-'+i+'"]').getText();
            console.log("Day Value :" +dayValue);
            daysCount = daysCount +1;
        }
        console.log("Today Days displayed in the Weather Forecast :" +daysCount);

    })
})
describe('View 3 hour weather forecast ', ()=>{
    it('Click the Day', ()=>{
        const dayVal1 = $('span[data-test="day-1"]')
        dayVal1.waitForExist()
        dayVal1.click()
        browser.pause(5000)
    })
    it('View the 3 hourly forecast', ()=>{
        const dayHr1 = $('span[data-test="hour-1-1"]').getText()
        expect(dayHr1).toBePresent
        const dayHr2 = $('span[data-test="hour-1-2"]').getText()
        expect(dayHr2).toBePresent

        let hoursCount = (dayHr2 - dayHr1);
        console.log("HOurs Count : "+hoursCount)

        // expect(hoursCount).to.have.count(3);

    })
})
describe('Hide 3 hour weather forecast ', ()=>{
    it('Hide 3 hour weather forecast', ()=>{
        const dayVal1 = $('span[data-test="day-1"]')
        dayVal1.waitForExist()
        dayVal1.click()
        browser.pause(5000)
    })
})

describe('View details of current condition', ()=>{
    it('View details of current condition', ()=>{
            const currTemp = $('span[data-test="maximum-5"]').getText();
            console.log("current condition:" +currTemp);
    })
})

describe('View details of dominant windspeed', ()=>{
    it('View details of dominant windspeed and direction', ()=>{
        for (let i=1;i<=5;i++){
            const dayValue = $('span[data-test="day-'+i+'"]').getText();
            const windSpeed = $('span[data-test="speed-'+i+'"]').getText();

            console.log("The weather forecast for "+dayValue+": Windspeed: "+windSpeed)
        }
    })
})
describe('View details of aggregate rainfall', ()=>{
    it('View details of aggregate rainfall', ()=>{

        for (let i=1;i<=5;i++){
            const dayValue = $('span[data-test="day-'+i+'"]').getText();
            const rainfall = $('span[data-test="rainfall-'+i+'"]').getText();

            console.log("The weather forecast for "+dayValue+": Rainfall: "+rainfall)
        }
    })
})

describe('View details of Min and Maximum temperatures', ()=>{
    it('View details of Min and Maximum temperatures', ()=>{

        for (let i=1;i<=5;i++){

            const dayValue = $('span[data-test="day-'+i+'"]').getText();
            const maxTemp = $('span[data-test="maximum-'+i+'"]').getText();
            const minTemp = $('span[data-test="minimum-'+i+'"]').getText();
            console.log("The weather forecast for "+dayValue+": Minium Temperature: "+minTemp+" ,Maximum Temperature"+maxTemp)
        }
    })
})
