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
- The token is stored in httpOnly Cookie
- The token includes the user id in payload
- The access token and refresh token are created.
- The refresh token is used to generate a new access token via the /refresh route.
- The access token expires after 15 minutes and refresh token will help to generate new access token wit the help of /refresh route
- Refresh tokens are stored in the database.
- On logout, refresh tokens are removed from the database.
- Access tokens expire in 15 minutes.
- Refresh tokens expire in 7 days.
- add protect route 
### Success Register(201)
``` {
  "_id": "699aff1a6fdea9bb89c4d29f",
  "username": "john",
  "email": "john@example.com"
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
### Logout
POST /api/auth/logout
### Refresh
POST /api/auth/refresh
### Description
Generates a new access token using a valid refresh token stored in httpOnly cookie.
#### Success (200)
Returns new access token in httpOnly cookie.
#### Error
- 401 – No refresh token provided
- 403 – Invalid or expired refresh token