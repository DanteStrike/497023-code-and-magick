'use strict';

// ДАНО
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGH = 270;
var CLOUD_CORNER_RADIUS = 20;
var CLOUD_FILL_COLOR = 'white';
var CLOUD_STROKE_COLOR = 'black';
var CLOUD_STROKE_WIDTH = 3;

var BIG_CAT_HEAD_WIDTH = 120;
var BIG_CAT_HEAD_HEIGHT = 100;
var RAINBOW_WIDTH = 100;
var RAINBOW_STROKE_WIDTH = 5;
var RAINBOW_COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'violet'];

var SHADOW_X = 10;
var SHADOW_Y = 10;
var SHADOW_BLUR = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var OUT_TEXT = 'Ура вы победили!\nСписок результатов:';
var FONT_STYLE = '16px PT Mono';
var FONT_COLOR = 'black';

var HISTOGRAM_COLUMN_WIDTH = 40;
var HISTOGRAM_COLUMN_HEIGH = 150;
var HISTOGRAM_COLUMN_BETWEEN = 50;
var HISTOGRAM_COLUMN_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var HISTOGRAM_COLUMN_STROKE_COLOR = 'black';
var HISTOGRAM_COLUMN_STROKE_WIDTH = 1;

var EPSILON = 0.0001;

// Функция рисует Прямоугольник со скруглением краев
// ctx (object) - canvas
// x, y (int) - координаты левого верхнего угла
// width, heigh (object) - ширина и высота соответственно
// radius (int) - радиус скругления
// fill, stroke (boolean) - флаги заливки и обводка
var drawRoundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
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
};

// Функция отрисовывает голову котэ
// ctx (object) - canvas
// x, y (int) - координаты центра
// width, heigh (object) - ширина и высота головы
// fill, stroke (boolean) - флаги заливки и обводка
var drawNyanCatHead = function (ctx, x, y, width, height, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }

  // Основа головы
  ctx.beginPath();
  ctx.moveTo(x + width / 2, y + height / 2);
  ctx.lineTo(x - width / 2, y + height / 2);
  ctx.lineTo(x - width / 2 - width * 5 / 28, y + height * 1 / 6);
  ctx.lineTo(x - width / 2 - width * 5 / 28, y - height * 1 / 3);
  ctx.lineTo(x - width / 2 - width * 3 / 28, y - height * 1 / 3);
  ctx.lineTo(x - width / 2 - width * 3 / 28, y - height * 5 / 6);
  ctx.lineTo(x - width / 2 - width * 3 / 28 + width * 9 / 20, y - height * 2 / 3);
  ctx.moveTo(x + width / 2, y + height / 2);
  ctx.lineTo(x + width / 2 + width * 5 / 28, y + height * 1 / 6);
  ctx.lineTo(x + width / 2 + width * 5 / 28, y - height * 1 / 3);
  ctx.lineTo(x + width / 2 + width * 3 / 28, y - height * 1 / 3);
  ctx.lineTo(x + width / 2 + width * 3 / 28, y - height * 5 / 6);
  ctx.lineTo(x + width / 2 + width * 3 / 28 - width * 9 / 20, y - height * 2 / 3);
  ctx.lineTo(x - width / 2 - width * 3 / 28 + width * 9 / 20, y - height * 2 / 3);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = '#999999';
    ctx.fill();
  }

  // Глаза
  ctx.fillStyle = 'black';
  ctx.shadowColor = 'black';
  ctx.shadowOffsetX = 0;
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.beginPath();
  ctx.arc(x - width * 7 / 28, y - height * 1 / 6, (width + height) / 22, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x + width * 7 / 28, y - height * 1 / 6, (width + height) / 22, 0, 2 * Math.PI, false);
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
  ctx.arc(x, y, (width + height) / 44, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};

// Функция отрисовывает радугу
// ctx (object) - canvas
// x, y (int) - координаты правого верхнего угла (зацепляется за прмоугольник)
// width, heigh (object) - ширина и высота рабочей области
// radius (int) - радиус скругления
// lineWidth (int) - толщина радужных линий
var drawNyanCatRainbow = function (ctx, x, y, width, height, radius, lineWidth) {
  var dy = 0;
  var dx1 = 0;
  var dx2 = 0;
  var counter = 0;

  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof lineWidth === 'undefined') {
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
    ctx.strokeStyle = RAINBOW_COLORS[counter];
    ctx.stroke();
    counter++;
    if (counter % RAINBOW_COLORS.length === 0) {
      counter = 0;
    }
    dy = dy + lineWidth / 2;
  }
};

// Функция отрисовывает большого кота
// ctx (object) - canvas
var drawBigNyanCat = function (ctx) {
  ctx.fillStyle = CLOUD_FILL_COLOR;
  ctx.strokeStyle = CLOUD_STROKE_COLOR;
  ctx.lineWidth = CLOUD_STROKE_WIDTH;
  ctx.shadowColor = SHADOW_COLOR;
  ctx.shadowOffsetX = SHADOW_X;
  ctx.shadowBlur = SHADOW_BLUR;
  ctx.shadowOffsetY = SHADOW_Y;
  drawRoundRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGH, CLOUD_CORNER_RADIUS, true, true);
  drawNyanCatHead(ctx, CLOUD_X + 420, CLOUD_Y + 230, BIG_CAT_HEAD_WIDTH, BIG_CAT_HEAD_HEIGHT, true, true);
  ctx.shadowOffsetX = 0;
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  drawNyanCatRainbow(ctx, CLOUD_X, CLOUD_Y, RAINBOW_WIDTH, CLOUD_HEIGH, CLOUD_CORNER_RADIUS, RAINBOW_STROKE_WIDTH);
};

// Функция отрисовывает малого кота
// ctx (object) - canvas
var drawSmallNyanCat = function (ctx) {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.fillStyle = 'mistyrose';
  drawRoundRect(ctx, CLOUD_X + CLOUD_WIDTH - 20 - 70, CLOUD_Y + 10, 70, 40, 3, true, true);
  ctx.fillStyle = 'orange';
  drawRoundRect(ctx, CLOUD_X + CLOUD_WIDTH - 10 - 70, CLOUD_Y + 20, 50, 20, 1, true, true);
  drawNyanCatHead(ctx, CLOUD_X + CLOUD_WIDTH - 20 - 5, CLOUD_Y + 20 + 40 / 2, 30, 30, true, true);
  drawNyanCatRainbow(ctx, CLOUD_X + CLOUD_WIDTH - 20 - 70, CLOUD_Y + 10, 30, 40, 3, 1);
};

// Функция рендерит многострочный текст
// ctx (object) - canvas
// x, y (int) - координаты левого верхнего угла
// text (string) - строка вывода
// style, color (string) - параметры текста
var renderText = function (ctx, x, y, text, style, color) {
  var current = 0;
  var fontLineHeigh = 0;

  ctx.font = style;
  ctx.fillStyle = color;
  fontLineHeigh = Math.round(Number(style.substring(0, style.indexOf('px', 0))) * 1.5);

  while (text.indexOf('\n', current) !== -1) {
    ctx.fillText(text.substring(current, text.indexOf('\n', current)), x, y);
    current = text.indexOf('\n', current) + 1;
    y += fontLineHeigh;
  }
  ctx.fillText(text.substring(current, text.length), x, y);
};

// Функция находит максимальный эл-т в ненулл числовом массиве
// array (object) - массив
// return максимальный эл-т max (number)
var foundMaxElement = function (array) {
  var max = 0;
  var i = 0;

  for (i = 0; i < array.length; i++) {
    if (max < array[i]) {
      max = array[i];
    }
  }
  return max;
};

// Функция находит максимальный эл-т в ненулл числовом массиве
// ctx (object) - canvas
// name (string) - имя игрока
var initHistogramColumnColor = function (ctx, name) {
  var colorDelta = 0;

  if (name !== 'Вы') {
    colorDelta = Math.random();
    if (colorDelta < EPSILON) {
      colorDelta += 0.1;
    }
    ctx.fillStyle = 'rgba(0, 0, 255, ' + colorDelta + ')';
  } else {
    ctx.fillStyle = HISTOGRAM_COLUMN_PLAYER_COLOR;
  }
};

// Функция отрисовки текущей колонки и текста
// ctx (object) - canvas
// time (int) - результат игрока
// name (string) - имя игрока
// deltaX (int) - смещение колонки
// deltaHeight (int) - высота колонки
var drawHistogramColumn = function (ctx, time, name, deltaX, deltaHeight) {

  // Вывод колонки
  ctx.fillRect(CLOUD_X + deltaX + 20, CLOUD_Y + CLOUD_HEIGH - deltaHeight - 25, HISTOGRAM_COLUMN_WIDTH, deltaHeight);
  ctx.strokeRect(CLOUD_X + deltaX + 20, CLOUD_Y + CLOUD_HEIGH - deltaHeight - 25, HISTOGRAM_COLUMN_WIDTH, deltaHeight);

  // Вывод текста
  renderText(ctx, CLOUD_X + deltaX + 20, CLOUD_Y + CLOUD_HEIGH - deltaHeight - 40, Math.round(time).toString(), FONT_STYLE, FONT_COLOR);
  renderText(ctx, CLOUD_X + deltaX + 20, CLOUD_Y + CLOUD_HEIGH - 10, name, FONT_STYLE, FONT_COLOR);
};

// Основная функция отрисовки статистики
window.renderStatistics = function (ctx, names, times) {
  var maxTime = 0;
  var deltaX = 0;
  var deltaHeight = 0;
  var i = 0;

  // Вывод облачка "Большой котэ"
  drawBigNyanCat(ctx);

  // Вывод облачка "Маленький котэ"
  drawSmallNyanCat(ctx);

  // Вывод вступительного текста
  renderText(ctx, CLOUD_X + 30, CLOUD_Y + 30, OUT_TEXT, FONT_STYLE, FONT_COLOR);

  // Вывод результатов
  // 1) Посик максимального результата - точка "опоры" 
  maxTime = foundMaxElement(times);

  // 2) Инициализация параметров отрисовки
  ctx.strokeStyle = HISTOGRAM_COLUMN_STROKE_COLOR;
  ctx.lineWidth = HISTOGRAM_COLUMN_STROKE_WIDTH;

  for (i = 0; i < times.length; i++) {
    // 3) Установка цвета текущей колонки
    initHistogramColumnColor(ctx, names[i]);

    // 4) Вычисление смещения и относительных размеров текущей колонки
    deltaX = HISTOGRAM_COLUMN_WIDTH * i + HISTOGRAM_COLUMN_BETWEEN * i;
    deltaHeight = HISTOGRAM_COLUMN_HEIGH * times[i] / maxTime;

    // 5) Отрисовка текущей колонки и текста 
    drawHistogramColumn(ctx, times[i], names[i], deltaX, deltaHeight);
  }
};

