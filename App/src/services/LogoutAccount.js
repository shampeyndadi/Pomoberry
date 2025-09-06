import Api from "../services/Api";

export default {
  async logoutAccount() {
    return Api().post("api/account/logout");
  },
};
