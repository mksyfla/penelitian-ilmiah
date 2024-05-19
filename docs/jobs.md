# Users API Spec

## Create Job API
Endpoint : POST /api/v1/jobs

Body Request :
```
"title": "test",
"content": "content",
"deadline": "2024-05-18"
```

Reponse :
```
HTTP Response 201
{
  "status": "success"
  "message": "job berhasil dibuat"
  "data": {
    "id": 1
  }
}
```

## Update Job API
Endpoint : PUT /api/v1/jobs/:jobId

Headers:
- Authorization: token
- Role: UMKM

Body Request :
```
"title": "test update",
"content": "content update",
"deadline": "2024-05-20"
```

Reponse :
```
HTTP Response 200
{
  "message": "data job berhasil diubah"
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
Endpoint: GET /api/v1/users/:jobId

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
Endpoint : DELETE /api/v1/jobs/:jobId

Headers:
- Authorization: token

Reponse :
```
HTTP Response 200
{
  "message": "data job berhasil dihapus"
}
```
