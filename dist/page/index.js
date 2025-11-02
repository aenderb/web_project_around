// ====== IMPORTAR CLASSES =====
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForms } from "../components/PopupWithForms.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";

// ===== IMPORTAR CONSTANTES =====
import { validationSettings, selectors } from "../utils/constants.js";

// ===== DESESTRUTURA OBJETO SELECTORS
const {
  profileEditForm,
  insertCardForm,
  updateAvatarForm,
  profileEditButton,
  addCardButton,
  updateAvatarButton,
  profileTitleInput,
  profileAboutInput,
} = selectors;

let cardSection = "";

// ***** USER

//===== CRIA OBJETO PARA OBTER INFORMACOES DO USER
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

// ===== CHAMA API PARA OBETER DADOS (GET) DE USER E CARDS
api
  .getAppInfo()
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    userInfo.setUserAvatar(userData.avatar);
    renderSection(cardsData);
  })
  .catch((error) => {
    console.log("Erro ao carregar dados da aplicação:", error);
  });

// ===== CRIA OBJETO DA CLASSE PopupWithForms PARA EDITAR PROFILE E CHAMA LISTENER
const profileEditPopupInstance = new PopupWithForms(
  "#edit-profile-popup",
  (formData) => {
    api
      .updateUserInfo(formData)
      .then((updatedUserData) => {
        userInfo.setUserInfo({
          name: updatedUserData.name,
          about: updatedUserData.about,
        });
        profileEditPopupInstance.close();
      })
      .catch((error) => {
        console.log("Erro ao atualizar dados da aplicação:", error);
      });
  }
);
profileEditPopupInstance.setEventListeners();

// ===== FUNCAO PARA MANUSEAR AS INFORMAÇAO DE EDICAO DE PERFIL E ABRIR O FORM
function handleProfileEdit() {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileAboutInput.value = userData.about;

  profileFormValidator.resetValidation();
  profileFormValidator.disableButton();
  profileEditPopupInstance.open();
}

// ===== CRIA EVENT LISTNER PARA ABRIR POPUP DE EDITAR PROFILE
profileEditButton.addEventListener("click", handleProfileEdit);

// ***** CARDS

// ===== FUNCAO PARA GERAR CARTAO (cria objeto card)
export function generateCard(cardData) {
  const card = new Card(
    cardData,
    ".cards__template",
    handleImagePopup,
    handleDeleteCard,
    handleLikeCard,
    handleUnlikeCard
  );
  return card.getCard();
}

// ===== CRIA OBJETO SECTION PARA INSERIR CARD NA PAGINA
function renderSection(initialCards) {
  const listElement = ".elements__list";

  cardSection = new Section(
    {
      items: initialCards,
      renderer: (cardData) => {
        const cardElement = generateCard(cardData);
        cardSection.addItem(cardElement);
      },
    },
    listElement
  );

  cardSection.renderItems();
}

// ===== CRIA OBJETO DA CLASSE PopupWithForms PARA ADICONAR CARTAO E CHAMA LISTENER
const addCardPopupInstance = new PopupWithForms(
  "#insert-card-popup",
  (formData) => {
    api
      .createCard(formData)
      .then((createCardData) => {
        const cardElement = generateCard({
          isLiked: createCardData.isLiked,
          _id: createCardData._id,
          owner: createCardData.owner,
          name: createCardData.name,
          link: createCardData.link,
        });
        insertFormValidator.disableButton();
        cardSection.addItem(cardElement);
        addCardPopupInstance.close();
      })
      .catch((error) => {
        console.log("Erro ao criar cartão:", error);
      });
  }
);
addCardPopupInstance.setEventListeners();

// ===== FUNCAO PARA DELETAR CARD
function handleDeleteCard(id, cardElement) {
  deleteConfirmationPopup.open(id, cardElement);
}

// ===== CRIA OBJETO DA CLASSE PopupWithConfirmation PARA DELETAR CARD E ADICIONA LISTENER
const deleteConfirmationPopup = new PopupWithConfirmation(
  "#confirm-popup",
  (id, cardElement) => {
    api
      .deleteCard(id)
      .then(() => {
        deleteConfirmationPopup.close();
        cardElement.remove();
      })
      .catch((error) => {
        console.log("Erro ao deletar cartão:", error);
      });
  }
);
deleteConfirmationPopup.setEventListeners();

// ===== FUNCAO PARA CURTIR CARD
function handleLikeCard(id, likeButton) {
  api
    .likeCard(id)
    .then(() => {
      likeButton.classList.add("card__like-button_active");
    })
    .catch((error) => {
      console.log("Erro ao curtir cartão:", error);
    });
}

// ===== FUNCAO PARA DAR UNLIKE DE CARD
function handleUnlikeCard(id, likeButton) {
  api
    .unlikeCard(id)
    .then(() => {
      likeButton.classList.remove("card__like-button_active");
    })
    .catch((error) => {
      console.log("Erro ao curtir cartão:", error);
    });
}

// ===== CRIA OBJETO DA CLASSE PopupWithImage E ADICIONA LISTENER
const picturePopupInstance = new PopupWithImage("#photo-popup");
picturePopupInstance.setEventListeners();

// ===== FUNCAO PARA ABRIR POPUP DA IMAGEM
function handleImagePopup(link, name) {
  picturePopupInstance.open({ name, link });
}

// ===== FUNCAO PARA MANUSEAR AS INFORMAÇAO DE INSERIR CARD E ABRIR O FORM
function handleAddCard() {
  insertFormValidator.resetValidation();
  addCardPopupInstance.open();
}

// ===== CRIA EVENT LISTNER PARA ABRIR POPUP DE ADICIONAR CARTAO
addCardButton.addEventListener("click", handleAddCard);

// ***** AVATAR

// ===== CRIA OBJETO DA CLASSE PopupWithForms PARA ATAULIZAR AVATAR E CHAMA LISTENER
const updateAvatarPopupInstance = new PopupWithForms(
  "#update-avatar-popup",
  (formData) => {
    api
      .updateAvatar(formData)
      .then((updatedAvatarData) => {
        userInfo.setUserAvatar(updatedAvatarData.avatar);
        updateAvatarPopupInstance.close();
      })
      .catch((error) => {
        console.log("Erro ao atualizar avatar:", error);
      });
  }
);
updateAvatarPopupInstance.setEventListeners();

// ===== FUNCAO PARA MANUSEAR O UPDATE DE AVATAR E ABRIR O FORM
function handleUpdateAvatar() {
  updateAvatarFormValidator.resetValidation();
  updateAvatarPopupInstance.open();
}

// ===== CRIA EVENT LISTNER PARA ABRIR POPUP DE ADICIONAR CARTAO
updateAvatarButton.addEventListener("click", handleUpdateAvatar);

// ***** VALIDACOES DOS FORMS

// ===== CRIA OBJETO DE VALIDACAO DO FORMULARIO DE EDITAR PERFIL
const profileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
profileFormValidator.enableValidation();

// ===== CRIA OBJETO DE VALIDACAO DO FORMULARIO DE INSERIR NOVOS CARTOES
const insertFormValidator = new FormValidator(
  validationSettings,
  insertCardForm
);
insertFormValidator.enableValidation();

// ===== CRIA OBJETO DE VALIDACAO DO FORMULARIO DE ATUALIZAR AVATAR
const updateAvatarFormValidator = new FormValidator(
  validationSettings,
  updateAvatarForm
);
updateAvatarFormValidator.enableValidation();
