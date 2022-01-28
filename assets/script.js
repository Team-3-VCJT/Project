// Global Variables
const labels = [];
const graphData = [];
const graphSecondData = [];
var dataOneLabel = "";
var dataTwoLabel = "";

//Chart
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
  clearData();
  handleHistoricalData();
  handleSecondData();
  myChart.update(); 
}
// fetch url based on first state selection
function handleHistoricalData() {
  const stateDropdownSelection = document.querySelector("#stateSelect").value;
  const fetchUrl = `https://api.covidactnow.org/v2/state/${stateDropdownSelection}.timeseries.json?apiKey=30e85e10d30e4c25886360156f029633`;
  let allHistoricalData = document.querySelector("#timeFrame").value;
  var dataOne = document.querySelector("#stateSelect");
  dataOneLabel = dataOne.options[dataOne.selectedIndex].value;
  myChart.data.datasets[0].label = dataOneLabel;
  myChart.update();

  fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (allHistoricalData === "alldata") {
        displayStateHistoricResults(data);
      } else {
        const categorySelection =
          document.querySelector("#categorySelect").value;
        timeFilter(data);
        updatedData = timeFilter(data);
        updatedData.forEach((result) => {
          labels.push(result.date);
          graphData.push(result[categorySelection]);
        });
        myChart.update();
      }
    });
}

// display first state results
function displayStateHistoricResults(data) {
  const categorySelection = document.querySelector("#categorySelect").value;
  data.actualsTimeseries.forEach((result) => {
    labels.push(result.date);
    graphData.push(result[categorySelection]);
  });
}

// fetch url based on second state selection
function handleSecondData() {
  let allHistoricalData = document.querySelector("#timeFrame").value;
  const stateSecondDropdownSelection =
    document.querySelector("#stateSelectSecond").value;
  const fetchUrl = `https://api.covidactnow.org/v2/state/${stateSecondDropdownSelection}.timeseries.json?apiKey=30e85e10d30e4c25886360156f029633`;
  var dataTwo = document.querySelector("#stateSelectSecond");
  dataTwoLabel = dataTwo.options[dataTwo.selectedIndex].value;
  myChart.data.datasets[1].label = dataTwoLabel;
  myChart.update();

  fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (allHistoricalData === "alldata") {
        displayStateSecondHistoricResults(data);
      } else {
        const categorySelection =document.querySelector("#categorySelect").value;
        timeFilter(data);
        updatedData = timeFilter(data);
        updatedData.forEach((result) => {
          graphSecondData.push(result[categorySelection]);
        });
        myChart.update();
      }
    });
}

// display second state results
function displayStateSecondHistoricResults(data) {
  const categorySelection = document.querySelector("#categorySelect").value;
  data.actualsTimeseries.forEach((result) => {
    // labels.push(result.date);
    graphSecondData.push(result[categorySelection]);
  });
  myChart.update();
}

// timefilter function
function timeFilter(data) {
  // get current timeframe choice
  let timeFrameSelect = document.querySelector("#timeFrame").value;
  // define filter date variable
  let filterDate = new Date();
  //  set filter date to current date subtracting selected timeframe
  filterDate.setDate(filterDate.getDate() - timeFrameSelect);
  // convert date to string in same format as our dates in data
  let filterDateString = filterDate.toISOString().split("T")[0];
  // pass the filter data function the data and run the function, and define filtered data
  let filteredData = filterData(data);
  function filterData() {
    // filter into filteredData only arrays with dates past the filterDateString
    let filteredData = data.actualsTimeseries.filter((array) => {
      return array.date >= filterDateString;
    });
    return filteredData;
  }
  return filteredData;
}
// clear data function
function clearData() {
  labels.length = 0;
  graphData.length = 0;
  graphSecondData.length = 0;
  dataOneLabel = "";
  dataTwoLabel = "";
}

// Event Listeners
// button to submit selected data request
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", handleAllData);


