// ===== ELEMENTOS =====
// Profile
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileForm = document.querySelector("#profile-form");
const profileNameInput = document.querySelector("#profile-name-input");
const profileAboutInput = document.querySelector("#profile-about-input");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

// Cards
const insertCardButton = document.querySelector(".profile__button-add");
const insertCardModal = document.querySelector("#insert-card-modal");
const insertCardForm = document.querySelector("#insert-card-form");
const titleCardInput = document.querySelector("#title-card-input");
const linkCardInput = document.querySelector("#link-card-input");
const listElement = document.querySelector(".elements__list");

// Modal de foto
const photoModal = document.querySelector("#photo-modal");
const photoModalImage = photoModal.querySelector(".modal__photo-img");

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
function openModal(modalElement) {
  modalElement.classList.add("modal_opened");
}

function closeModal(modalElement) {
  modalElement.classList.remove("modal_opened");
}

// ===== FUNÇOES EXTRAS DE FECHAMENTO DE MODAL
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_opened");
    if (openedModal) closeModal(openedModal);
  }
}

// ===== FUNÇÕES DE FORM =====
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closeModal(editProfileModal);
}

function handleInsertCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: titleCardInput.value,
    link: linkCardInput.value,
  };
  renderCard(newCard);
  closeModal(insertCardModal);
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

  // abrir foto no modal
  img.addEventListener("click", () => {
    photoModalImage.src = card.link;
    photoModalImage.alt = card.name;
    openModal(photoModal);
  });

  listElement.prepend(cardElement);
}

// Renderizar catões iniciais
initialCards.forEach(renderCard);

// ===== EVENTOS =====

editProfileButton.addEventListener("click", () => openModal(editProfileModal));
insertCardButton.addEventListener("click", () => openModal(insertCardModal));

profileForm.addEventListener("submit", handleProfileFormSubmit);
insertCardForm.addEventListener("submit", handleInsertCardFormSubmit);

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", handleOverlayClick);
});

document.addEventListener("keydown", handleEscClose);

document.querySelectorAll(".modal__close-button").forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    closeModal(evt.target.closest(".modal"));
  });
});
