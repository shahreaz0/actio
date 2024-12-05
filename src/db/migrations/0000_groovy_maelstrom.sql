CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`done` integer,
	`createdAt` integer DEFAULT '"2024-12-05T17:14:19.102Z"',
	`updatedAt` integer
);
