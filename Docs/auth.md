# Authentication Documentation
## Register
 POST api/auth/register
### body
{
  "username": "john",
  "email": "john@example.com",
  "password": "123456"
}
### validations
- All fields required
- Password minimum 6 characters
- Email must be valid
- Email must be unique

### Security:

- Passwords are securely hashed using bcrypt before being stored in the database.
- Password is not returned in response
- A JWT access token is generated successfully upon on register and login
- The token includes the user id in payload
- The token expires 7 days
### Success Register(201)
``` {
  "_id": "699aff1a6fdea9bb89c4d29f",
  "username": "john",
  "email": "john@example.com",
  "token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
### Error Response(400)
```{
  "msg": "Email already exists"
}
```
### Register
POST /api/auth/register
### Login
POST /api/auth/login