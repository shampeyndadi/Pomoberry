import Api from "../services/Api";

export default {
  async deleteNote(accountId, noteId) {
    return Api().delete(`api/notes/${accountId}/${noteId}`);
  },
};
