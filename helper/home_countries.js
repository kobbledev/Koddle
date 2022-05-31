const fetch = require("node-fetch");

async function get_country(url){
    const fetch_url = await fetch(url);
    const all_countries = await fetch_url.json();
    return all_countries
}



module.exports = {get_country}