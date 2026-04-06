// const { text } = require("stream/consumers");

const ctx = document.getElementById('rageAgainstTheLanyard');

const labels = ['2017','2018','2019','2020','2021','2022','2023','2024','2025','2026'];
const data = {
  labels: labels,
  datasets: [{
    label: 'Average \'Rage Against the Machine\' Listening Hours',
    data: [65, 59, 72, 81, 56, 55, 60, 86, 23, 17],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Year'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Listening Hours'
      }
    }
  }
};

const config = {
  type: 'line',
  data: data,
  options: options
};

new Chart(ctx, config);