"use strict";

// Функция рисует Прямоугольник со скруглением краев
// ctx (object) - canvas
// x, y (int) - координаты левого верхнего угла
// width, heigh (object) - ширина и высота соответственно
// radius (int) - радиус скругления
// fill, stroke (boolean) - флаги заливки и обводка
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }
}

// Функция отрисовывает голову котэ
// ctx (object) - canvas
// x, y (int) - координаты центра
// width, heigh (object) - ширина и высота головы
// fill, stroke (boolean) - флаги заливки и обводка
function nyanCatHead(ctx, x, y, width, height, fill, stroke) {
  if (typeof stroke === "undefined" ) {
    stroke = true;
  }
// Основа головы
  ctx.beginPath();
  ctx.moveTo(x + width/2, y + height/2);
  ctx.lineTo(x - width/2, y + height/2);
  ctx.lineTo(x - width/2 - width * 5 / 28, y + height*1/6);
  ctx.lineTo(x - width/2 - width * 5 / 28, y - height*1/3);
  ctx.lineTo(x - width/2 - width * 3 / 28, y - height*1/3);
  ctx.lineTo(x - width/2 - width * 3 / 28, y - height*5/6);
  ctx.lineTo(x - width/2 - width *  3 / 28 + width * 9 / 20, y - height*2/3);
  ctx.moveTo(x + width/2, y + height/2);
  ctx.lineTo(x + width/2 + width * 5 / 28, y + height*1/6);
  ctx.lineTo(x + width/2 + width * 5 / 28, y - height*1/3);
  ctx.lineTo(x + width/2 + width * 3 / 28, y - height*1/3);
  ctx.lineTo(x + width/2 + width * 3 / 28, y - height*5/6);
  ctx.lineTo(x + width/2 + width *  3 / 28 - width * 9 / 20, y - height*2/3);
  ctx.lineTo(x - width/2 - width *  3 / 28 + width * 9 / 20, y - height*2/3);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = '#999999';
    ctx.fill();
  }
// Глаза
  ctx.shadowColor = 'black';
  ctx.shadowOffsetX = 0;
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.beginPath();
  ctx.arc(x - width * 7 / 28, y - height * 1 / 6, ( width + height ) / 22, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'black';
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x + width * 7 / 28, y - height * 1 / 6, ( width + height ) / 22, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'black';
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
// Рот
  ctx.beginPath();
  ctx.moveTo(x - width * 7 / 28, y + height * 1 / 5);
  ctx.lineTo(x - width * 7 / 28, y + height * 2 / 5);
  ctx.lineTo(x + width * 7 / 28, y + height * 2 / 5);
  ctx.lineTo(x + width * 7 / 28, y + height * 1 / 5);
  ctx.moveTo(x, y + height * 1 / 5);
  ctx.lineTo(x, y + height * 2 / 5);
  ctx.stroke();
// Нос
  ctx.beginPath();
  ctx.arc(x, y, ( width + height ) / 44, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'black';
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

// Функция отрисовывает радугу
// ctx (object) - canvas
// x, y (int) - координаты левого верхнего угла
// width, heigh (object) - ширина и высота рабочей области
// radius (int) - радиус скругления
// lineWidth (int) - толщина радужных линий
function nyanCatRainbow(ctx, x, y, width, height, radius, lineWidth) {
  var dy;
  var dx1, dx2;
  var counter = 0;
  var colorMassive = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'violet'];

  if (typeof radius === "undefined") {
    radius = 5;
  }
  if (typeof lineWidth === "undefined") {
    lineWidth = 5;
  }
  ctx.lineWidth = lineWidth;
  dy = y + radius;
  while (dy < y + height - radius) {
    dx1 = x - width / 4;
    dx2 = x - width / 2;
    ctx.beginPath();
    ctx.moveTo(x, dy);
    ctx.quadraticCurveTo(dx1, dy - radius, dx2, dy);
    dx1 = x - width * 3 / 4;
    dx2 = x - width;
    ctx.quadraticCurveTo(dx1, dy + radius, dx2, dy);
    ctx.strokeStyle = colorMassive[counter];
    ctx.stroke();
    counter++;
    if (counter % 7 === 0) {
      counter = 0;
    }
    dy = dy + lineWidth / 2;
  }
}

function textRender(ctx, x, y, text) {
  var current = 0;
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  while (text.indexOf('\n') !== -1, current) {
    ctx.fillText(substring(current, text.indexOf('\n')), x, y)
    current = text.indexOf('\n') + 2;
  }
}

window.renderStatistics = function (ctx, name, times) {
  var outText = 'Ура вы победили!\nСписок результатов:';

  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 10;
  roundRect(ctx, 100, 10, 420, 270, 20, true, true);
  nyanCatHead(ctx, 520, 240, 120, 100, true, true);
  ctx.shadowOffsetX = 0;
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  nyanCatRainbow(ctx, 100, 10, 100, 270, 20, 10);

  textRender(ctx, 130, 40, outText);
}
