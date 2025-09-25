import {
  openPopup,
  photoPopup,
  photoPopupImageTitle,
  photoPopupImage,
} from "./utils.js";

export class Card {
  constructor(data) {
    this._title = data.name;
    this._description = data.name;
    this._image = data.link;
  }

  _getTemplate() {
    const template = document.querySelector(".cards__template").content;
    const cardElement = template.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // botão like
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", (e) => {
        e.target.classList.toggle("card__like-button_active");
      });

    // remover cards
    this._element
      .querySelector(".card__remove-button")
      .addEventListener("click", () => {
        this._element.remove();
      });

    // abrir foto no popup
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        photoPopupImage.src = this._image;
        photoPopupImage.alt = this._title;
        photoPopupImageTitle.textContent = this._title;

        openPopup(photoPopup);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__image").alt = this._title;
    this._element.querySelector(".card__title").textContent = this._title;

    return this._element;
  }
}
