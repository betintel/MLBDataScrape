const axios = require('axios');
const cheerio = require('cheerio');

const laDodgers = "https://www.baseball-reference.com/teams/LAD/2022-schedule-scores.shtml";
const schedule_data = [];

async function getSchedule(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const games = $("#team_schedule")

        for(const index in games) {
        games.each(function() {
            date = $(this).find("#team_schedule > tbody > tr:nth-child(1) > td:nth-child(2)").text();
            opp = $(this).find("#team_schedule > tbody > tr:nth-child(1) > td:nth-child(6)").text();
            runsFor = $(this).find("#team_schedule > tbody > tr:nth-child(1) > td:nth-child(8)").text();
            runsAgainst = $(this).find("#team_schedule > tbody > tr:nth-child(1) > td:nth-child(9)").text();

            schedule_data.push({date, opp, runsFor, runsAgainst})
        });
    };

        console.log(schedule_data);
    }
    catch(error) {
        console.error(error);
    }
}

getSchedule(laDodgers);