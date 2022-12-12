# Teston-Super-Mare

## Set up

Run `npm i` in both the `teston-super-mare` and `server-side` directories to install node_modules.

## Start up

To start up the front end in development mode, run `npm start` from the `teston-super-mare` directory.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
It should automatically reload the page after code changes and show any lint errors/warnings.

To start up the back end, in another terminal window run `npm start` from the `server-side` directory.
This is also where `console.log` in the server-side code outputs to.

## Configuration

Database credentials are not source controlled. For our back-end to be able to connect to our database
after cloning we need to:

1. Create a file called `.env` in `App/server-side` (this will be ignored per our gitignore file).
2. Define variables called `DB_PASSWORD` and `DB_USERNAME`, each on a newline (an [example](./App/server-side/.env.example))
3. Start as ususal.

If these variables are not defined an exception will be thrown on program startup.

## Account Details for Testing

- Admin: `admin@test.com`: Password: `password`
- Student: `bill@test.com`: Password: `password`
- Lecturer: `stacy@test.ac.uk` Password: `password`
