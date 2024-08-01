-- CreateTable
CREATE TABLE `User` (
    `us_username` VARCHAR(191) NOT NULL,
    `us_password` VARCHAR(191) NOT NULL,
    `us_role_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`us_username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `role_id` VARCHAR(191) NOT NULL,
    `role_name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `cat_id` VARCHAR(191) NOT NULL,
    `cat_name` VARCHAR(191) NOT NULL,
    `cat_qty` INTEGER NOT NULL,
    `cat_duration` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category_For_User` (
    `cu_id` VARCHAR(191) NOT NULL,
    `cu_cat_id` VARCHAR(191) NOT NULL,
    `cu_role_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`cu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `List_Announcement` (
    `la_id` VARCHAR(191) NOT NULL,
    `la_title` VARCHAR(191) NOT NULL,
    `la_content` VARCHAR(191) NOT NULL,
    `la_cat_id` VARCHAR(191) NOT NULL,
    `la_us_username` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`la_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Playlist` (
    `pl_id` VARCHAR(191) NOT NULL,
    `pl_name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`pl_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Playlist_in_Screen` (
    `ps_id` VARCHAR(191) NOT NULL,
    `ps_sc_id` VARCHAR(191) NOT NULL,
    `ps_pl_id` VARCHAR(191) NOT NULL,
    `ps_date_start` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`ps_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `List_in_Playlist` (
    `lp_id` VARCHAR(191) NOT NULL,
    `lp_pl_id` VARCHAR(191) NOT NULL,
    `lp_la_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`lp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement_in_List` (
    `ail_id` VARCHAR(191) NOT NULL,
    `ail_an_id` VARCHAR(191) NOT NULL,
    `ail_la_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`ail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement` (
    `an_id` VARCHAR(191) NOT NULL,
    `an_title` VARCHAR(191) NOT NULL,
    `an_url` VARCHAR(191) NOT NULL,
    `an_type` VARCHAR(191) NOT NULL,
    `an_cat_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`an_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Screen` (
    `sc_id` VARCHAR(191) NOT NULL,
    `sc_ip` VARCHAR(191) NOT NULL,
    `sc_location` VARCHAR(191) NOT NULL,
    `sc_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_us_role_id_fkey` FOREIGN KEY (`us_role_id`) REFERENCES `Role`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category_For_User` ADD CONSTRAINT `Category_For_User_cu_role_id_fkey` FOREIGN KEY (`cu_role_id`) REFERENCES `Role`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category_For_User` ADD CONSTRAINT `Category_For_User_cu_cat_id_fkey` FOREIGN KEY (`cu_cat_id`) REFERENCES `Category`(`cat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_Announcement` ADD CONSTRAINT `List_Announcement_la_cat_id_fkey` FOREIGN KEY (`la_cat_id`) REFERENCES `Category`(`cat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_Announcement` ADD CONSTRAINT `List_Announcement_la_us_username_fkey` FOREIGN KEY (`la_us_username`) REFERENCES `User`(`us_username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Playlist_in_Screen` ADD CONSTRAINT `Playlist_in_Screen_ps_sc_id_fkey` FOREIGN KEY (`ps_sc_id`) REFERENCES `Screen`(`sc_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Playlist_in_Screen` ADD CONSTRAINT `Playlist_in_Screen_ps_pl_id_fkey` FOREIGN KEY (`ps_pl_id`) REFERENCES `Playlist`(`pl_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_in_Playlist` ADD CONSTRAINT `List_in_Playlist_lp_pl_id_fkey` FOREIGN KEY (`lp_pl_id`) REFERENCES `Playlist`(`pl_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_in_Playlist` ADD CONSTRAINT `List_in_Playlist_lp_la_id_fkey` FOREIGN KEY (`lp_la_id`) REFERENCES `List_Announcement`(`la_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement_in_List` ADD CONSTRAINT `Announcement_in_List_ail_an_id_fkey` FOREIGN KEY (`ail_an_id`) REFERENCES `Announcement`(`an_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement_in_List` ADD CONSTRAINT `Announcement_in_List_ail_la_id_fkey` FOREIGN KEY (`ail_la_id`) REFERENCES `List_Announcement`(`la_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_an_cat_id_fkey` FOREIGN KEY (`an_cat_id`) REFERENCES `Category`(`cat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
