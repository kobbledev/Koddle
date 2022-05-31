const {get_country} = require('../helper/home_countries');
const RequestHandler = require('../helper/RequestHandler');
const Logger = require('../helper/logger');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);


class CountryController {
    static async getCountryCodes(req, res){
        const countryCode = []
        get_country("https://restcountries.com/v2/all")
            .then((all_countries)=>{
                all_countries.forEach(country =>{
                    countryCode.push({name:country["name"],code:country["callingCodes"][0]})
                })
                requestHandler.sendSuccess(res)(countryCode)
            }).catch((err)=>{
            requestHandler.catchError(res,err)
        })
    }



}
module.exports = CountryController;
