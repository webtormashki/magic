"use strict";

var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');
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

var wizardFireBalls = [
  '#ee4830',  '#30a8ee',  '#5ce6c0',  '#e848d5',  '#e6e848'
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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var buttonSubmit = document.querySelector('.setup-submit');

setupOpen.addEventListener('click', function(){
  openPopup();
});
setupClose.addEventListener('click', function(){
  closePopup();
});

// Нажатие на элемент .setup-open удаляет класс hidden
var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', popupEscHandler);
};
// Нажатие на элемент .setup-close возвращает ему класс hidden.
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', popupEscHandler);
}

// Когда окно настройки персонажа открыто,нажатие на клавишу ESC должно закрывать диалог
var popupEscHandler = function(evt){
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

// Когда иконка пользователя в фокусе,то окно настройки персонажа должно открываться по нажатию кнопки ENTER
setupOpen.addEventListener('keydown', function(evt){
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
})

// Если окно открыто и фокус находится на кнопке закрытия окна,то нажатие клавиши ENTERдолжно приводить к закрытию диалога
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Еслидиалоготкрыт,нажатиенакнопку«Сохранить»приводитк отправке формы
var wizardForm = document.querySelector('.setup-wizard-form');
var sendForm = function() {
  wizardForm.method = 'post';
  wizardForm.enctype='multipart/form-data';
  wizardForm.action ='https://js.dump.academy/code-and-magick';
};


buttonSubmit.addEventListener('click', function(){
   sendForm();
});

// Еслидиалоготкрытифокуснаходитсянакнопке«Сохранить», нажатие на   приводит к отправке формы
buttonSubmit.addEventListener('keydown', function(evt){
  if (evt.keyCode === ENTER_KEYCODE) {
    sendForm();
  }
});

// Цветмантии
// wizard .wizard-coat должен обновляться по нажатию на неё. Цвет мантии задаётся через изменение инлайнового CSS-свойства fill для элемента. Цвет должен сменяться произвольным образом на один из следующих цветов:
var colorCoat = document.querySelector('.wizard > .wizard-coat');

var getColorCoat = function() {
  var i = Math.floor(Math.random() * wizardCoats.length);
  var colorCoat = wizardCoats[i];
  return colorCoat;
}
colorCoat.addEventListener('click', function(){
  colorCoat.style.fill = getColorCoat();
});


// Изменениецветаглазперсонажапонажатию.Цветглазволшебника меняется по нажатию на блок .setup-wizard .wizard-eyes. Возможные варианты цвета глаз персонажа:
var colorEyes = document.querySelector('.wizard > .wizard-eyes');

var getColorEyes = function() {
  var i = Math.floor(Math.random() * wizardEyes.length);
  var colorEyes = wizardEyes[i];
  return colorEyes;
}
colorEyes.addEventListener('click', function(){
  colorEyes.style.fill = getColorEyes();
});


// Изменениецветафаерболовпонажатию.Цветзадаётсячерез изменение фона у блока . Возможные варианты цвета:
// Для того, чтобы на сервер отправились правильные данные, при изменении параметров персонажа должно изменяться и значение соответствующего скрытого инпута.
var colorBall = document.querySelector('.setup-fireball-wrap');
var getColorBall = function() {
  var i = Math.floor(Math.random() * wizardFireBalls.length);
  var colorBall = wizardFireBalls[i];
  return colorBall;
}

colorBall.addEventListener('click', function(){
  var ballColor = getColorBall();
  colorBall.style.background = ballColor;
  var ballInput = document.querySelector('input[name=fireball-color]');
  ballInput.value = ballColor;
});


