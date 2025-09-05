import Api from "../services/Api";

export default {
  async createAccount(pomokey) {
    return Api().post("api/account", { pomokey });
  },
};
