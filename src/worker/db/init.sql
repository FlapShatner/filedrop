CREATE TABLE expiring_files (
    id TEXT PRIMARY KEY,            -- Unique ID for the download link (e.g., UUID)
    r2_object_key TEXT NOT NULL,    -- Key used to store the file in R2 (can be same as id)
    original_filename TEXT NOT NULL,
    content_type TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    uploaded_at INTEGER NOT NULL,   -- Unix timestamp (seconds)
    expires_at INTEGER NOT NULL     -- Unix timestamp (seconds)
);
CREATE INDEX idx_expires_at ON expiring_files (expires_at); -- For efficient cleanup