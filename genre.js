const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://www.baseball-reference.com/teams/LAD/2022-schedule-scores.shtml";

const schedule = [];

async function getGenre(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const games = $('#team_schedule');
        games.each(function() {
            date = $(this).find('#team_schedule > tbody > tr:nth-child(1) > td:nth-child(2) > a').text();
            opp = $(this).find('#team_schedule > tbody > tr:nth-child(1) > td:nth-child(6) > a').text();

            schedule.push({date, opp})
        });
        //const genre = $("#team_schedule").text();

        console.log(schedule);
    } 
    catch {
        console.error(error);
    }
}

getGenre();