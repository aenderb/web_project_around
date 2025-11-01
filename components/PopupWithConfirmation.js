import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._id = "";
    this._cardElement = [];
    this._formElement = this._popupElement.querySelector(".popup__form");
  }

  open(id, cardElement) {
    this._id = id;
    this._cardElement = cardElement;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._id, this._cardElement);
    });
  }
}
