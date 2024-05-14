# Users API Spec

## register User API
Endpoint : POST /api/v1/users

Body Request :
```
name: string
email: string
password: string
category: string (UMKM [1] | MAHASISWA [2])
```

Reponse :
```
HTTP Response 201
{
  "status": "success"
  "message": "user telah dibuat"
  "data": {
    "id": int
  }
}
```

## Update User API
Endpoint : PUT /api/v1/users/:user_id

Headers:
- Authorization: token

Body Request :
```
name: string
email: string
password: string
profile: file (base64, jpg)
```

Reponse :
```
HTTP Response 200
{
  "message": "data user telah diubah"
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
      "id": string
      "name": string
      "category": string
      "profile": string (image url)
    },
    {
      "id": string
      "name": string
      "category": string
      "profile": string (image url)
    },
  ]
}
```

## Get User Details API
Endpoint: GET /api/v1/users/:user_id

Response :
- UMKM :
```
HTTP Response 200
{
  status: "success",
  data: {
    "id": string
    "name": string
    "email": string
    "category": string
    "profile": string (image url)
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
    "id": string
    "name": string
    "email": string
    "category": string
    "profile": string (image url)
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
Endpoint : DELETE /api/v1/users/:user_id

Headers:
- Authorization: token

Reponse :
```
HTTP Response 200
{
  "message": "data user telah dihapus"
}
```
