window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


var ctxHotels = document.getElementById('hotels-vs-hostels').getContext('2d');

var data = {
  labels: ["June","July","August","September","October","November","December"],
  datasets: [
    {
      label: "Hotels",
      backgroundColor: "#aaadff",
      borderColor: "#ffffff",
      borderWidth: 1,
      data: [6,7,13,4,7,7,2],
      fill: true
    },
    {
      label: "Hostels/Other",
      backgroundColor: "#407aaa",
      data: [1,13,1,6,13,4,0],
      fill: true
    }
  ]
};

var options = {
  plugins: {
    title: {
      display: true,
      text: "Hotels vs Hostels/Other",
      color: "#000000",
      font: { size: 16 }
    },
    legend: {
      display: true,
      position: "top"
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#00fa92",
      caretSize: 10,
      mode: "index"
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { display: true },
      grid: {
        display: true,
        color: "#d6d6d6",
        lineWidth: 2,
        zeroLineColor: "#942192",
        zeroLineWidth: 2
      }
    },
    x: {
      ticks: {
        display: true,
        font: { size: 14, style: "italic" }
      },
      grid: {
        display: true,
        drawOnChartArea: false,
        color: "#942192",
        lineWidth: 2
      }
    }
  }
};

new Chart(ctxHotels, {
  type: 'bar',
  data: data,
  options: options
});


var ctxPadThai = document.getElementById('pad-thai').getContext('2d');

var dataPadThai = {
  labels: ["June","July","August","September","October","November","December"],
  datasets: [
    {
      label: "Pad Thai Consumed",
      backgroundColor: "#00fa92",
      borderColor: "#ffffff",
      borderWidth: 1,
      data: [0,0,0,0,0,11,0],
      fill: true
    }
  ]
};

var optionsPadThai = {
  plugins: {
    title: {
      display: true,
      text: "Pad Thai Consumed",
      color: "#000000",
      font: { size: 16 }
    },
    legend: {
      display: true,
      position: "top"
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#00fa92",
      caretSize: 10,
      mode: "index"
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: "#d6d6d6",
        lineWidth: 2,
        zeroLineColor: "#000000",
        zeroLineWidth: 2
      }
    },
    x: {
      ticks: {
        display: true,
        font: { size: 14, style: "italic" }
      },
      grid: {
        display: true,
        drawOnChartArea: false,
        color: "#000000",
        lineWidth: 2
      }
    }
  }
};

new Chart(ctxPadThai, {
  type: 'bar',
  data: dataPadThai,
  options: optionsPadThai
});


var ctxBalloon = document.getElementById('balloon').getContext('2d');

var dataBalloon = {
  labels: ["Beginning","Middle","End"],
  datasets: [
    {
      label: "",
      data: [0,100,0],
      borderColor: "#ff9300",
      backgroundColor: "#000000",
      pointRadius: 10,
      pointBackgroundColor: "#945200",
      pointBorderColor: "#ff9300",
      pointBorderWidth: 5,
      pointHoverBackgroundColor: "#ff9300",
      pointHoverBorderColor: "#945200",
      tension: 0.9,
      fill: false
    }
  ]
};

var optionsBalloon = {
  plugins: {
    title: {
      display: true,
      text: "Cappadocia Hot Air Balloon Ride - Rough Visualisation",
      color: "#000000",
      font: { size: 16 }
    },
    legend: { display: false }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: "#000000",
        lineWidth: 1,
        zeroLineColor: "#000000",
        zeroLineWidth: 1
      }
    },
    x: {
      ticks: { display: true },
      grid: {
        display: true,
        drawOnChartArea: false,
        color: "#000000",
        lineWidth: 2
      }
    }
  }
};

new Chart(ctxBalloon, {
  type: 'line',
  data: dataBalloon,
  options: optionsBalloon
});
