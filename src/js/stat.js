"use strict";

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_COLOR = "#fff";
var SHADOW_COLOR = "rgba(0, 0, 0, 0.7)";
var TEXT_COLOR = "#000"

var HISTOGRAM_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var MY_COLOR = "rgba(255, 0, 0, 1)";



window.renderStatistics = function (ctx, names, times) {

  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  var offsetY = CLOUD_Y + GAP;

  ctx.textBaseline = "hanging";
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText("Ура, вы победили!", CLOUD_X + 2 * GAP, offsetY + GAP);
  offsetY += 2 * GAP;
  ctx.fillText("Список результатов:", CLOUD_X + 2 * GAP, offsetY + GAP);

  ctx.font = "16px PT Mono";
  console.log(names);
  console.log(times);

  var histogramGap = (CLOUD_WIDTH - (COLUMN_WIDTH + COLUMN_GAP) * names.length) / 2;

  var getHighestResult = function () {
    var highestResult = 0;
    for (var i = 0; i < times.length; i++) {
      if (times[i] > highestResult) {
        highestResult = times[i];
      }
    }
    return highestResult;
  }
  var highestResult = getHighestResult();

  var getRowHeight = function (highestResult, currentResult) {
    var rowHeight = HISTOGRAM_HEIGHT * currentResult / highestResult;
    return rowHeight;
  }

  offsetY += 5 * GAP;

  for (var i = 0; i < times.length; i++) {

    var rowHeight = getRowHeight(highestResult, times[i]);


    if (names[i] == "Вы") {
      ctx.fillStyle = MY_COLOR;
    } else {
      var colorSaturation = Math.random() * 100;
      var userColor = `hsl(240, ${colorSaturation}%, 50%)`;
      ctx.fillStyle = userColor;
    }

    ctx.fillRect(CLOUD_X + histogramGap + i * (COLUMN_WIDTH + COLUMN_GAP),
      offsetY + HISTOGRAM_HEIGHT - rowHeight,
      COLUMN_WIDTH,
      rowHeight);

    ctx.fillStyle = TEXT_COLOR;

    ctx.fillText(Math.round(times[i]),
      CLOUD_X + histogramGap + i * (COLUMN_WIDTH + COLUMN_GAP),
      offsetY + HISTOGRAM_HEIGHT - rowHeight - GAP * 2);

    ctx.fillText(names[i],
      CLOUD_X + histogramGap + i * (COLUMN_WIDTH + COLUMN_GAP),
      offsetY + HISTOGRAM_HEIGHT + GAP);
  }
};
