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

//  Генератор Случайных Магов
var wizardGenerator = function (wizards, count) {
  for (var i = 0; i < count; i++) {
    wizards[i] = {
      name: WIZARDS_NAMES[Math.floor(Math.random() * 8)] + ' ' + WIZARDS_SURNAMES[Math.floor(Math.random() * 8)],
      coatColor: WIZARDS_COATS_COLORS[Math.floor(Math.random() * 6)],
      eyesColor: WIZARDS_EYES_COLORS[Math.floor(Math.random() * 5)]
    };
  }
};

//  Составление одного DOM-эл-та по объекту JS
var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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

wizardGenerator(wizardsArray, WIZARDS_TOTAL);
userDialog.classList.remove('hidden');
similarListElement.appendChild(renderWizards(wizardsArray));
userDialog.querySelector('.setup-similar').classList.remove('hidden');
