import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { setEventListeners } from "./utils.js";

// ===== ELEMENTOS =====
const listElement = document.querySelector(".elements__list");

// ===== DADOS INICIAIS =====
const initialCards = [
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

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export function renderCard(item) {
  const card = new Card(item);
  const cardElement = card.generateCard();
  // Adiciona ao DOM
  listElement.prepend(cardElement);
}

// Renderizar catões iniciais
initialCards.forEach((item) => {
  renderCard(item);
});

setEventListeners();

// Habilita a validação
const forms = Array.from(
  document.querySelectorAll(validationSettings.formSelector)
);
forms.forEach((form) => {
  const formValidator = new FormValidator(validationSettings, form);
  formValidator.enableValidation();
});
