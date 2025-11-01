export class Card {
  constructor(
    { isLiked, _id, name, link, owner },
    cardSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard,
    handleUnlikeCard
  ) {
    this._isLiked = isLiked;
    this._id = _id;
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleUnlikeCard = handleUnlikeCard;
  }

  _createCardElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement = cardElement;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._removeButton = this._cardElement.querySelector(
      ".card__remove-button"
    );
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");

    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }

    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._isLiked) {
        this._handleUnlikeCard(this._id, this._likeButton);
        this._isLiked = false;
      } else {
        this._handleLikeCard(this._id, this._likeButton);
        this._isLiked = true;
      }
    });

    this._removeButton.addEventListener("click", () => {
      this._handleDeleteCard(this._id, this._cardElement);
    });

    this._cardImageEl.addEventListener("click", () =>
      this._handleCardClick(this._link, this._name)
    );
  }

  getCard() {
    this._createCardElement();
    this._setEventListeners();
    return this._cardElement;
  }
}
