import Api from "../services/Api";

export default {
  async uploadAudioRecording(pomokey, recording, type) {
    const formData = new FormData();
    formData.append("recording", recording);
    formData.append("type", type);

    return Api().post(`api/recording/upload/${pomokey}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
