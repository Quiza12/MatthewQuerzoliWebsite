const rageCtx = document.getElementById('rageAgainstTheLanyard');

const labels = ['2017','2018','2019','2020','2021','2022','2023','2024','2025','2026'];

const data = {
  labels: labels,
  datasets: [
    // OPTION A background (2017–2024)
    {
      label: 'Access pass worn on hip',
      data: [1,1,1,1,1,1,1,1,null,null],
      backgroundColor: 'rgba(0,150,255,0.15)',
      borderWidth: 0,
      pointRadius: 0,
      fill: 'origin',
      yAxisID: 'bg',
      order: 1
    },

    // OPTION B background (2024–2026)
    {
      label: 'Access pass worn on lanyard (around neck)',
      data: [null,null,null,null,null,null,null,1,1,1],
      backgroundColor: 'rgba(0,255,150,0.20)',
      borderWidth: 0,
      pointRadius: 0,
      fill: 'origin',
      yAxisID: 'bg',
      order: 1
    },

    // MAIN LINE DATASET
    {
      label: "Average 'Rage Against the Machine' Listening Hours",
      data: [65, 59, 72, 81, 56, 55, 60, 86, 23, 17],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      fill: false,
      yAxisID: 'main',
      order: 2
    }
  ]
};

const options = {
  scales: {
    // Main Y axis
    main: {
      type: 'linear',
      position: 'left',
      title: {
        display: true,
        text: 'Listening Hours'
      },
      min: 0,
      max: 100
    },

    // Background Y axis (0 → 1)
    bg: {
      type: 'linear',
      position: 'left',
      min: 0,
      max: 1,
      display: false   // hide this axis
    },

    x: {
      title: {
        display: true,
        text: 'Year'
      }
    }
  }
};

new Chart(rageCtx, {
  type: 'line',
  data: data,
  options: options
});
