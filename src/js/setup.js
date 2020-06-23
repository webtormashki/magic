"use strict";

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


var wizardNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
]

var wizardSurnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
]

var wizardCoats = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
]

var wizardEyes = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
]

var wizardSmall = [{
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  }
]
var getRandom = function (wizard) {

  var i = Math.floor(Math.random() * wizardNames.length);
  var firstName = wizardNames[i];

  i = Math.floor(Math.random() * wizardSurnames.length);
  var secondName = wizardSurnames[i];

  if (Math.random() < 0.5) {
    wizard.name = firstName + ' ' + secondName;
  } else {
    wizard.name = secondName + ' ' + firstName;
  }

  i = Math.floor(Math.random() * wizardCoats.length);
  wizard.coatColor = wizardCoats[i];

  i = Math.floor(Math.random() * wizardEyes.length);
  wizard.eyesColor = wizardEyes[i];

  var wizardBlock = wizardTemplate.cloneNode(true);

  wizardBlock.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardBlock.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardBlock.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardBlock;
}

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizardSmall.length; i++) {
  fragment.appendChild(getRandom(wizardSmall[i]));
}
similarListElement.appendChild(fragment);
