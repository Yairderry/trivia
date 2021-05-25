# [Trivia](https://silken-avatar-312712.ey.r.appspot.com)

## Setup & Instructions

1. Clone the [Trivia repository](https://github.com/DGorgula/trivia)

### Setup Database:

2. Create a new MySQL db scheme using mysql or any of mysql client programs

- ex. MySQL Workbench. can be done both on an existing connection and a new one.

3. Navigate to server folder. (from the clone's root folder run 'cd server').
4. Create in the <b>server folder</b> a .env file based on the .env.md file pattern, using your MySQL connection and created scheme:

```javascript
MYSQL_USERNAME = "<MYSQL_USERNAME>"; // The user of the connection - default is 'root'.
MYSQL_PASSWORD = "<MYSQL_PASSWORD>"; //The password of the connection.
MYSQL_HOST = "<MYSQL_HOST>"; //The host of the connection - default is 'localhost' or '127.0.0.1'.
MYSQL_DATABASE = "<MYSQL_DATABASE>"; //The name of the created db scheme.
JWT_CODE = "<JWT_CODE>"; //The base for the JWT Access Token encryption. Should not be empty.
JWT_REFRESH_CODE = "<JWT_REFRESH_CODE>"; //The base for the JWT Refresh Token encryption. Should not be empty.
INSTANCE_CONNECTION_NAME = "<INSTANCE_CONNECTION_NAME>"; //The name of the instance connection if you are wish to upload it to google cloud.
```

- Make sure the .env file does not contain comments!
- Make sure the .env file is included in the .gitignore (should already be).

### Setup Client + Server + Migrate & Seed Database

5. run `npm i` on root dir + run `npm i` on client dir + run `npm run setup` on root dir to load all migrations and seeds + run `npm run start` on root dir

6. In your browser go to [http://localhost:8080/](http://localhost:8080).
