export default () => {
  const sendMessage = async (data, ip) => {
    console.log(data);
    try {
      const result = await $fetch("/api/sendMessage", {
        method: "POST",
        body: {
          message: data,
          ip: ip,
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  };
  const getCLient = async () => {
    try {
      const result = await $fetch("/api/getConnectedClient", {
        cache: "no-store",
      });
      return result;
    } catch (error) {
      return error.message;
    }
  };
  const getMusicClient = async () => {
    try {
      const result = await $fetch("/api/getConnectedClientMusicId", {
        cache: "no-store",
      });
      return result;
    } catch (error) {
      return error.message;
    }
  };
  const getReminderClient = async () => {
    try {
      const result = await $fetch("/api/getConnectedClientReminder", {
        cache: "no-store",
      });
      return result;
    } catch (error) {
      return error.message;
    }
  };
  const refreshConnectedClient = async () => {
    try {
      const result = await $fetch("/api/refreshClient");
      return result;
    } catch (error) {
      return error;
    }
  };
  const sendData = async (data) => {
    try {
      const result = await $fetch("/api/sendData", {
        method: "POST",
        body: {
          dataType: data.dataType,
          playlist: data.playlist,
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  };
  return {
    sendMessage,
    refreshConnectedClient,
    getCLient,
    sendData,
    getMusicClient,
    getReminderClient,
  };
};
