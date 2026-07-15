CREATE TABLE `persons` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT '"2026-07-15T07:46:34.277Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-15T07:46:34.277Z"' NOT NULL,
	CONSTRAINT "email" CHECK("persons"."email" LIKE '%@%.%')
);
--> statement-breakpoint
CREATE UNIQUE INDEX `persons_email_unique` ON `persons` (`email`);