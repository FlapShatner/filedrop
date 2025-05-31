CREATE TABLE `expiring_files` (
	`id` text PRIMARY KEY NOT NULL,
	`r2_object_key` text NOT NULL,
	`original_filename` text NOT NULL,
	`content_type` text NOT NULL,
	`size_bytes` integer NOT NULL,
	`uploaded_at` integer NOT NULL,
	`expires_at` integer NOT NULL
);
