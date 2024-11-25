export default defineEventHandler(async (event) => {
  // fetch google drive data
  const data = await $fetch(
    "https://drive.google.com/drive/folders/1cRmvFauuKumDPWt4Wy5olf9gLEybVBeb"
  );
});
