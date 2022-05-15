const errorUsername = document.getElementById("errorUsername");
const errorPassword = document.getElementById("errorPassword");
const usernameText = document.getElementById("usernameText");
const passwordText = document.getElementById("passwordText");
const warningUsername = document.getElementById("warningUsername");
const warningPassword = document.getElementById("warningPassword");
const showBtn = document.getElementById("showBtn");
const logInBtn = document.getElementById("logInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");

const recoveryModal = document.getElementById("recoveryModal");
const recoveryBackBtn = document.getElementById("recoveryBackBtn");
const sendEmailBtn = document.getElementById("sendEmailBtn");
const recoveryEmailText = document.getElementById("recoveryEmailText");
const recoveryWarning = document.getElementById("recoveryWarning");
const recoveryErrorEmail = document.getElementById("recoveryErrorEmail");
const recoveryConfirmationWrap = document.getElementById("recoveryConfirmationWrap");
const recoveryText = document.getElementById("recoveryText");

const signUpModal = document.getElementById("signUpModal");
const signUpBackBtn = document.getElementById("signUpBackBtn");
const createAccountBtn = document.getElementById("createAccountBtn");
const signUpWarningUser = document.getElementById("signUpWarningUser");
const signUpTextUser = document.getElementById("signUpTextUser");
const signUpErrorUser = document.getElementById("signUpErrorUser");
const signUpWarningEmail = document.getElementById("signUpWarningEmail");
const signUpTextEmail = document.getElementById("signUpTextEmail");
const signUpErrorEmail = document.getElementById("signUpErrorEmail");
const signUpWarningPassword = document.getElementById("signUpWarningPassword");
const signUpTextPassword = document.getElementById("signUpTextPassword");
const signUpErrorPassword = document.getElementById("signUpErrorPassword");
const signUpWarningPassrepeat = document.getElementById("signUpWarningPassrepeat");
const signUpTextPassrepeat = document.getElementById("signUpTextPassrepeat");
const signUpErrorPassrepeat = document.getElementById("signUpErrorPassrepeat");
const signUpShowBtn1 = document.getElementById("signUpShowBtn1");
const signUpShowBtn2 = document.getElementById("signUpShowBtn2");
const signUpConfirmationWrap = document.getElementById("signUpConfirmationWrap");
const signUpConfirmationContent = document.getElementById("signUpConfirmationContent");

const SpecialChars = ["@", "_", "-", ".", "!", "#", "$", "%", "&", "*", "?"]
const NumericalChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const AlphabeticalChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

function Sleep(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

function ValidChar(char, charList) {
  for (let i = 0; i < charList.length; i++) {
    if (char === charList[i]) {return true}
  }
  return false;
}

function ValidEmail(email) {
  let atSign = 0; //The index where @ is present
  let dot = 0; //The index where . is present

  email = email.toLowerCase();
  for (let i = 0; i < email.length; i++) { //Check email prefix
    if (email[i] === "@") {atSign=i; break}

    if (!ValidChar(email[i], AlphabeticalChars) && !ValidChar(email[i], NumericalChars)
    && !ValidChar(email[i], SpecialChars)) {return false}

    if (ValidChar(email[i], SpecialChars)) {
      if (i === 0) {return false} //Special chars can't be first
      if (ValidChar(email[i+1], SpecialChars)) {return false} //Special chars can't be consecutive
    }
  }
  if (atSign === 0) {return false} //@ Must be present and not first
  if (ValidChar(email[atSign-1], SpecialChars)) {return false} //Special chars can't be right before @


  for (let j = email.length - 1; j > atSign; j--) { //Check top-level domain
    if (email[j] === ".") {
      if (j > email.length - 3) {return false} //Dot must have at least 2 alphabetical chars after it
      dot = j; break;
    }
    if (!ValidChar(email[j], AlphabeticalChars)) {return false}
  }
  if (dot === 0) {return false} //Dot must be present
  if (dot === atSign + 1) {return false} //There must be a domain between @ and dot


  for (let k = dot - 1; k > atSign; k--) { //Check email domain
    if (!ValidChar(email[k], AlphabeticalChars) && !ValidChar(email[k], NumericalChars)
    && !ValidChar(email[k], SpecialChars)) {return false}
    if (email[k] === "@") {return false} //There can only be one @

    if (ValidChar(email[k], SpecialChars)) {
      if (k === atSign + 1) {return false} //Special chars can't be right after @
      if (k === dot - 1) {return false} //Special chars can't be right before dot
      if (ValidChar(email[k-1], SpecialChars)) {return false} //Special chars can't be consecutive
    }
  }

  return true;
}

function ValidPassword(password) { //More verification needed
  password = password.toLowerCase();

  if (password.length < 8) {return false}

  let hasLetter = false;
  let hasNumber = false;
  let hasSymbol = false;
  for (let i = 0; i < password.length; i++) {
    if (!hasLetter) {
      if (ValidChar(password[i], AlphabeticalChars)) {hasLetter = true}
    }
    if (!hasNumber) {
      if (ValidChar(password[i], NumericalChars)) {hasNumber = true}
    }
    if (!hasSymbol) {
      if (ValidChar(password[i], SpecialChars)) {hasSymbol = true}
    }

    if (hasLetter && hasNumber && hasSymbol) {return true}
  }
  return false;
}

function PasswordViewToggle(textbox, button) {
  if (textbox.getAttribute("type") === "password") {
    textbox.setAttribute("type", "text");
    button.innerText = "Hide";
  } else {
    textbox.setAttribute("type", "password");
    button.innerText = "Show";
  }
}

showBtn.addEventListener("click", ()=> {
  PasswordViewToggle(passwordText, showBtn);
});
signUpShowBtn1.addEventListener("click", ()=> {
  PasswordViewToggle(signUpTextPassword, signUpShowBtn1);
  PasswordViewToggle(signUpTextPassrepeat, signUpShowBtn2);
});
signUpShowBtn2.addEventListener("click", ()=> {
  PasswordViewToggle(signUpTextPassword, signUpShowBtn1);
  PasswordViewToggle(signUpTextPassrepeat, signUpShowBtn2);
});

function ErrorToggle(textbox, icon, message, toggle) {
    message.classList[toggle]("error-show");
    icon.classList[toggle]("error-show");
    textbox.classList[toggle]("error-border");
}

function ConfirmationToggle(confirmationWrap, removedContent, button, toggle) {
  confirmationWrap.classList[toggle]("confirmation-show");
  removedContent.classList[toggle]("recovery-hide");
  button.classList[toggle]("recovery-hide");
}

logInBtn.addEventListener("click", ()=> {
  if (usernameText.value === "") {ErrorToggle(usernameText, warningUsername, errorUsername, "add")}
  if (passwordText.value === "") {ErrorToggle(passwordText, warningPassword, errorPassword, "add")}
});

usernameText.addEventListener("input", ()=> {
  ErrorToggle(usernameText, warningUsername, errorUsername, "remove")});
passwordText.addEventListener("input", ()=> {
  ErrorToggle(passwordText, warningPassword, errorPassword, "remove")});
recoveryEmailText.addEventListener("input", ()=> {
  ErrorToggle(recoveryEmailText, recoveryWarning, recoveryErrorEmail, "remove")});
signUpTextUser.addEventListener("input", ()=> {
  ErrorToggle(signUpTextUser, signUpWarningUser, signUpErrorUser, "remove")});
signUpTextEmail.addEventListener("input", ()=> {
  ErrorToggle(signUpTextEmail, signUpWarningEmail, signUpErrorEmail, "remove")});
signUpTextPassword.addEventListener("input", ()=> {
  ErrorToggle(signUpTextPassword, signUpWarningPassword, signUpErrorPassword, "remove");
  if (signUpTextPassword.value !== signUpTextPassrepeat.value) {
    ErrorToggle(signUpTextPassrepeat, signUpWarningPassrepeat, signUpErrorPassrepeat, "add");
  } else {ErrorToggle(signUpTextPassrepeat, signUpWarningPassrepeat, signUpErrorPassrepeat, "remove")}
});
signUpTextPassrepeat.addEventListener("input", ()=> {
  if (signUpTextPassword.value !== signUpTextPassrepeat.value) {
    ErrorToggle(signUpTextPassrepeat, signUpWarningPassrepeat, signUpErrorPassrepeat, "add");
  } else {ErrorToggle(signUpTextPassrepeat, signUpWarningPassrepeat, signUpErrorPassrepeat, "remove")}
});
                    
function AddModal(modal) {modal.classList.add("modal-show");}
function RemoveModal(modal) {modal.classList.remove("modal-show");}
forgotPasswordBtn.addEventListener("click", ()=> {AddModal(recoveryModal)});
recoveryBackBtn.addEventListener("click", ()=> {RemoveModal(recoveryModal);
  Sleep(1000).then(()=>{ConfirmationToggle(recoveryConfirmationWrap, recoveryText, sendEmailBtn, "remove")})});
signUpBtn.addEventListener("click", ()=> {AddModal(signUpModal)});
signUpBackBtn.addEventListener("click", ()=> {RemoveModal(signUpModal);
  Sleep(1000).then(()=>{ ConfirmationToggle(signUpConfirmationWrap, signUpConfirmationContent, createAccountBtn, "remove")})});

sendEmailBtn.addEventListener("click", ()=> {
  if (!ValidEmail(recoveryEmailText.value)) {
    ErrorToggle(recoveryEmailText, recoveryWarning, recoveryErrorEmail, "add");
  } else {
    ConfirmationToggle(recoveryConfirmationWrap, recoveryText, sendEmailBtn, "add");
    recoveryEmailText.value = "";
  }
});

createAccountBtn.addEventListener("click", ()=> {
  let errorsExist = false;

  if (signUpTextUser.value === "") {ErrorToggle(signUpTextUser, signUpWarningUser, signUpErrorUser, "add"); errorsExist = true} //Placeholder test
  if (!ValidEmail(signUpTextEmail.value)) {ErrorToggle(signUpTextEmail, signUpWarningEmail, signUpErrorEmail, "add"); errorsExist = true}
  if (!ValidPassword(signUpTextPassword.value)) {ErrorToggle(signUpTextPassword, signUpWarningPassword, signUpErrorPassword, "add"); errorsExist = true}
  if (signUpTextPassword.value !== signUpTextPassrepeat.value || signUpTextPassrepeat.value === "") {
    ErrorToggle(signUpTextPassrepeat, signUpWarningPassrepeat, signUpErrorPassrepeat, "add"); errorsExist = true;
  }

  if (!errorsExist) {
    signUpTextUser.value = "";
    signUpTextEmail.value = "";
    signUpTextPassword.value = "";
    signUpTextPassrepeat.value = "";

    if (signUpTextPassword.getAttribute("type") === "text") {
      PasswordViewToggle(signUpTextPassword, signUpShowBtn1);
      PasswordViewToggle(signUpTextPassrepeat, signUpShowBtn2);
    }
  
    ConfirmationToggle(signUpConfirmationWrap, signUpConfirmationContent, createAccountBtn, "add");
  }
});