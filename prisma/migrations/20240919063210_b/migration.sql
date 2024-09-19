-- DropForeignKey
ALTER TABLE `announcement_in_list` DROP FOREIGN KEY `Announcement_in_List_ail_an_id_fkey`;

-- DropForeignKey
ALTER TABLE `list_in_playlist` DROP FOREIGN KEY `List_in_Playlist_lp_la_id_fkey`;

-- AddForeignKey
ALTER TABLE `List_in_Playlist` ADD CONSTRAINT `List_in_Playlist_lp_la_id_fkey` FOREIGN KEY (`lp_la_id`) REFERENCES `List_Announcement`(`la_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement_in_List` ADD CONSTRAINT `Announcement_in_List_ail_an_id_fkey` FOREIGN KEY (`ail_an_id`) REFERENCES `Announcement`(`an_id`) ON DELETE CASCADE ON UPDATE CASCADE;
