const editProfileButton = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeModalButton = editProfileModal.querySelector(".modal__close-button");
const profileForm = document.querySelector("#profile-form");
const profileNameInput = document.querySelector("#profile-name-input");
const profileAboutInput = document.querySelector("#profile-about-input");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const listElement = document.querySelector(".elements__list");

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

profileNameInput.value = profileName.textContent.trim();
profileAboutInput.value = profileAbout.textContent.trim();

function openModal() {
  editProfileModal.classList.add("modal_opened");
}

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closeModal();
}

function handleCreateCard(card) {
  const template = document.querySelector(".cards__template").content;

  // clona o conteúdo do template
  const cardElement = template.querySelector(".card").cloneNode(true);

  // busca os elementos internos do clone
  const img = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");

  // preenche os dados
  img.src = card.link;
  img.alt = card.name;
  title.textContent = card.name;

  const likeButtons = cardElement.querySelector(".card__like-button");
  likeButtons.addEventListener("click", () => {
    likeButtons.classList.toggle("card__like-button_active");
  });

  listElement.prepend(cardElement);
}

function renderCards(cards) {
  cards.forEach((card) => {
    handleCreateCard(card);
  });
}

renderCards(initialCards);

editProfileButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);
