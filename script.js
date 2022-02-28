const mailRegexp =
  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

const errMessage = document.getElementById("errMassage");
const confirmMessage = document.getElementById("confirmMassage");
const formName = document.querySelector("input[name='name']");
const formTel = document.querySelector("input[name='tel']");
const formEmail = document.querySelector("input[name='email']");
const formText = document.querySelector("textarea[name='text']");
const confirmBtn = document.querySelector("input[name='confirm']");
const sendBtn = document.querySelector("input[type='submit']");

let nameOk = false;
let telOk = false;
let emailOk = false;
let textOk = false;

let confirmFlag = false;

const inputCheck = (checkItem) => {
  let textCheck = checkItem.value;
  confirmFlag = false;
  return textCheck != "" ? true : false;
};

const btnDisplay = () => {
  if (confirmFlag) {
    confirmBtn.style.display = "none";
    sendBtn.style.display = "block";
  } else {
    confirmBtn.style.display = "block";
    sendBtn.style.display = "none";
  }
};

const errCheck = (form, ok) => {
  if (ok) {
    form.classList.remove("err");
  } else {
    form.classList.add("err");
  }
  btnDisplay();
};

btnDisplay();

formName.onblur = () => {
  nameOk = inputCheck(formName);
  confirmFlag = false;
  errCheck(formName, nameOk);
};

formTel.onblur = () => {
  let formattedNumber = new libphonenumber.AsYouType("JP").input(formTel.value);
  telOk = formattedNumber ? true : false;
  confirmFlag = false;
  errCheck(formTel, telOk);
};

formEmail.onblur = () => {
  emailOk = mailRegexp.test(formEmail.value) ? true : false;
  confirmFlag = false;
  errCheck(formEmail, emailOk);
};

formText.onblur = () => {
  textOk = inputCheck(formText);
  errCheck(formText, textOk);
};

confirmBtn.addEventListener("click", () => {
  const itemArray = [
    { form: formName, ok: nameOk },
    { form: formTel, ok: telOk },
    { form: formEmail, ok: emailOk },
    { form: formText, ok: textOk },
  ];

  itemArray.map((key) => {
    let form = key["form"];
    let ok = key["ok"];
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
