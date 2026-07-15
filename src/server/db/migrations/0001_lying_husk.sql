PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_persons` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT '"2026-07-15T07:21:22.979Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-15T07:21:22.979Z"' NOT NULL,
	CONSTRAINT "email" CHECK("__new_persons"."email" LIKE '%@%.%')
);
--> statement-breakpoint
INSERT INTO `__new_persons`("id", "email", "created_at", "updated_at") SELECT "id", "email", "created_at", "updated_at" FROM `persons`;--> statement-breakpoint
DROP TABLE `persons`;--> statement-breakpoint
ALTER TABLE `__new_persons` RENAME TO `persons`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `persons_email_unique` ON `persons` (`email`);