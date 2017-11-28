'use strict';
//  Дано
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_TOTAL = 4;

var wizardsArray = [];
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

//  Функция генерирует случайное целое число в промежутке от min до max (не включая max)
//  min, max (int)
//  return (int)
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

//  Функция забирает случайный элемент из массива array
//  array (obj)
//  return randomElement (int)
var getRandomElement = function (array) {
  return array[getRandomInt(0, array.length)];
};

//  Генератор Случайных Магов
//  return wizards (obj)
var wizardGenerator = function (count) {
  var wizards = [];

  wizards.length = count;
  for (var i = 0; i < count; i++) {
    wizards[i] = {
      name: getRandomElement(WIZARDS_NAMES) + ' ' + getRandomElement(WIZARDS_SURNAMES),
      coatColor: getRandomElement(WIZARDS_COATS_COLORS),
      eyesColor: getRandomElement(WIZARDS_EYES_COLORS)
    };
  }

  return wizards;
};

//  Составление одного DOM-эл-та по объекту JS
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

//  Составление DOM-эл-тов по массиву объектов JS
var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return fragment;
};

wizardsArray = wizardGenerator(WIZARDS_TOTAL);
userDialog.classList.remove('hidden');
similarListElement.appendChild(renderWizards(wizardsArray));
userDialog.querySelector('.setup-similar').classList.remove('hidden');
