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

1. Copy the file `.env.example` to `.env` and correct last. [Sure change](https://docs.docker.com/network/) `localhost` to yours real host ip address for work with Docker correctly.
2. Build Docker image for DataBase:

```bash
npm run db:docker:build  
```

3. Build Docker image for App (you have to had an [docker-hub](https://hub.docker.com) profile):

```bash
npm run app:docker:build  
```

3. Build Docker compose App:

```bash
npm run docker:compose:build  
```

4. Build Application localy:

```bash
npm run build  
```

## Migrate database

1. When you build Dockerfile db will create automatically from saved db.sql. You can make it manually for add to container:

```bash
npm run migration:generate:sql
cp src/db/migration/db.sql.schema src/db/pg/db.sql
```

2. You can generate and run migrate script manually if you have any change in db:

```bash
npm run migration:generate
npm run migration:run  
```

## Running application

1. To run App locally at the host (the DataBase must be running firstly):

```bash
npm run db:docker:run
npm start  
```

2. To run App and db from the Docker container separately:

```bash
npm run db:docker:run
npm run app:docker:run  
```

3. To scan vulnerabilities:

```bash
npm install -g snyk
snyk auth # registration token create
npm run db:docker:scan  
npm run app:docker:scan  
```

4. To stop containers and delete its (it needs before to compose start):

```bash
npm run app:docker:stop  
npm run db:docker:stop  
npm run docker:container:prune
```

5. To pull images from [Docker Hub](https://hub.docker.com) (you have to had a [Docker Hub](https://hub.docker.com) profile):

```bash
docker pull valdemarsu/nodejs2024q1-service-db:latest
docker pull valdemarsu/nodejs2024q1-service-app:latest
```

6. To run App and db from the Docker compose interactive:

```bash
npm run docker:compose:up  
```

Press Ctrl+C to stop it.

7. To stop App and db from the Docker compose and delete its:

```bash
npm run docker:compose:down
```

8. To run App and db from the Docker compose like daemon:

```bash
npm run docker:compose:up -- -d
```

9. To run App from the Docker compose for application is restarting upon changes implemented into `src` folder:

```bash
npm run docker:compose:watch  
```

Press Ctrl+C to stop it.

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing [http://127.0.0.1:{PORT}/docs](http://127.0.0.1:4000/docs).

Service listen on PORT `4000` by default, PORT value is stores in `.env` file and can be changes.
For more information about OpenAPI/Swagger please read [documentation](https://swagger.io/).

## Testing (App must be running firstly)

After application running ***[open new terminal](https://gurugenius.ru/kak-otkryt-terminal/)*** and enter:

1. To run all tests without authorization

```bash
npm run test
```

**Hints**

- You can use swagger for test api by [http://127.0.0.1:{PORT}/docs](http://127.0.0.1:4000/docs) URL too.

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
