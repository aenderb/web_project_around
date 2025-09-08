// ===== ELEMENTOS =====
// Profile
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const profileForm = document.querySelector("#profile-form");
const profileNameInput = document.querySelector("#profile-name-input");
const profileAboutInput = document.querySelector("#profile-about-input");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

// Cards
const insertCardButton = document.querySelector(".profile__button-add");
const insertCardPopup = document.querySelector("#insert-card-popup");
const insertCardForm = document.querySelector("#insert-card-form");
const titleCardInput = document.querySelector("#title-card-input");
const linkCardInput = document.querySelector("#link-card-input");
const listElement = document.querySelector(".elements__list");

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

// ===== FUNÇÕES DE MODAL =====
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

// ===== FUNÇOES EXTRAS DE FECHAMENTO DE MODAL
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup.popup_opened");
    if (openedPopup) closePopup(openedPopup);
  }
}

// ===== FUNÇÕES DE FORM =====
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closePopup(editProfilePopup);
}

function handleInsertCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: titleCardInput.value,
    link: linkCardInput.value,
  };
  renderCard(newCard);
  closePopup(insertCardPopup);
  insertCardForm.reset();
}

// ===== FUNÇÃO DE CARDS =====
function renderCard(card) {
  const template = document.querySelector(".cards__template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);

  const img = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");

  img.src = card.link;
  img.alt = card.name;
  title.textContent = card.name;

  // botão like
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (e) => {
      e.target.classList.toggle("card__like-button_active");
    });

  // remover cards
  cardElement
    .querySelector(".card__remove-button")
    .addEventListener("click", () => {
      cardElement.remove();
    });

  // abrir foto no popup
  img.addEventListener("click", () => {
    photoPopupImage.src = card.link;
    photoPopupImage.alt = card.name;
    photoPopupImageTitle.textContent = card.name;

    openPopup(photoPopup);
  });

  listElement.prepend(cardElement);
}

// Renderizar catões iniciais
initialCards.forEach(renderCard);

// ===== EVENTOS =====

editProfileButton.addEventListener("click", () => openPopup(editProfilePopup));
insertCardButton.addEventListener("click", () => openPopup(insertCardPopup));

profileForm.addEventListener("submit", handleProfileFormSubmit);
insertCardForm.addEventListener("submit", handleInsertCardFormSubmit);

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});

document.addEventListener("keydown", handleEscClose);

document.querySelectorAll(".popup__close-button").forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});
