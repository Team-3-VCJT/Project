// Global Variables
const labels = [];
const graphData = [];
const graphSecondData = [];

var dataOneLabel = "";
var dataTwoLabel = "";


// Functions


// Event Listeners

const data = {
  labels: labels,
  datasets: [
    {
      label: dataOneLabel,
      backgroundColor: "rgb(255, 99, 132)",
      data: graphData,
    },
    {
      label: dataTwoLabel,
      backgroundColor: "blue",
      data: graphSecondData,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {},
};
var myChart = new Chart(document.getElementById("myChart"), config);
// drop down menu functions

// dropdown open/close function
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.stopPropagation();
    item.classList.toggle("is-active");
  });
});
// select data function
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function (event) {
    event.stopPropagation();
    item.classList.toggle("is-active");
  });
});

// handle data function// add if second data field has no selection, don't run
function handleAllData() {
  handleHistoricalData();
  handleSecondData();
}
// fetch url based on first state selection
function handleHistoricalData() {
  const stateDropdownSelection = document.querySelector("#stateSelect").value;
  const fetchUrl = `https://api.covidactnow.org/v2/state/${stateDropdownSelection}.timeseries.json?apiKey=30e85e10d30e4c25886360156f029633`;
  console.log(stateDropdownSelection);
  var dataOne = document.querySelector("#stateSelect");
   dataOneLabel = dataOne.options[dataOne.selectedIndex].value
   myChart.data.datasets[0].label = dataOneLabel;
   myChart.update();
console.log(dataOneLabel);
  fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayStateHistoricResults(data);
    });
}

// display first state results
function displayStateHistoricResults(data) {
  const categorySelection = document.querySelector("#categorySelect").value;
  console.log(categorySelection);
  console.log(data.actuals.cases, data.actuals.deaths);
  data.actualsTimeseries.forEach((result) => {
    labels.push(result.date);
    graphData.push(result[categorySelection]);
    //myChart.update();
  });
}

// fetch url based on second state selection
function handleSecondData() {
  const stateSecondDropdownSelection = document.querySelector("#stateSelectSecond").value;
  const fetchUrl = `https://api.covidactnow.org/v2/state/${stateSecondDropdownSelection}.timeseries.json?apiKey=30e85e10d30e4c25886360156f029633`;
  var dataTwo = document.querySelector("#stateSelectSecond")
   dataTwoLabel = dataTwo.options[dataTwo.selectedIndex].value
   myChart.data.datasets[1].label = dataTwoLabel;
   myChart.update();
  fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayStateSecondHistoricResults(data);
    });
}

// display second state results
function displayStateSecondHistoricResults(data) {
  const categorySelection = document.querySelector("#categorySelect").value;
  console.log(categorySelection);
  console.log(data.actuals.cases, data.actuals.deaths);
  data.actualsTimeseries.forEach((result) => {
    // labels.push(result.date);
    graphSecondData.push(result[categorySelection]);
    
  }) ;
}

// button to submit selected data request
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", handleAllData);

// getData(); 