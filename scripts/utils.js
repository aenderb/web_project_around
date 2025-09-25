import {
  handleProfileFormSubmit,
  handleInsertCardFormSubmit,
  profileForm,
  insertCardForm,
  editProfilePopup,
  profileNameInput,
  profileName,
  profileAbout,
  profileAboutInput,
  resetValidation,
  insertCardPopup,
} from "./FormValidator.js";

// ===== ELEMENTOS =====

const editProfileButton = document.querySelector(".profile__button-edit");
const insertCardButton = document.querySelector(".profile__button-add");

// Popup de foto
export const photoPopup = document.querySelector("#photo-popup");
export const photoPopupImage = photoPopup.querySelector(".popup__photo-img");
export const photoPopupImageTitle = photoPopup.querySelector(
  ".popup__photo-title"
);

// ===== FUNÇÕES DE MODAL =====
export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  resetValidation();
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
  editProfileButton.addEventListener("click", () => {
    openPopup(editProfilePopup);
    // Preenche inputs iniciais do perfil
    profileNameInput.value = profileName.textContent.trim();
    profileAboutInput.value = profileAbout.textContent.trim();
  });
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
