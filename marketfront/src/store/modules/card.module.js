import axios from "../../config/axios-interceptor";

const card = {
  namespaced: true,
  state: {
    cardsArray: [],
  },
  mutations: {
    SAVE_CARDS(state, response) {
      state.cardsArray = response;
    },
  },
  actions: {
    getCards({ commit }) {
      return axios
        .get(`${process.env.VUE_APP_HTTP_REQUEST}/card`)
        .then((res) => {
          commit("SAVE_CARDS", res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteCard({ dispatch }, idCard) {
      return axios
        .delete(`${process.env.VUE_APP_HTTP_REQUEST}/card/${idCard}`)
        .then(() => {
          // "recharge" la liste des cartes => affichage sans la carte supprimée
          dispatch("getCards");
        })
        .catch((error) => console.error(error));
    },
  },
};

export default card;
