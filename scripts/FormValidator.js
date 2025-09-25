import { renderCard } from "./index.js";
import { closePopup } from "./utils.js";

export class FormValidator {
  constructor(selectors) {
    this._formSelector = selectors.formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
  }

  _showInputError(
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass
  ) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        inputErrorClass,
        errorClass
      );
    } else {
      this._hideInputError(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }

  _setEventListeners(
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  ) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(
          formElement,
          inputElement,
          inputErrorClass,
          errorClass
        );
        this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  }

  // ===== FUNÇÕES DE FORM =====
  handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const profileName = document.querySelector(".profile__name");
    const profileNameInput = document.querySelector("#profile-name-input");
    const profileAbout = document.querySelector(".profile__about");
    const profileAboutInput = document.querySelector("#profile-about-input");
    profileName.textContent = profileNameInput.value;
    profileAbout.textContent = profileAboutInput.value;
    //closePopup(editProfilePopup);
  }

  handleInsertCardFormSubmit(evt) {
    //evt.preventDefault();
    const newCard = {
      name: titleCardInput.value,
      link: linkCardInput.value,
    };
    renderCard(newCard);
    closePopup(insertCardPopup);
    insertCardForm.reset();
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners(
        formElement,
        this._inputSelector,
        this._submitButtonSelector,
        this._inactiveButtonClass,
        this._inputErrorClass,
        this._errorClass
      );
    });
  }
}

// ===== ELEMENTOS =====
//Form  Profile
export const editProfilePopup = document.querySelector("#edit-profile-popup");
export const profileForm = document.querySelector("#profile-form");
export const profileNameInput = document.querySelector("#profile-name-input");
export const profileAboutInput = document.querySelector("#profile-about-input");
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");
export const profileSubmitButton = profileForm.querySelector(".popup__button");

// Form Cards
export const insertCardPopup = document.querySelector("#insert-card-popup");
export const insertCardForm = document.querySelector("#insert-card-form");
export const titleCardInput = document.querySelector("#title-card-input");
export const linkCardInput = document.querySelector("#link-card-input");
export const insertCardSubmitButton =
  insertCardForm.querySelector(".popup__button");

// ===== FUNÇÕES DE FORM =====
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closePopup(editProfilePopup);
}

export function handleInsertCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: titleCardInput.value,
    link: linkCardInput.value,
  };
  renderCard(newCard);
  closePopup(insertCardPopup);
  insertCardForm.reset();
}

export function resetValidation() {
  if (profileForm.id === "profile-form") {
    // volta com valores atuais do perfil
    profileNameInput.value = profileName.textContent.trim();
    profileAboutInput.value = profileAbout.textContent.trim();
    profileSubmitButton.classList.add("popup__button_disabled");
  }

  if (insertCardForm.id === "insert-card-form") {
    // limpa o form de novo card
    insertCardForm.reset();
    insertCardSubmitButton.classList.add("popup__button_disabled");
  }
}
