define(["jquery", "highcharts", "socketio"], function($, Highcharts, io) {
  $(document).ready(function() {
    $("div#loading").hide();

    //Default chart color
    var chartColor = '#0000FF'

    $.get( "color", function( data ) {
      chartColor = data
      console.log(chartColor)
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
            lineWidth: 1,
            marker: {
              enabled: false
            }
          }
        },
        series: [
          {
            name: "Temperature",
            type: "area",
            color: chartColor,
            data: []
          }
        ]
      });

      socket.on("temperature", data => {
        var series = chart.series[0];
        series.addPoint([data.t], true, series.data.length > 200);
        $.get( "color", function( data ) {
          if(data != chartColor){
            // If the frontend server tells us a different color, 
            // reload the window.
            console.log("different color: " + data)
            window.location.reload();
          }
        });
      });
    });

    var socket = io.connect(
      window.location.protocol + "//" + window.location.hostname
    );

  });
});
