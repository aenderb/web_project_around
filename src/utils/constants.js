export const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
];

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
  profileEditButton: document.querySelector(".profile__button-edit"),
  addCardButton: document.querySelector(".profile__button-add"),
  profileEditPopup: document.querySelector("#edit-profile-popup"),
  addCardPopup: document.querySelector("#insert-card-popup"),
  picturePopup: document.querySelector("#photo-popup"),
  profileTitle: document.querySelector(".profile__name"),
  profileDescription: document.querySelector(".profile__about"),
  profileTitleInput: document.querySelector("#profile-name-input"),
  profileDescriptionInput: document.querySelector("#profile-about-input"),
  addCardTitleInput: document.querySelector("#title-card-input"),
  addCardUrlInput: document.querySelector("#link-card-input"),
};
