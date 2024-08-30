-- DropForeignKey
ALTER TABLE `announcement_in_list` DROP FOREIGN KEY `Announcement_in_List_ail_la_id_fkey`;

-- AddForeignKey
ALTER TABLE `Announcement_in_List` ADD CONSTRAINT `Announcement_in_List_ail_la_id_fkey` FOREIGN KEY (`ail_la_id`) REFERENCES `List_Announcement`(`la_id`) ON DELETE CASCADE ON UPDATE CASCADE;
