var currency_url = "https://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json";
const apiUrl = "https://cors-anywhere.herokuapp.com/" + currency_url;

let from_val = null;     // to hold the selected from-currency s
let to_val = null;       // to hold the selected to-currency
let amount_val = null;   // to hold the amount of moneny entered
let conversion_index = null;  // this is an array to hold the currency-exchange JSON data from Yahoo finance


$( function() {
      $.getJSON(apiUrl  , function( data ) {
          calculateCurrencyConversion(data);
      });

      function calculateCurrencyConversion(data)
      {
        // console.log(data);
        conversion_index = data.list.resources;
        // console.log(conversion_index.length);
      }

    function showConversion() {

      // first, check if there any amount of money entered,
      // in addition, check if the from-currency is selected and
      // the to-currency is also selected.
      if (from_val != null && to_val != null && amount_val != null)
      {
        // if the from currency is USD, and the to-currency is USD,
        // don't make any exchange, make the result the same amount as
        // the original amount
        if (from_val === "USD" && to_val === "USD") {
          var result = document.getElementById("to-amount");
          result.value = $("#from-amount").val();

        } else {
                  var source = "USD/" + from_val;
                  var target = "USD/" + to_val;
                  let from_exchange = null;
                  let to_exchange = null;
                  // console.log("Target1 = " + target1);
                  // console.log("Target2 = " + target2);

                  // if the from-currency is USD,
                  // set the from-exchange-rate to 1
                  if (from_val === "USD") {
                    found1 = true;
                    from_exchange = 1;
                  }

                  // if th to-currency is USD,
                  // set the to-exchange rate to 1
                 if(to_val === "USD") {
                    found2 = true;
                    to_exchange = 1;
                  }

                  // find the first instance of the from-currency-Exchange
                  // in the JSON data from Yahoo finance
                  var found1 = conversion_index.find( function (elem) {
                      if (elem.resource.fields.name === source)
                      {
                        var found1 = true;
                        from_exchange = elem.resource.fields.price;
                        // console.log("Exchange 1 = " + from_exchange);
                        return found1;
                      }
                  })

                  // find the first instance of the to-currency-Exchange
                  // in the JSON data from Yahoo finance
                  var found2 = conversion_index.find( function (elem) {
                      if (elem.resource.fields.name === target)
                      {
                        var found2 = true;
                        to_exchange = elem.resource.fields.price;
                        // console.log("Exchange 1 = " + to_exchange);
                        return found2;
                      }
                  })

                  // calculate the exchange amount to show in the result text box
                  if (from_exchange != null && to_exchange != null) {
                    var deposit = $("#from-amount").val();
                    var result = document.getElementById("to-amount");
                    var total = deposit * to_exchange / from_exchange;
                    // console.log("total is = " + total);
                    // console.log( `The exchange amount = ${total.toFixed(2)}`);
                    result.value = total.toFixed(2);
                  }

          }
      }
    }


    var enter_amount = document.getElementById("from-amount"); // entered amount of money
    var result = document.getElementById("to-amount"); // converted amount of money
    enter_amount.onchange = function () {
      if (enter_amount.value !== "") {
        amount_val = parseFloat(enter_amount.value);
        // alert(enter_amount.value);
        showConversion();
      }
    }
    var from_currency = document.getElementById("from-currency");
    from_currency.onchange = function () {
      from_val = from_currency.value;
      // alert(from_currency.value);
      showConversion();
    }


    var to_currency = document.getElementById("to-currency");
    to_currency.onchange = function () {
      let currency =  $("#to-currency").val();
      to_val = currency;
      // var selectedCurrency = to_currency.options[to_currency.selectedIndex].value
      // alert( currency);
      showConversion();
    }
  });
