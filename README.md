# API REST - BLOG &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

![BLOG](https://github.com/abelpriem/API-Rest-Blog/assets/133054841/d466f05e-90ba-4d0c-b41a-cf0d83ebded8)

> This is a complete, fully functional Rest API to implement on a blogging website. It is capable of creating articles by associating images with them through a file upload system as well as the possibility of listing them through a search engine.

## SUMMARY

`API Rest - Blog`
- [x] Functional API to download and deploy
- [x] Using `MULTER` librery and `FS` package from NodeJS to upload images and associate them with certain articles
- [x] Allowed extensions: .jpg | .jpeg | .png | .gift
- [x] Search for articles by title or content

## MODELS

`ARTICLE`

```yaml
{
  "id" : ObjectId(),
  "title" : {
    type: String,
    unique: true,
    required: true
},
  "content" : {
    type: String,
    required: true
},
  "date": {
    type: Date,
    default: Date.now()
},
  "image": {
    type: String,
    default: default.jpg
  }
}

