# Home Library Service

## Prerequisites

- Git - [Download &amp; Install Git](https://git-scm.com/downloads).
- Node.js - [Download &amp; Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone git@github.com:Val-d-emar/nodejs2024Q1-service.git --branch=dev2
```

## Installing NPM modules

```bash
cd nodejs2024Q1-service
npm install
```

## Installing Docker

For Linux way:

- If you have had any different containers you may need to delete it firstly:

```bash
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; \  
do sudo apt-get remove $pkg; \  
done  
```

- And then install Docker something like this:

```bash
sudo apt-get install ca-certificates curl  
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc  
sudo chmod a+r /etc/apt/keyrings/docker.asc  
sudo install -m 0755 -d /etc/apt/keyrings  
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \  
https://download.docker.com/linux/debian $(. /etc/os-release && echo \  
"$VERSION_CODENAME") stable" |  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null  
sudo apt-get update  
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin  
# to check install try run:  
sudo docker run hello-world  
```

- To install to the anoter OS please read the [official documentation](https://docs.docker.com/get-docker/) anyway.

## Building application

1. Copy the file `.env.example` to `.env` and correct last. [Sure change](https://docs.docker.com/network/) `0.0.0.0` to yours real host ip address for work with Docker correctly and save line `APP_NAME=nodejs2024q1-service` for using my dockerhub repositories.
2. Build Docker image for DataBase:

```bash
npm run db:docker:build  
```

## Running application

* To run App locally at the host (the DataBase must be running firstly):

```bash
npm run db:docker:run
npm start  
```

## Testing (App must be running firstly)

After application running ***[open new terminal](https://gurugenius.ru/kak-otkryt-terminal/)*** and enter:

* To run all tests without authorization

```bash
npm run test:auth
```

**Hints**

- You can use swagger for test api by [http://127.0.0.1:{PORT}/docs](http://127.0.0.1:4000/docs) URL too.
- Service listen on PORT `4000` by default, PORT value is stores in `.env` file and can be changes.
  For more information about OpenAPI/Swagger please read [documentation](https://swagger.io/).

# **The application API operate with the following resources:**

- `User` (with attributes):

  ```typescript
  interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
  }
  ```
- `Artist` (with attributes):

  ```typescript
  interface Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
  }
  ```
- `Track` (with attributes):

  ```typescript
  interface Track {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
  }
  ```
- `Album` (with attributes):

  ```typescript
  interface Album {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
  }
  ```
- `Favorites` (with attributes):

  ```typescript
  interface Favorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
  }
  ```

**Details:**

1. For `Users`, `Artists`, `Albums`, `Tracks` and `Favorites` REST endpoints with separate router paths created

- `Users` (`/user` route)

  - `GET /user` - get all users

    - Server answer with `status code` **200** and all users records
  - `GET /user/:id` - get single user by id

    - Server answer with `status code` **200** and record with `id === userId` if it exists
    - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - `POST /user` - create user (following DTO be used)
    `CreateUserDto`

    ```typescript
        interface CreateUserDto {
          login: string;
          password: string;
        }
    ```

    - Server answer with `status code` **201** and newly created record if request is valid
    - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /user/:id` - update user's password
    `UpdatePasswordDto` (with attributes):

    ```typescript
    interface UpdatePasswordDto {
      oldPassword: string; // previous password
      newPassword: string; // new password
    }
    ```

    - Server answer with `status code` **200** and updated record if request is valid
    - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - Server answer with `status code` **403** and corresponding message if `oldPassword` is wrong
  - `DELETE /user/:id` - delete user

    - Server answer with `status code` **204** if the record is found and deleted
    - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- `Tracks` (`/track` route)

  - `GET /track` - get all tracks
    - Server answer with `status code` **200** and all tracks records
  - `GET /track/:id` - get single track by id
    - Server answer with `status code` **200** and and record with `id === trackId` if it exists
    - Server answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  - `POST /track` - create new track
    - Server answer with `status code` **201** and newly created record if request is valid
    - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /track/:id` - update track info
    - Server answer with `status code` **200** and updated record if request is valid
    - Server answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  - `DELETE /track/:id` - delete track
    - Server answer with `status code` **204** if the record is found and deleted
    - Server answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
- `Artists` (`/artist` route)

  - `GET /artist` - get all artists
    - Server answer with `status code` **200** and all artists records
  - `GET /artist/:id` - get single artist by id
    - Server answer with `status code` **200** and and record with `id === artistId` if it exists
    - Server answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  - `POST /artist` - create new artist
    - Server answer with `status code` **201** and newly created record if request is valid
    - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /artist/:id` - update artist info
    - Server answer with `status code` **200** and updated record if request is valid
    - Server answer with `status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  - `DELETE /artist/:id` - delete album
    - Server answer with `status code` **204** if the record is found and deleted
    - Server answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
- `Albums` (`/album` route)

  - `GET /album` - get all albums
    - Server answer with `status code` **200** and all albums records
  - `GET /album/:id` - get single album by id
    - Server answer with `status code` **200** and and record with `id === albumId` if it exists
    - Server answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  - `POST /album` - create new album
    - Server answer with `status code` **201** and newly created record if request is valid
    - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /album/:id` - update album info
    - Server answer with `status code` **200** and updated record if request is valid
    - Server answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  - `DELETE /album/:id` - delete album
    - Server answer with `status code` **204** if the record is found and deleted
    - Server answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
- `Favorites`

  - `GET /favs` - get all favorites

    - Server answer with `status code` **200** and all favorite records (**not their ids**), split by entity type:

    ```typescript
    interface FavoritesResponse{
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    }
    ```
  - `POST /favs/track/:id` - add track to the favorites

    - Server answer with `status code` **201** and corresponding message if track with `id === trackId` exists
    - Server answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answer with `status code` **422** and corresponding message if track with `id === trackId` doesn't exist
  - `DELETE /favs/track/:id` - delete track from favorites

    - Server answer with `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
    - Server answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if corresponding track is not favorite
  - `POST /favs/album/:id` - add album to the favorites

    - Server answer with `status code` **201** and corresponding message if album with `id === albumId` exists
    - Server answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answer with `status code` **422** and corresponding message if album with `id === albumId` doesn't exist
  - `DELETE /favs/album/:id` - delete album from favorites

    - Server answer with `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
    - Server answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if corresponding album is not favorite
  - `POST /favs/artist/:id` - add artist to the favorites

    - Server answer with `status code` **201** and corresponding message if artist with `id === artistId` exists
    - Server answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answer with `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist
  - `DELETE /favs/artist/:id` - delete artist from favorites

    - Server answer with `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
    - Server answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if corresponding artist is not favorite

2. For now, these endpoints operate only with Postgres DB.
3. An `application/json` format uses for request and response body.
4. `User`'s password excludes from server response.
5. When delete `Artist`, `Album` or `Track`, it's `id` be deleted from favorites (if was there) and references to it in other entities become `null`. For example: `Artist` is deleted => this `artistId` in corresponding `Albums`'s and `Track`'s become `null` + this artist's `id` is deleted from favorites, same logic for `Album` and `Track`.
6. Non-existing entity can't be added to `Favorites`.
7. Incoming requests validate.
8. Authentication and Authorization Endpoints

* `Signup` (`auth/signup` route)
  * `POST auth/signup` - send `login` and `password` to create a new `user`
    - Server should answer with `status code` **201** and corresponding message if dto is valid
    - Server should answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
* `Login` (`auth/login` route)
  * `POST auth/login` - send `login` and `password` to get Access token and Refresh token (optionally)
    - Server should answer with `status code` **200** and tokens if dto is valid
    - Server should answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
    - Server should answer with `status code` **403** and corresponding message if authentication failed (no user with such `login`, `password` doesn't match actual one, etc.)
* `Refresh` (`auth/refresh` route)
  * `POST auth/refresh` - send refresh token in body as `{ refreshToken }` to get new pair of Access token and Refresh token
    - Server should answer with `status code` **200** and tokens in body if dto is valid
    - Server should answer with `status code` **401** and corresponding message if dto is invalid (no `refreshToken` in body)
    - Server should answer with `status code` **403** and corresponding message if authentication failed (Refresh token is invalid or expired)

9. Once **POST** `/auth/signup` accepts `password` property, it is replaced with **hash** for password encryption, doesn't save raw passwords in database.
10. **JWT** Access token should contain `userId` and `login` in a **payload** and has expiration time (expiration time of Refresh token should be longer, than Access token).
11. The **JWT** Access token add in HTTP `Authorization` header to all requests that requires authentication. Proxy all the requests (except `auth/signup`, `auth/login`, `/doc`, `/`) and check that HTTP `Authorization` header has the correct value of **JWT** Access token.
    HTTP authentication follow `Bearer` scheme:

```
  Authorization: Bearer <jwt_token>
```

12. In case of the HTTP `Authorization` header in the request is absent or invalid or doesn’t follow `Bearer` scheme or Access token has expired, further router method execution should be stopped and lead to response with HTTP **401** code and the corresponding error message.
13. Secrets used for signing the tokens are stored in `.env` file.

### `bcrypt` installation issues:

#### If you see an error that starts with:

```console
gyp ERR! stack Error: "pre" versions of node cannot be installed, use the --nodedir flag instead
```

Please check [compatibility between Node.JS and Bcrypt versions](https://www.npmjs.com/package/bcrypt#version-compatibility).

#### If you face an error like this:

```console
node-pre-gyp ERR! Tried to download(404): https://github.com/kelektiv/node.bcrypt.js/releases/download/v1.0.2/bcrypt_lib-v1.0.2-node-v48-linux-x64.tar.gz
```

Make sure you have the appropriate dependencies installed and configured for your platform. You can find installation instructions for the dependencies for some common platforms in [this page](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions).
