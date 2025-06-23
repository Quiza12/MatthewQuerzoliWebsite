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


var ctx = document.getElementById('hotels-vs-hostels').getContext('2d');
var data = {
"labels": [
"June",
"July",
"August",
"September",
"October",
"November",
"December"
],
"datasets": [
{
  "label": "Hotels",
  "backgroundColor": "#aaadff",
  "fill": true,
  "data": [
    "6",
    "7",
    "13",
    "4",
    "7",
    "7",
    "2"
  ],
  "borderColor": "#ffffff",
  "borderWidth": "1"
},
{
  "label": "Hostels/Other",
  "backgroundColor": "#407aaa",
  "fill": true,
  "data": [
    "1",
    "13",
    "1",
    "6",
    "13",
    "4",
    "0"
  ]
}
]
};
var options = {
"title": {
"display": true,
"text": "Hotels vs Hostels/Other",
"position": "top",
"fullWidth": true,
"fontColor": "#000000",
"fontSize": 16
},
"legend": {
"display": true,
"fullWidth": true,
"position": "top"
},
"scales": {
"yAxes": [
  {
    "ticks": {
      "beginAtZero": true,
      "display": true
    },
    "gridLines": {
      "display": true,
      "lineWidth": 2,
      "drawOnChartArea": true,
      "drawTicks": true,
      "tickMarkLength": 1,
      "offsetGridLines": true,
      "zeroLineColor": "#942192",
      "color": "#d6d6d6",
      "zeroLineWidth": 2
    },
    "display": true
  }
],
"xAxes": {
  "0": {
    "ticks": {
      "display": true,
      "fontSize": 14,
      "fontStyle": "italic"
    },
    "display": true,
    "gridLines": {
      "display": true,
      "lineWidth": 2,
      "drawOnChartArea": false,
      "drawTicks": true,
      "tickMarkLength": 12,
      "zeroLineWidth": 2,
      "offsetGridLines": true,
      "color": "#942192",
      "zeroLineColor": "#942192"
    },
    "scaleLabel": {
      "fontSize": 16,
      "display": true,
      "fontStyle": "normal"
    }
  }
}
},
"tooltips": {
"enabled": true,
"mode": "label",
"caretSize": 10,
"backgroundColor": "#00fa92"
}
};

var hotelsVsHostels = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});


var ctxPadThai = document.getElementById('pad-thai').getContext('2d');
var dataPadThai = {
"labels": [
"June",
"July",
"August",
"September",
"October",
"November",
"December"
],
"datasets": [
{
  "label": "Pad Thai Consumed",
  "backgroundColor": "#00fa92",
  "fill": true,
  "data": [
    "0",
    "0",
    "0",
    "0",
    "0",
    "11",
    "0"
  ],
  "borderColor": "#ffffff",
  "borderWidth": "1"
}
]
};
var optionsPadThai = {
"title": {
"display": true,
"text": "Pad Thai Consumed",
"position": "top",
"fullWidth": true,
"fontColor": "#000000",
"fontSize": 16
},
"legend": {
"display": true,
"fullWidth": true,
"position": "top"
},
"scales": {
"yAxes": [
  {
    "ticks": {
      "beginAtZero": true,
      "display": true
    },
    "gridLines": {
      "display": true,
      "lineWidth": 2,
      "drawOnChartArea": true,
      "drawTicks": true,
      "tickMarkLength": 1,
      "offsetGridLines": true,
      "zeroLineColor": "#000000",
      "color": "#d6d6d6",
      "zeroLineWidth": 2
    },
    "scaleLabel": {
      "display": true,
      "labelString": ""
    },
    "display": true
  }
],
"xAxes": {
  "0": {
    "ticks": {
      "display": true,
      "fontSize": 14,
      "fontStyle": "italic"
    },
    "display": true,
    "gridLines": {
      "display": true,
      "lineWidth": 2,
      "drawOnChartArea": false,
      "drawTicks": true,
      "tickMarkLength": 12,
      "zeroLineWidth": 2,
      "offsetGridLines": true,
      "color": "#000000",
      "zeroLineColor": "#000000"
    },
    "scaleLabel": {
      "fontSize": 16,
      "display": true,
      "fontStyle": "normal"
    }
  }
}
},
"tooltips": {
"enabled": true,
"mode": "label",
"caretSize": 10,
"backgroundColor": "#00fa92"
}
};

var padThai = new Chart(ctxPadThai, {
    type: 'bar',
    data: dataPadThai,
    options: optionsPadThai
});


var ctxBalloon = document.getElementById('balloon').getContext('2d');
var dataBalloon = {
"labels": [
"Beginning",
"Middle",
"End"
],
"datasets": [
{
  "label": "",
  "backgroundColor": "#000000",
  "fill": false,
  "data": [
    "0",
    "100",
    "0"
  ],
  "borderColor": "#ff9300",
  "pointRadius": "10",
  "pointBackgroundColor": "#945200",
  "pointBorderColor": "#ff9300",
  "lineTension": 0.9,
  "pointBorderWidth": 5,
  "pointHoverBackgroundColor": "#ff9300",
  "pointHoverBorderColor": "#945200"
}
]
};
var optionsBalloon = {
"title": {
"display": true,
"text": "Cappadocia Hot Air Balloon Ride - Rough Visualisation",
"position": "top",
"fontSize": 16,
"fullWidth": true,
"fontColor": "#000000"
},
"legend": {
"display": false
},
"scales": {
"yAxes": [
  {
    "ticks": {
      "beginAtZero": true
    },
    "gridLines": {
      "display": true,
      "lineWidth": 1,
      "drawOnChartArea": true,
      "color": "#000000",
      "zeroLineColor": "#000000",
      "zeroLineWidth": 1,
      "drawTicks": true
    }
  }
],
"xAxes": {
  "0": {
    "gridLines": {
      "drawOnChartArea": false,
      "offsetGridLines": false,
      "zeroLineColor": "#000000",
      "display": true,
      "lineWidth": 2,
      "drawTicks": true,
      "zeroLineWidth": 2,
      "color": "#000000"
    },
    "ticks": {
      "display": true,
      "beginAtZero": true
    }
  }
}
},
"elements": {
"line": {
  "borderColor": "#000000",
  "lineTension": 0
}
}
};

var balloon = new Chart(ctxBalloon, {
    type: 'line',
    data: dataBalloon,
    options: optionsBalloon
});