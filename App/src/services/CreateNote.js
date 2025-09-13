import Api from "../services/Api";

export default {
  async createNote(pomokey, content) {
    return Api().post(`api/notes/${pomokey}`, { content });
  },
};
