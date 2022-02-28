"use strict";

var mailRegexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
var errMessage = document.getElementById("errMassage");
var confirmMessage = document.getElementById("confirmMassage");
var formName = document.querySelector("input[name='name']");
var formTel = document.querySelector("input[name='tel']");
var formEmail = document.querySelector("input[name='email']");
var formText = document.querySelector("textarea[name='text']");
var confirmBtn = document.querySelector("input[name='confirm']");
var sendBtn = document.querySelector("input[type='submit']");
var nameOk = false;
var telOk = false;
var emailOk = false;
var textOk = false;
var confirmFlag = false;

var inputCheck = function inputCheck(checkItem) {
  var textCheck = checkItem.value;
  confirmFlag = false;
  return textCheck != "" ? true : false;
};

var btnDisplay = function btnDisplay() {
  if (confirmFlag) {
    confirmBtn.style.display = "none";
    sendBtn.style.display = "block";
  } else {
    confirmBtn.style.display = "block";
    sendBtn.style.display = "none";
  }
};

var errCheck = function errCheck(form, ok) {
  if (ok) {
    form.classList.remove("err");
  } else {
    form.classList.add("err");
  }

  btnDisplay();
};

btnDisplay();

formName.onblur = function () {
  nameOk = inputCheck(formName);
  confirmFlag = false;
  errCheck(formName, nameOk);
};

formTel.onblur = function () {
  var formattedNumber = new libphonenumber.AsYouType("JP").input(formTel.value);
  telOk = formattedNumber ? true : false;
  confirmFlag = false;
  errCheck(formTel, telOk);
};

formEmail.onblur = function () {
  emailOk = mailRegexp.test(formEmail.value) ? true : false;
  confirmFlag = false;
  errCheck(formEmail, emailOk);
};

formText.onblur = function () {
  textOk = inputCheck(formText);
  errCheck(formText, textOk);
};

confirmBtn.addEventListener("click", function () {
  var itemArray = [{
    form: formName,
    ok: nameOk
  }, {
    form: formTel,
    ok: telOk
  }, {
    form: formEmail,
    ok: emailOk
  }, {
    form: formText,
    ok: textOk
  }];
  itemArray.map(function (key) {
    var form = key["form"];
    var ok = key["ok"];
    errCheck(form, ok);
  });

  if (nameOk && telOk && emailOk && textOk) {
    confirmFlag = true;
    errMessage.style.display = "none";
    confirmMessage.style.display = "block";
  } else {
    confirmFlag = false;
    errMessage.style.display = "block";
    confirmMessage.style.display = "none";
  }

  btnDisplay();
});