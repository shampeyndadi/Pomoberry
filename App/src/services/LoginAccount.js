import Api from "../services/Api";

export default {
  async LoginAccount(pomokey) {
    const res = await Api().post("api/account/login", { pomokey });
    return res.data.accountId;
  },
};
