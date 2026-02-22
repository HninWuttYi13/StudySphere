# Database Structure

## User Model

Fields:

- username: String (required, trimmed)
- email: String (required, unique, lowercase)
- password: String (required, hashed)
- createdAt: Date (auto)
- updatedAt: Date (auto)

MongoDB Atlas is used as cloud database.
Connection is handled in:

src/lib/db.ts