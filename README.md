## Running the application

(The code should be run inside the `org` folder)
To get the application running, you first need to start the database:
```
docker compose up -d
```
This creates a postgresql database and allows access to admin panel on ```localhost:8080```

Then you need to start both frontend and backend applications with:
```
npm run run-all
```
This runs frontend on port 4200 and backend at 3000.

### Notes
- I had no experience with neither Nest.js nor Angular - this code/codebase is a product of multiple tutorials, meaning the structure of the codebase might not be perfect.
- TESTS. I did not have time to add tests, but I would definitely add some, especially for filtering and creating orders.
- Migrations. I did not have time to add migrations to database but that would be one of the first things in a real development team to learn.
- Indexes. I would add indexes with a migration: GIN index for the description filtering and probably b-tree index for country column.
- I would make more dto-s, right now I return Order entity but that should be a DTO.
- For the human-readable and non-guessable unique id, I just added an uuid field. If this is not readable enough, I would maybe hash the uuid or some columns to a shorter hash_id.
- I would also add packages to get countries and currency codes, so that user could select from a dropdown to not have any typos.
- I would also add a detailed view for the order data: I would like to show less data in the table and then have a detailed view as well.
