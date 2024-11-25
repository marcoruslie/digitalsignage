import { prisma } from "../../db/index";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Start a transaction
    await prisma.$transaction(async (prisma) => {
      // Create list_Announcement
      const createdListAnnouncement = await prisma.list_Announcement.create({
        data: {
          la_content: body.la_content,
          la_title: body.la_title,
          la_cat_id: body.la_cat_id,
          la_us_username: body.la_us_username,
        },
      });
      // Create announcements
      const announcementPromises = body.filteredAnnouncements.map(
        async (announcement) => {
          let downloadFile, createAnnouncement;

          if (
            body.kategoriName === "Pengumuman Kampus" ||
            body.kategoriName.includes("Lowongan")
          ) {
            // Download file from local
            downloadFile = await $fetch("/api/localFile/downloadFile", {
              method: "POST",
              body: {
                url: announcement.an_url,
                kategori: body.kategoriName.replace(" ", ""),
                id: announcement.an_id,
              },
            });
            // Create announcement with the downloaded file path
            createAnnouncement = prisma.announcement.create({
              data: {
                an_id: announcement.an_id,
                an_cat_id: body.la_cat_id,
                an_title: announcement.an_title,
                an_type: announcement.an_type,
                an_url: downloadFile.filePath,
              },
            });
          } else if (
            body.kategoriName === "Pengumuman Kegiatan" ||
            body.kategoriName === "Poster Tugas Akhir"
          ) {
            // Download file from Google Drive
            downloadFile = await $fetch("/api/downloadgd/gdfile", {
              method: "POST",
              body: {
                file_id: announcement.an_url,
                file_kategori: body.kategoriName.replace(" ", ""),
              },
            });

            // Create announcement with the downloaded file path
            createAnnouncement = prisma.announcement.create({
              data: {
                an_id: announcement.an_id,
                an_cat_id: body.la_cat_id,
                an_title: announcement.an_title,
                an_type: announcement.an_type,
                an_url: downloadFile.body.filePath,
              },
            });
          } else {
            // Create announcement without downloading file
            createAnnouncement = prisma.announcement.create({
              data: {
                an_id: announcement.an_id,
                an_cat_id: body.la_cat_id,
                an_title: announcement.an_title,
                an_type: announcement.an_type,
                an_url: announcement.an_url,
              },
            });
          }
          // Return the promise
          return createAnnouncement;
        }
      );
      // Wait for all announcements to be created
      await Promise.all(announcementPromises);
      // Create announcement_in_List
      const announcementInListPromises = body.announcements.map(
        (announcement) =>
          prisma.announcement_in_List.create({
            data: {
              ail_an_id: announcement.an_id,
              ail_la_id: createdListAnnouncement.la_id,
            },
          })
      );
      await Promise.all(announcementInListPromises);
    });
    return {
      statusCode: 200,
      body: {
        message: "List Announcement created successfully",
      },
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: {
        message: e.message,
      },
    };
  }
});
