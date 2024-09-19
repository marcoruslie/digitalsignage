-- DropForeignKey
ALTER TABLE `Category_For_User` DROP FOREIGN KEY `Category_For_User_cu_cat_id_fkey`;

-- DropForeignKey
ALTER TABLE `Category_For_User` DROP FOREIGN KEY `Category_For_User_cu_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `List_Announcement` DROP FOREIGN KEY `List_Announcement_la_us_username_fkey`;

-- AddForeignKey
ALTER TABLE `Category_For_User` ADD CONSTRAINT `Category_For_User_cu_role_id_fkey` FOREIGN KEY (`cu_role_id`) REFERENCES `Role`(`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category_For_User` ADD CONSTRAINT `Category_For_User_cu_cat_id_fkey` FOREIGN KEY (`cu_cat_id`) REFERENCES `Category`(`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_Announcement` ADD CONSTRAINT `List_Announcement_la_us_username_fkey` FOREIGN KEY (`la_us_username`) REFERENCES `User`(`us_username`) ON DELETE CASCADE ON UPDATE CASCADE;
