import Api from "../services/Api";

export default {
  async getAccount(accountId) {
    const response = await Api().get(`api/account/${accountId}`);
    return response;
  },
};
