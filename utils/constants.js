export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// ===== SELETORES =====
export const selectors = {
  profileEditForm: document.forms["profile-form"],
  insertCardForm: document.forms["insert-card-form"],
  updateAvatarForm: document.forms["update-avatar-form"],
  profileEditButton: document.querySelector(".profile__button-edit"),
  addCardButton: document.querySelector(".profile__button-add"),
  updateAvatarButton: document.querySelector(".profile__avatar-update"),
  profileEditPopup: document.querySelector("#edit-profile-popup"),
  addCardPopup: document.querySelector("#insert-card-popup"),
  picturePopup: document.querySelector("#photo-popup"),
  profileTitle: document.querySelector(".profile__name"),
  profileDescription: document.querySelector(".profile__about"),
  profileTitleInput: document.querySelector("#profile-name-input"),
  profileAboutInput: document.querySelector("#profile-about-input"),
  addCardTitleInput: document.querySelector("#title-card-input"),
  addCardUrlInput: document.querySelector("#link-card-input"),
};
