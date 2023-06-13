# RAF News Frontend

## Description

This is the client-side part of our blog application developed using the Vue.js. It is single page application in which I used Vue Router to navigate through the application. To communicate with the backend, I used Axios HTTP client. GET, POST, PUT, and DELETE requests are sent to the backend, which allowed me to fetch and display data, as well as persist changes made by users. JWT is generated on the backend and stored in the frontend. This token is then attached to every subsequent request, allowing the application to grant access. Additionally, Bootstrap is added to make it responsive.

## Structure

This project represents frontend component of a full stack application:
* [Backend](https://github.com/lukamilo99/raf-news-back) <br/>
* [Frontend](https://github.com/lukamilo99/raf-news-front) <br/>

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
