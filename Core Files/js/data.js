/*
Student Number: 13051622
Student Name: Matthew Fung
Module Code: 6COM0284
Module Title: Web Based Systems Project
*/
Chart.types.Line.extend({
    name: "LineAlt",
    draw: function () {
        Chart.types.Line.prototype.draw.apply(this, arguments);

        var ctx = this.chart.ctx,
            x = this.scale.xScalePaddingLeft * 0.4,
            y = this.chart.height / 2;
        ctx.save();
        // text alignment and color
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = this.options.scaleFontColor;
        // position
        // change origin
        ctx.translate(x, y);
        // rotate text
        ctx.rotate(-90 * Math.PI / 180);
        ctx.fillText('Tweets Received (t)', 0, 0);
        ctx.restore();
    }
});
var data = {
    labels: ["1 Minute","2 Minutes", "3 Minutes", "4 Minutes", "5 Minutes"],
    datasets: [
        {
            label: "Test 1",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [24, 40, 54, 78, 100]
        }
    ]
};
var ctx = document.getElementById('canvas').getContext("2d");
var mychart = new Chart(ctx).LineAlt(data, {
    // make enough space on the right side of the graph
    responsive: true,
    animation: true,
    scaleLabel: "          <%=value%>"
});
