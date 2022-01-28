// Global Variables
const labels = [];
const graphData = [];
const graphSecondData = [];


// Functions



// Event Listeners

const data = {
  labels: labels,
  datasets: [
    {

      backgroundColor: "rgb(255, 99, 132)",
      data: graphData,
    },
    {

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

}
// fetch url based on first state selection
function handleHistoricalData() {
  const stateDropdownSelection = document.querySelector("#stateSelect").value;
  const fetchUrl = `https://api.covidactnow.org/v2/state/${stateDropdownSelection}.timeseries.json?apiKey=30e85e10d30e4c25886360156f029633`;

  fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

