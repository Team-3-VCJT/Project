// Global Variables
const labels = [];
const graphData = [];
// Functions

// get the cream filling

// fetch url
function displayResults(results) {
    results.forEach(result => {
        console.log(result.state, result.actuals.cases);
        labels.push(result.state);
        graphData.push(result.actuals.cases);
        document.getElementById("graph").innerHTML += `${result.state}:${result.actuals.cases}`
    })
}

function displayStateResults(results) {
    var result = results.filter(object => {
        return object.state === "AK"
      })
      console.log(result);
}

function getData() {
    const fetchUrl = "https://api.covidactnow.org/v2/states.json?apiKey=30e85e10d30e4c25886360156f029633"
   
    fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayResults(data);
      displayStateResults(data);
    });
}

// Event Listeners



  const data = {
    labels: labels,
    datasets: [{
      label: 'Data',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: graphData,
    }]
  };

const config = {
    type: 'bar',
    data: data, 
    options: {}
  };
  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
// drop down menu functions


document.querySelectorAll('.dropdown').forEach(item => {
    item.addEventListener('click', function(event) {
        event.stopPropagation();
        item.classList.toggle('is-active');
    });
});

getData() 