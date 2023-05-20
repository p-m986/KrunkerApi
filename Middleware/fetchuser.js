const axios = require("axios");
const { checkusername } = require("../Validatations/usernameCheck");

const flag = [	"Afghanistan",
 	"Albania",
 	"Algeria",
 	"American Samoa",
 	"Andorra",
 	"Angola",
 	"Anguilla",
 	"Antarctica",
 	"Antigua and Barbuda",
 	"Argentina",
 	"Armenia",
 	"Aruba",
 	"Australia",
 	"Austria",
 	"Azerbaijan",
 	"Bahamas",
 	"Bahrain",
 	"Bangladesh",
 	"Barbados",
 	"Belarus",
 	"Belgium",
 	"Belize",
 	"Benin",
 	"Bermuda",
 	"Bhutan",
 	"Bolivia",
 	"Bosnia and Herzegovina",
 	"Botswana",
 	"Brazil",
 	"British Indian Ocean Territory",
 	"British Virgin Islands",
 	"Brunei",
 	"Bulgaria",
 	"Burkina Faso",
 	"Burundi",
 	"Cambodia",
 	"Cameroon",
 	"Canada",
 	"Cape Verde",
 	"Cayman Islands",
 	"Central African Republic",
 	"Chad",
 	"Chile",
 	"China",
 	"Christmas Island",
 	"Cocos Islands",
 	"Colombia",
 	"Comoros",
 	"Cook Islands",
 	"Costa Rica",
 	"Croatia",
 	"Cuba",
 	"Curacao",
 	"Cyprus",
 	"Czech Republic",
 	"Democratic Republic of the Congo",
 	"Denmark",
 	"Djibouti",
 	"Dominica",
 	"Dominican Republic",
 	"East Timor",
 	"Ecuador",
 	"Egypt",
 	"El Salvador",
 	"Equatorial Guinea",
 	"Eritrea",
 	"Estonia",
 	"Ethiopia",
 	"Falkland Islands",
 	"Faroe Islands",
 	"Fiji",
 	"Finland",
 	"France",
 	"French Polynesia",
 	"Gabon",
 	"Gambia",
 	"Georgia",
 	"Germany",
 	"Ghana",
 	"Gibraltar",
 	"Greece",
 	"Greenland",
 	"Grenada",
 	"Guam",
 	"Guatemala",
 	"Guernsey",
 	"Guinea",
 	"Guinea-Bissau",
 	"Guyana",
 	"Haiti",
 	"Honduras",
 	"Hong Kong",
 	"Hungary",
 	"Iceland",
 	"India",
 	"Indonesia",
 	"Iran",
 	"Iraq",
 	"Ireland",
 	"Isle of Man",
 	"Israel",
 	"Italy",
 	"Ivory Coast",
 	"Jamaica",
 	"Japan",
 	"Jersey",
 	"Jordan",
 	"Kazakhstan",
 	"Kenya",
 	"Kiribati",
 	"Kosovo",
 	"Kuwait",
 	"Kyrgyzstan",
 	"Laos",
 	"Latvia",
 	"Lebanon",
 	"Lesotho",
 	"Liberia",
 	"Libya",
 	"Liechtenstein",
 	"Lithuania",
 	"Luxembourg",
 	"Macau",
 	"Macedonia",
 	"Madagascar",
 	"Malawi",
 	"Malaysia",
 	"Maldives",
 	"Mali",
 	"Malta",
 	"Marshall Islands",
 	"Mauritania",
 	"Mauritius",
 	"Mayotte",
 	"Mexico",
 	"Micronesia",
 	"Moldova",
 	"Monaco",
 	"Mongolia",
 	"Montenegro",
 	"Montserrat",
 	"Morocco",
 	"Mozambique",
 	"Myanmar",
 	"Namibia",
 	"Nauru",
 	"Nepal",
 	"Netherlands",
 	"Netherlands Antilles",
 	"New Caledonia",
 	"New Zealand",
 	"Nicaragua",
 	"Niger",
 	"Nigeria",
 	"Niue",
 	"North Korea",
 	"Northern Mariana Islands",
 	"Norway",
 	"Oman",
 	"Pakistan",
 	"Palau",
 	"Palestine",
 	"Panama",
 	"Papua New Guinea",
 	"Paraguay",
 	"Peru",
 	"Philippines",
 	"Pitcairn",
 	"Poland",
 	"Portugal",
 	"Puerto Rico",
 	"Qatar",
 	"Republic of the Congo",
 	"Reunion",
 	"Romania",
 	"Russia",
 	"Rwanda",
 	"Saint Barthelemy",
 	"Saint Helena",
 	"Saint Kitts and Nevis",
 	"Saint Lucia",
 	"Saint Martin",
 	"Saint Pierre and Miquelon",
 	"Saint Vincent and the Grenadines",
 	"Samoa",
 	"San Marino",
 	"Sao Tome and Principe",
 	"Saudi Arabia",
 	"Senegal",
 	"Serbia",
 	"Seychelles",
 	"Sierra Leone",
 	"Singapore",
 	"Sint Maarten",
 	"Slovakia",
 	"Slovenia",
 	"Solomon Islands",
 	"Somalia",
 	"South Africa",
 	"South Korea",
 	"South Sudan",
 	"Spain",
 	"Sri Lanka",
 	"Sudan",
 	"Suriname",
 	"Svalbard and Jan Mayen",
 	"Swaziland",
 	"Sweden",
 	"Switzerland",
 	"Syria",
 	"Taiwan",
 	"Tajikistan",
 	"Tanzania",
 	"Thailand",
 	"Togo",
 	"Tokelau",
 	"Tonga",
 	"Trinidad and Tobago",
 	"Tunisia",
 	"Turkey",
 	"Turkmenistan",
 	"Turks and Caicos Islands "]

const fetchuser = async (req, res, next) => {
    // Creating dataobject to be added to the request body
    let data = {
        hasError: false,
        error: null,
        flagnum: null,
        flagname: null,
        hacker: null,
        infected:null
    }
    try {   
        // Making sure the request contains a properusername
        const {errors, isValid} = await checkusername(req.body);
        if (!isValid) {
            data.hasError = true;
            data.error = errors;
        }
        else {
            
            data.username = req.body.username;
            // IF everything is fine then send the request to the KR API
            await axios.get(`https://kr.vercel.app/api/profile?username=${req.body.username}&key=PC2E6MN.K9X569A`).then(response => {
                if (!response.data.success) {
                    // One case of faliure is handled by usernameCheck so this must be caused by incorrect usernae
                    data.hasError = true;
                    data.error = response.data.error;
                }
                else {
                    // When the data is successfully retrived
                    // If the user has a flag assigned 
                    let flg = null;
                    if (response.data.data.stats.flg) {
                        flg = response.data.data.stats.flg
                    }
                    else {
                        // ANd if not
                        flg = None;
                    }

                    data.flagnum = flg;
                    data.flagname = flag[flg];
                    data.hacker = response.data.data.hacker;
                    data.infected = response.data.data.infected;
                }
            }).catch(err => {
                if (!err.response.data.success) {
                    // One case of faliure is handled by usernameCheck so this must be caused by incorrect usernae
                    data.hasError = true;
                    data.error = err.response.data.error;
                }
                else {
                    // IF the request cannot be completed due to some reason
                    data.hasError = true;
                    data.error = "Cant reach KR API or Request timed out";
                    console.log("First try error ", err);
                }
            })
        }
    }
    catch (err) {
        data.hasError = true;
        data.error = err;
    }

    req.body.data = data;   
    next();
}

module.exports = { fetchuser };