require('dotenv').config()
const csvtojsonV2 = require("csvtojson");
const fs = require("fs");
const converter = require('json-2-csv');
const {authenticate} = require('./authService');
const {fetchResponseList, fetchResponse} = require('./dataService');
const csv = require('csvtojson');
const {getTodayISO} = require('./helpers');

async function main() {
    const surveyId = 1030
    const employees = []
    try {
        const {access_token: token} = await authenticate()
        const items = await fetchResponseList(token, surveyId)
        console.log('\nfetching reports from api...')
        for (const {id} of items) {
            let response
            try {
                response = await fetchResponse(token, id, surveyId)
            } catch (error) {
                console.error(error)
                continue
            }
            const firstPage = response.pages.find(page => page.page_id === 1156)
            const employeeIdItem = firstPage.items.find(item => item.item_id === 1880)
            const employeeId = employeeIdItem.answer.text
            employees.push(Number(employeeId))
        }
        console.log('finished')
    } catch (error) {
        throw error
    }

    const today = getTodayISO()
    const filePath = 'COVID_Report.csv';
    const csvJson = await csv().fromFile(filePath)
    for (const row of csvJson) {
        row[today] = employees.find(employee => employee === Number(row['Employee Number'])) ? 'Done' : 'Not Done'
    }
    try {
        console.log('\nwriting data to csv...')
        const newCsv = await converter.json2csvAsync(csvJson)
        fs.writeFileSync(filePath, newCsv, { encoding: 'utf8' })
        console.log('finished')
    } catch (error) {
        throw error
    }
}

(async () => {
    try {
        console.log('Running program...')
        await main();
        console.log('\nProgram completed successfully')
    } catch (error) {
        console.error('\n', error)
    } finally {
        // log empty line
        console.log()
        process.exit()
    }
})();


