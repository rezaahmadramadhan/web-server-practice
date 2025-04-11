# Hacktiv Grocery API Documentation

## Models :

_User_
- email : string, unique (required)
- password : string (required)

_Grocery_
- title : string (required)
- price : integer (required)
- tag : string (required)
- imageUrl : string (required)
- UserId : integer (required)

## Relationship :

>### **One-to-Many**
Perhatikan relasi antara `User`, dan `Grocery` gunakan definisi relasi yang sesuai pada sequelize relation [doc](https://sequelize.org/master/manual/assocs.html#one-to-many-relationships).

## Endpoints :

List of available endpoints:
​
- `POST /register`
- `POST /login`

And routes below need authentication
- `GET /groceries`
- `POST /groceries`


And routes below need authorization
> The request user should be match with grocery.UserId

- `PUT /groceries/:id`
- `DELETE /groceries/:id`

&nbsp;

## 1. POST /register

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
  ​

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /groceries

Description: Get all current logged in user groceries

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_
  ​

```json
[
  {
    "id": 2,
    "title": "Sweet Pepper",
    "price": 21000,
    "tag": "vegetables",
    "imageUrl": "https://www.highmowingseeds.com/media/catalog/product/cache/47e325b677851f562e223168f21f4516/2/7/2769.jpg",
    "UserId": 1
  },
  {
    "id": 4,
    "title": "Spinach",
    "price": 19000,
    "tag": "vegetables",
    "imageUrl": "https://www.highmowingseeds.com/media/catalog/product/cache/47e325b677851f562e223168f21f4516/2/8/2886.jpg",
    "UserId": 1
  },
  ...
]
```

&nbsp;

## 4.  DELETE /groceries/:id

description: 
  Delete one of the current logged in user groceries. (cannot delete another user's groceries)

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Grocery item has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

&nbsp;


## 5. POST /groceries

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:
```json
{
  "title": "California Orange Poppy",
  "price": 30000,
  "tag": "flowers",
  "imageUrl": "https://www.highmowingseeds.com/media/catalog/product/cache/47e325b677851f562e223168f21f4516/7/0/7094.jpg"
}
```

_Response (201 - Created)_

```json
{
  "id": 13,
  "title": "California Orange Poppy",
  "price": 30000,
  "tag": "flowers",
  "imageUrl": "https://www.highmowingseeds.com/media/catalog/product/cache/47e325b677851f562e223168f21f4516/7/0/7094.jpg",
  "UserId": 1
}
```

&nbsp;

## 6. PUT /groceries/:id

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```
- body:
```json
{
  "title": "California Orange Poppy",
  "price": 30000,
  "tag": "flowers",
  "imageUrl": "https://www.highmowingseeds.com/media/catalog/product/cache/47e325b677851f562e223168f21f4516/7/0/7094.jpg"
}
```


_Response (200 - OK)_

```json
{
  "message": "Grocery item has been updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

&nbsp;
## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
