import Api from "../services/Api";

export default {
  async getAccount(pomokey) {
    return Api().get(`api/account/${pomokey}`);
  },
};
