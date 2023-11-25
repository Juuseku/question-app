# Project 2: Question app

Question app

Application is meant to give users chance to answer questions from other users. Questions are from topics that are set by admin. Questions have answer options that are also created by users.
Registration and login is needed to use the application. Password is hashed using bcrypt. Only authenticated users are able to use the quiz mode and create new questions.

# Database

Current database is based on render.com but it will not be accessible from 06.12.2023 onwards.
When ran locally, database can be accessed from bash terminal with "docker exec -it database-p2-2db79fcf-0944-4cf0-979a-df47388d9b83 psql -U username database"

# Testing

10 tests are available. 9 e2e-playwright tests that can be ran from bash terminal with command "docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf"
1 Deno test that can be ran from terminal using "docker-compose run --rm drill-and-practice deno test --allow-all ./tests/httpTesting.js" NOTE: This can be only done when there is actually questions in the database, so don't try to run this immediately after e2e-playwright tests since that empties the local database.

# Running the application

Appication can be used locally by navigating to root folder and using "docker-compose up". This should open the connection to http://localhost:7777
Application is now live in site: 
