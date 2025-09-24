import Card from "./Card.js";
import { setEventListeners } from "./utils.js";

// ===== ELEMENTOS =====
// Profile
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const profileForm = document.querySelector("#profile-form");
const profileNameInput = document.querySelector("#profile-name-input");
const profileAboutInput = document.querySelector("#profile-about-input");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileSubmitButton = profileForm.querySelector(".popup__button");

// Cards
const insertCardButton = document.querySelector(".profile__button-add");
const insertCardPopup = document.querySelector("#insert-card-popup");
const insertCardForm = document.querySelector("#insert-card-form");
const titleCardInput = document.querySelector("#title-card-input");
const linkCardInput = document.querySelector("#link-card-input");
const listElement = document.querySelector(".elements__list");
const insertCardSubmitButton = insertCardForm.querySelector(".popup__button");

// Popup de foto
const photoPopup = document.querySelector("#photo-popup");
const photoPopupImage = photoPopup.querySelector(".popup__photo-img");
const photoPopupImageTitle = photoPopup.querySelector(".popup__photo-title");

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

// Preenche inputs iniciais do perfil
profileNameInput.value = profileName.textContent.trim();
profileAboutInput.value = profileAbout.textContent.trim();

// Renderizar catões iniciais
initialCards.forEach((item) => {
  const card = new Card(item);

  const cardElement = card.generateCard();

  // Adiciona ao DOM
  listElement.prepend(cardElement);
});

setEventListeners();
