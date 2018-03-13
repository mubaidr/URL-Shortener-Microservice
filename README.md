# URL-Shortener-Microservice

[![Greenkeeper badge](https://badges.greenkeeper.io/mubaidr/URL-Shortener-Microservice.svg)](https://greenkeeper.io/)

## What is this?

Open URL Shortner is a service which shortens the provided URL.

### How to use this?

#### Form

Enter url in field above and get your short URL.

#### API

Send a post request to the api endpoint with query paramter "url" containing the orignal URL; like 

https://url-shortener-mubaidr.herokuapp.com/api?url=https://www.google.com.pk 

and it will return an JSON object containing short URL:

{ url: "https://www.google.com.pk", short: "https://url-shortener-mubaidr.herokuapp.com/aBcCdD" }

### How does it work?

Nodejs, Expressjs and mongoDB

#### Special thanks to:
mlab for monogoDB hosting
heroku for nodejs hosting


*Designed and Coded by mubaidr*
