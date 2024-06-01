# Users API Spec

## register User API
Endpoint : POST /api/v1/users

Body Request :
```
name: "Muhammad Kasyfil Aziz"
email: "mksyfla@gmail.com"
password: "test"
category: "UMKM"
```

Reponse :
```
HTTP Response 201
{
  "status": "success"
  "message": "user berhasil dibuat"
  "data": {
    "id": 1
  }
}
```

## Update User API
Endpoint : PUT /api/v1/users/:userId

Headers:
- Authorization: token

Body Request :
```
name: "Muhammad Kasyfil Aziz"
email: "kasyfil@gmail.com"
password: "test-123"
profile: file
```

Reponse :
```
HTTP Response 200
{
  "message": "data user berhasil diubah"
}
```

## Get Users API
Endpoint: GET /api/v1/users/

Response :
```
HTTP Response 200
{
  "status": "success",
  "data": [
    {
      "id": 1
      "name": "Muhammad Kasyfil Aziz"
      "category": "UMKM"
      "profile": "http://..."
    },
    {
      "id": 2
      "name": "Muhammad Alfatih"
      "category": "MAHASISWA"
      "profile": "http://..."
    },
  ]
}
```

## Get User Details API
Endpoint: GET /api/v1/users/:userId

Response :
- UMKM :
```
HTTP Response 200
{
  status: "success",
  data: {
    "id": 1
    "name": "Muhammad Kasyfil Aziz"
    "email": "kasyfil@gmail.com"
    "category": "UMKM"
    "profile": "http://..."
    "jobs": [
      {
        "id": string
        "title": string
        "content": string
      },
      {
        "id": string
        "title": string
        "content": string
      }
    ]
  }
}
```
- MAHASISWA :
```
HTTP Response 200
{
  status: "success",
  data: {
    "id": 2
    "name": "Muhammad Alfatih"
    "email": "fatih@gmail.com"
    "category": "MAHASISWA"
    "profile": "http://..."
    "works": [
      {
        "id": string
        "title": string
        "content": string
        "image": string (image url)
      },
      {
        "id": string
        "title": string
        "content": string
        "image": string (image url)
      }
    ]
  }
}
```

## Delete User API
Endpoint : DELETE /api/v1/users/:userId

Headers:
- Authorization: token

Reponse :
```
HTTP Response 200
{
  "message": "data user berhasil dihapus"
}
```