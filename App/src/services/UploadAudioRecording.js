import Api from "../services/Api";

export default {
  async uploadAudioRecording(accountId, recording, type) {
    const formData = new FormData();
    formData.append("recording", recording);
    formData.append("type", type);

    return Api().post(`api/recording/upload/${accountId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
