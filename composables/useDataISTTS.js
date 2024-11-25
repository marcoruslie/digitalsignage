export default () => {
  const getPengumuman = async () => {
    try {
      const data = await $fetch("/api/dataISTTS/getPengumuman");
      return data;
    } catch (error) {
      return error;
    }
  };
  const getLowongan = async () => {
    const data = await $fetch("/api/dataISTTS/getLowongan");
    return data;
  };
  const getLaporanBAK = async () => {
    const data = await $fetch("/api/dataISTTS/getLaporanBAK");
    return data;
  };

  const getPosterTA = async (folderId) => {
    let allFiles = [];
    let pageToken = "";

    do {
      const response = await fetchFolderContents(folderId, pageToken);
      allFiles = allFiles.concat(response.files);
      pageToken = response.nextPageToken || "";
    } while (pageToken);

    return allFiles;
  };
  const fetchFolderContents = async (folderId, pageToken = "") => {
    const apiKey = "AIzaSyDuSPCvQji0KMwDlMxFETecWPKy0ckrpDA";
    try {
      const query = encodeURIComponent(`'${folderId}' in parents`);
      const url = `https://www.googleapis.com/drive/v3/files?q=${query}&key=${apiKey}&fields=nextPageToken,files(id,name,mimeType)&pageToken=${pageToken}`;

      return await $fetch(url);
    } catch (error) {
      console.error("Error fetching folder contents:", error);
      return { files: [], nextPageToken: null };
    }
  };
  const dataPosterMhs = async (page) => {
    const folders = await getPosterTA("1cRmvFauuKumDPWt4Wy5olf9gLEybVBeb");
    const startSlice = (page - 1) * 4;
    const endSlice = Math.min(startSlice + 4, folders.length);
    const posterFolder = [];
    for (const folder of folders.slice(startSlice, endSlice)) {
      const files = await getPosterTA(folder.id);
      const posterFile = [];
      for (const file of files.filter(
        (file) =>
          file.mimeType.includes("image/png") ||
          file.mimeType.includes("image/jpeg")
      )) {
        const link = file.id;
        const name = file.name;
        const fileData = {
          foldername: folder.name,
          link,
          name,
        };
        posterFile.push(fileData);
      }
      const folderData = {
        name: folder.name,
        posterFile,
      };
      posterFolder.push(folderData);
    }
    return posterFolder;
  };
  return {
    getLaporanBAK,
    getLowongan,
    getPengumuman,
    dataPosterMhs,
    getPosterTA,
  };
};
