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
export const photoPopup = document.querySelector("#photo-popup");
export const photoPopupImage = photoPopup.querySelector(".popup__photo-img");
export const photoPopupImageTitle = photoPopup.querySelector(
  ".popup__photo-title"
);

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

// ===== FUNÇÕES DE MODAL =====
export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  resetValidation();
}

function resetValidation() {
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

// ===== EVENTOS =====
export function setEventListeners() {
  editProfileButton.addEventListener("click", () =>
    openPopup(editProfilePopup)
  );
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
}
