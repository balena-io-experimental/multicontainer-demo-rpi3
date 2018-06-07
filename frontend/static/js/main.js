define(["jquery", "highcharts", "socketio"], function($, Highcharts, io) {
  $(document).ready(function() {
    $("div#loading").hide()
    var chart = new Highcharts.Chart({
      chart: {
        type: "area",
        margin: [40, 20, 60, 40],
        renderTo: "container",
        animation: false
      },
      title: {
        text: "CPU Temperature Feed"
      },
      xAxis: {
        gridLineWidth: 1,
        minPadding: 0.1,
        maxPadding: 0.1,
        maxZoom: 60
      },
      yAxis: {
        title: {
          text: null
        },
        max: 100,
        minPadding: 0.1,
        maxPadding: 0.1,
        maxZoom: 60,
        plotLines: [
          {
            value: 0,
            width: 1,
            color: "#000000"
          }
        ]
      },
      plotOptions: {
        series: {
          lineWidth: 1
        }
      },
      series: [
        {
          data: [[0]]
        }
      ]
    });

    var socket = io.connect(
      window.location.protocol + "//" + window.location.hostname
    );

    socket.on("temperature", function(data) {
      var series = chart.series[0];

      // If data.color is undefined, Highcharts fall back to the default color (blue)
      chart.series[0].options.color = data.color;
      chart.series[0].update(chart.series[0].options);
      series.addPoint([data.t], true, series.data.length > 200);
    });
  });
});
