export default class Card {
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

  generateCard() {
    this._element = this._getTemplate();
    //this._setEventListeners();
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__image").alt = this._title;
    this._element.querySelector(".card__title").textContent = this._title;

    return this._element;
  }
}
