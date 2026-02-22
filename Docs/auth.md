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

- Password is hashed using bcrypt
- Password is not returned in response