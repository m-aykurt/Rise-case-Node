## The Job Tracker

[![CircleCI](https://img.shields.io/circleci/project/github/contentful/the-example-app.nodejs.svg)](https://circleci.com/gh/contentful/the-example-app.nodejs)


## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/m-aykurt/Rise-case-Node
```
For starting nodeJs services

```bash
cd api
npm install
npm run server
```

For starting frontend

```bash
cd client
npm install
```




```bash
docker run -p 3000:3000 \
  -e CONTENTFUL_SPACE_ID=<SPACE_ID> \
  -e CONTENTFUL_DELIVERY_TOKEN=<DELIVERY_ACCESS_TOKEN> \
  -e CONTENTFUL_PREVIEW_TOKEN=<PREVIEW_ACCESS_TOKEN> \
  -d the-example-app.nodejs
```
