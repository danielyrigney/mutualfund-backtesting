var amzn = require('./amzn.json');
var ba = require('./ba.json');
var fb = require('./fb.json');
var ge = require('./ge.json');
var nflx = require('./nflx.json');
var tsla = require('./tsla.json');
//can you put these all into one folder and the import that folder?

var funds = [amzn, ba, fb, ge, nflx, tsla];

const startMoney = 10000;
const startDate = 400;
const interval = 63


var money = startMoney;
var date = startDate;

console.log("Start Money: $" + money);

invest(date, money);

function invest(date, money) {
  while (date > 64) {

    var highPerformers = getHighPerformers(date);
    var splitMoney = money/3
    var holdings = [splitMoney, splitMoney, splitMoney];

    //console.log(money);


    highPerformers.forEach(function(data, index){
        var newDate = date - 63
        var previousPrice = (data["dataset_data"]["data"][date][4])
        var newPrice = (data["dataset_data"]["data"][newDate][4]);
        var priceDifference = newPrice - previousPrice;
        var sharesBought = holdings[index] / previousPrice;
        var moneyAfterSelling = sharesBought * newPrice
        holdings[index] = moneyAfterSelling;

    });

    money = holdings.reduce((a, b) => a + b, 0);
    holdings = [0, 0, 0];
    date = date - 63;
  }

  console.log("End Money: $" + money);

}








function getHighPerformers(date) {

  var biggestThreeMonthGain;
  var biggestOneYearGain;
  var biggestThreeYearGain;

  var biggestThreeMonthGainPrice = 0;
  var biggestOneYearGainPrice = 0;
  var biggestThreeYearGainPrice = 0;

  funds.forEach(function(data, index){

      var day = data["dataset_data"]["data"][date][4];
      var threeMonth = data["dataset_data"]["data"][date + 63][4];
      var oneYear = data["dataset_data"]["data"][date + 252][4];
      var threeYears = data["dataset_data"]["data"][date + 756][4];

      var threeMonthGain = ((day - threeMonth)/threeMonth)*100;
      var oneYearGain = ((day - oneYear)/oneYear)*100;
      var threeYearGain = ((day - threeYears)/threeYears)*100;


      if (threeMonthGain > biggestThreeMonthGainPrice) {
        biggestThreeMonthGainPrice = threeMonthGain;
        biggestThreeMonthGain = data;
      }

      if (oneYearGain > biggestOneYearGainPrice) {
        biggestOneYearGainPrice = oneYearGain;
        biggestOneYearGain = data;
      }

      if (threeYearGain > biggestThreeYearGainPrice) {
        biggestThreeYearGainPrice = threeYearGain;
        biggestThreeYearGain = data;
      }

  });
  return ([biggestThreeMonthGain, biggestOneYearGain, biggestThreeYearGain]);

}
