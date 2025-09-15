import Api from "../services/Api";

export default {
  async deleteNote(pomokey, noteId) {
    return Api().delete(`api/notes/${pomokey}/${noteId}`);
  },
};
