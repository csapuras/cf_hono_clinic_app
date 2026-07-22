CREATE TABLE `department` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.010Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.010Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`title` text NOT NULL,
	`head_id` integer NOT NULL,
	FOREIGN KEY (`head_id`) REFERENCES `employee`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `department_title_unique` ON `department` (`title`);--> statement-breakpoint
CREATE TABLE `access` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.011Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.011Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`title` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `access_title_unique` ON `access` (`title`);--> statement-breakpoint
CREATE TABLE `employee` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.010Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.010Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`hire_date` integer NOT NULL,
	`salary` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`position_id` integer NOT NULL,
	`person_id` integer NOT NULL,
	FOREIGN KEY (`position_id`) REFERENCES `position`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `invoice` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.012Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.012Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`position_id` integer NOT NULL,
	FOREIGN KEY (`position_id`) REFERENCES `appointment`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`position_id`) REFERENCES `discount`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `supplier` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.013Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.013Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`name` text NOT NULL,
	`contact` text NOT NULL,
	`email` text NOT NULL,
	`details` text NOT NULL,
	CONSTRAINT "email" CHECK("supplier"."email" LIKE '%@%.%')
);
--> statement-breakpoint
CREATE UNIQUE INDEX `supplier_email_unique` ON `supplier` (`email`);--> statement-breakpoint
CREATE TABLE `notification` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.013Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.013Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`appointment_id` integer NOT NULL,
	`subject` text NOT NULL,
	`to` text NOT NULL,
	`text` text NOT NULL,
	`html` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`type` text DEFAULT 'email' NOT NULL,
	`scheduled_date` integer DEFAULT '"2026-07-22T06:15:44.013Z"' NOT NULL,
	`sent_date` integer,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointment`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `patient` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.012Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.012Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`person_id` integer NOT NULL,
	`medications` text DEFAULT (json_array()) NOT NULL,
	`allergies` text DEFAULT (json_array()) NOT NULL,
	`medical_history` text DEFAULT (json_array()) NOT NULL,
	`family_history` text DEFAULT (json_array()) NOT NULL,
	FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `position` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.010Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.010Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.013Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.013Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` text NOT NULL,
	`category` text DEFAULT '[]',
	`attributes` text DEFAULT '[]'
);
--> statement-breakpoint
CREATE TABLE `discount` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.012Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.012Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`value` integer NOT NULL,
	`value_type` text DEFAULT 'value' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `discount_name_unique` ON `discount` (`name`);--> statement-breakpoint
CREATE TABLE `appointment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.012Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.012Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`patient_id` integer NOT NULL,
	`appointment_date` integer,
	`details` text,
	`physician_id` integer NOT NULL,
	`type` text DEFAULT 'walk-in' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`referral_details` text,
	FOREIGN KEY (`patient_id`) REFERENCES `patient`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`physician_id`) REFERENCES `employee`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `person` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.010Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.010Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`first_name` text NOT NULL,
	`middle_name` text NOT NULL,
	`last_name` text NOT NULL,
	`suffix` text,
	`address` text NOT NULL,
	`contact` text NOT NULL,
	`gender` text NOT NULL,
	`birth_date` integer NOT NULL,
	CONSTRAINT "email" CHECK("person"."email" LIKE '%@%.%')
);
--> statement-breakpoint
CREATE UNIQUE INDEX `person_email_unique` ON `person` (`email`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.013Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.013Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`employee_id` integer NOT NULL,
	`access_id` integer NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`access_id`) REFERENCES `access`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `inventory` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.014Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.014Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`product_id` integer NOT NULL,
	`supplier_id` integer NOT NULL,
	`salary` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `service` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2026-07-22T06:15:44.014Z"' NOT NULL,
	`created_by` integer NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-22T06:15:44.014Z"' NOT NULL,
	`updated_by` integer NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` text NOT NULL,
	`category` text DEFAULT '[]',
	`products` text DEFAULT '[]'
);
--> statement-breakpoint
DROP TABLE `persons`;