# Home Library Service

## Prerequisites

- Git - [Download &amp; Install Git](https://git-scm.com/downloads).
- Node.js - [Download &amp; Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:Val-d-emar/nodejs2024Q1-service.git --branch=dev
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

Service listen on PORT `4000` by default, PORT value is stores in `.env` file and can be changes.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running ***[open new terminal](https://gurugenius.ru/kak-otkryt-terminal/)*** and enter:

To run all tests without authorization

```
npm run test
```

**Hints**

* You can use swagger for test api by [http://127.0.0.1:{PORT}/docs](http://127.0.0.1:4000/docs) URL too.

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

* `Users` (`/user` route)

  * `GET /user` - get all users

    - Server answer with `status code` **200** and all users records
  * `GET /user/:id` - get single user by id

    - Server answer with `status code` **200** and record with `id === userId` if it exists
    - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
  * `POST /user` - create user (following DTO be used)
    `CreateUserDto`

    ```typescript
        interface CreateUserDto {
          login: string;
          password: string;
        }
    ```

    - Server answer with `status code` **201** and newly created record if request is valid
    - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  * `PUT /user/:id` - update user's password
    `UpdatePasswordDto` (with attributes):

    ```typescript
    interface UpdatePasswordDto {
      oldPassword: string; // previous password
      newPassword: string; // new password
    }
    ```

    - Server answer with ` status code` **200** and updated record if request is valid
    - Server answer with ` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with ` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - Server answer with ` status code` **403** and corresponding message if `oldPassword` is wrong
  * `DELETE /user/:id` - delete user

    - Server answer with `status code` **204** if the record is found and deleted
    - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
* `Tracks` (`/track` route)

  * `GET /track` - get all tracks
    - Server answer with `status code` **200** and all tracks records
  * `GET /track/:id` - get single track by id
    - Server answer with `status code` **200** and and record with `id === trackId` if it exists
    - Server answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  * `POST /track` - create new track
    - Server answer with `status code` **201** and newly created record if request is valid
    - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  * `PUT /track/:id` - update track info
    - Server answer with ` status code` **200** and updated record if request is valid
    - Server answer with ` status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answer with ` status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  * `DELETE /track/:id` - delete track
    - Server answer with `status code` **204** if the record is found and deleted
    - Server answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
* `Artists` (`/artist` route)

  * `GET /artist` - get all artists
    - Server answer with `status code` **200** and all artists records
  * `GET /artist/:id` - get single artist by id
    - Server answer with `status code` **200** and and record with `id === artistId` if it exists
    - Server answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  * `POST /artist` - create new artist
    - Server answer with `status code` **201** and newly created record if request is valid
    - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  * `PUT /artist/:id` - update artist info
    - Server answer with ` status code` **200** and updated record if request is valid
    - Server answer with ` status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
    - Server answer with ` status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  * `DELETE /artist/:id` - delete album
    - Server answer with `status code` **204** if the record is found and deleted
    - Server answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
* `Albums` (`/album` route)

  * `GET /album` - get all albums
    - Server answer with `status code` **200** and all albums records
  * `GET /album/:id` - get single album by id
    - Server answer with `status code` **200** and and record with `id === albumId` if it exists
    - Server answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  * `POST /album` - create new album
    - Server answer with `status code` **201** and newly created record if request is valid
    - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  * `PUT /album/:id` - update album info
    - Server answer with ` status code` **200** and updated record if request is valid
    - Server answer with ` status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answer with ` status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  * `DELETE /album/:id` - delete album
    - Server answer with `status code` **204** if the record is found and deleted
    - Server answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
* `Favorites`

  * `GET /favs` - get all favorites

    - Server answer with `status code` **200** and all favorite records (**not their ids**), split by entity type:

    ```typescript
    interface FavoritesResponse{
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    }
    ```
  * `POST /favs/track/:id` - add track to the favorites

    - Server answer with `status code` **201** and corresponding message if track with `id === trackId` exists
    - Server answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answer with `status code` **422** and corresponding message if track with `id === trackId` doesn't exist
  * `DELETE /favs/track/:id` - delete track from favorites

    - Server answer with `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
    - Server answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if corresponding track is not favorite
  * `POST /favs/album/:id` - add album to the favorites

    - Server answer with `status code` **201** and corresponding message if album with `id === albumId` exists
    - Server answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answer with `status code` **422** and corresponding message if album with `id === albumId` doesn't exist
  * `DELETE /favs/album/:id` - delete album from favorites

    - Server answer with `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
    - Server answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if corresponding album is not favorite
  * `POST /favs/artist/:id` - add artist to the favorites

    - Server answer with `status code` **201** and corresponding message if artist with `id === artistId` exists
    - Server answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answer with `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist
  * `DELETE /favs/artist/:id` - delete artist from favorites

    - Server answer with `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
    - Server answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if corresponding artist is not favorite

2. For now, these endpoints operate only with **in-memory** (hardcoded) data, in the next tasks we will use a DB for it.
3. An `application/json` format uses for request and response body.
4. `User`'s password excludes from server response.
5. When delete `Artist`, `Album` or `Track`, it's `id` be deleted from favorites (if was there) and references to it in other entities become `null`. For example: `Artist` is deleted => this `artistId` in corresponding `Albums`'s and `Track`'s become `null` + this artist's `id` is deleted from favorites, same logic for `Album` and `Track`.
6. Non-existing entity can't be added to `Favorites`.
7. Incoming requests validate.
