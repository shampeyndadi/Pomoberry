import Api from "../services/Api";

export default {
  async createNote(accountId, content) {
    return Api().post(`api/notes/${accountId}`, { content });
  },
};
