

var amzn = require('./amzn.json');
var ba = require('./ba.json');
var fb = require('./fb.json');
var ge = require('./ge.json');
var nflx = require('./nflx.json');
var tsla = require('./tsla.json');

var date = 0;
var names = ["amzn", "ba", "fb", "ge", "nflx", "tsla"]
var funds = [amzn, ba, fb, ge, nflx, tsla];

var biggestThreeMonthGain = '';
var biggestOneYearGain = '';
var biggestThreeYearGain = '';

var biggestThreeMonthGainPrice = 0;
var biggestOneYearGainPrice = 0;
var biggestThreeYearGainPrice = 0;

funds.forEach(function(data, index){
    var name = names[index];
    var day = data["dataset_data"]["data"][date][4];
    var threeMonth = data["dataset_data"]["data"][date + 63][4];
    var oneYear = data["dataset_data"]["data"][date + 252][4];
    var threeYears = data["dataset_data"]["data"][date + 756][4];

    var threeMonthGain = ((day - threeMonth)/threeMonth)*100;
    var oneYearGain = ((day - oneYear)/oneYear)*100;
    var threeYearGain = ((day - threeYears)/threeYears)*100;


    if (threeMonthGain > biggestThreeMonthGainPrice) {
      biggestThreeMonthGainPrice = threeMonthGain;
      biggestThreeMonthGain = name;
    }

    if (oneYearGain > biggestOneYearGainPrice) {
      biggestOneYearGainPrice = oneYearGain;
      biggestOneYearGain = name;
    }

    if (threeYearGain > biggestThreeYearGainPrice) {
      biggestThreeYearGainPrice = threeYearGain;
      biggestThreeYearGain = name;
    }

});

console.log("Best three month gain: " + biggestThreeMonthGain + "- " + biggestThreeMonthGainPrice + "% difference");
console.log("Best one year gain: " + biggestOneYearGain + "- " + biggestOneYearGainPrice + "% difference");
console.log("Best three year gain: " + biggestThreeYearGain + "- " + biggestThreeYearGainPrice + "% difference");
