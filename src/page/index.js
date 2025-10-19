// ====== IMPORTAR CLASSES =====
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForms } from "../components/PopupWithForms.js";
import { UserInfo } from "../components/userInfo.js";

// ===== IMPORTAR CONSTANTES =====
import {
  validationSettings,
  initialCards,
  selectors,
} from "../utils/constants.js";

// ===== DESESTRUTURA OBJETO SELECTORS
const {
  profileEditForm,
  insertCardForm,
  profileEditButton,
  addCardButton,
  profileTitleInput,
  profileDescriptionInput,
} = selectors;

// ===== FUNCAO PARA ABRIR POPUP DA IMAGEM
function handleImagePopup(link, name) {
  picturePopupInstance.open({ name, link });
}

// ===== FUNCAO PARA GERAR CARTAO (cria objeto card)
export function generateCard(cardData) {
  const card = new Card(cardData, ".cards__template", handleImagePopup);
  return card.getCard();
}

// ===== CRIA OBJETO SECTION PARA INSERIR ELEMENTO NA PAGINA
const listElement = ".elements__list";
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = generateCard(cardData);

      cardSection.addItem(cardElement);
    },
  },
  listElement
);

// ===== CHAMA METODO DA CLASSE SECTION PARA RENDERIZAR CARTOES NA PAGINA
cardSection.renderItems();

// ===== CRIA OBJETO DA CLASSE PopupWithImage E ADICIONA LISTENER
const picturePopupInstance = new PopupWithImage("#photo-popup");
picturePopupInstance.setEventListeners();

// CRIA OBJETO PARA OBTER INFORMACOES DO USER
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__about",
});

// ===== CRIA OBJETO DA CLASSE PopupWithForms PARA EDITAR PROFILE E CHAMA LISTENER
const profileEditPopupInstance = new PopupWithForms(
  "#edit-profile-popup",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      description: formData.description,
    });
    profileEditPopupInstance.close();
  }
);
profileEditPopupInstance.setEventListeners();

// ===== CRIA OBJETO DA CLASSE PopupWithForms PARA ADICONAR CARTAO E CHAMA LISTENER
const addCardPopupInstance = new PopupWithForms(
  "#insert-card-popup",
  (formData) => {
    const cardElement = generateCard({
      name: formData.title,
      link: formData.link,
    });
    insertFormValidator.disableButton();
    cardSection.addItem(cardElement);
    addCardPopupInstance.close();
  }
);
addCardPopupInstance.setEventListeners();

// ===== FUNCAO PARA MANUSEAR AS INFORMAÇAO DE EDICAO DE PERFIL E ABRIR O FORM
function handleProfileEdit() {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;

  profileFormValidator.resetValidation();
  profileFormValidator.disableButton();
  profileEditPopupInstance.open();
}

// ===== CRIA EVENT LISTNER PARA ABRIR POPUP DE EDITAR PROFILE
profileEditButton.addEventListener("click", handleProfileEdit);

// ===== FUNCAO PARA MANUSEAR AS INFORMAÇAO DE INSERIR CARD E ABRIR O FORM
function handleAddCard() {
  insertFormValidator.resetValidation();
  addCardPopupInstance.open();
}

// ===== CRIA EVENT LISTNER PARA ABRIR POPUP DE ADICIONAR CARTAO
addCardButton.addEventListener("click", handleAddCard);

// ===== CRIA OBJETO DE VALIDACAO DO FORMULARIO DE EDITAR PERFIL
const profileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

// ===== CHAMA METODOS PARA PRIMERA VALIDACAO DO FORM
profileFormValidator.enableValidation();

// ===== CRIA OBJETO DE VALIDACAO DO FORMULARIO DE INSERIR NOVOS CARTOES
const insertFormValidator = new FormValidator(
  validationSettings,
  insertCardForm
);

// ===== CHAMA METODOS PARA PRIMERA VALIDACAO DO FORM
insertFormValidator.enableValidation();
