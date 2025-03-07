## Running the application

To get the application running, you first need to start the database:

```
docker compose up -d
```

This creates a postgresql database and allows access to admin panel on ```localhost:8080```

Then you need to start both frontend and backend applications with:

```
npm install
npm run run-all
```

This runs frontend on port 4200 and backend at 3000.

### Notes

- I had no experience with neither Nest.js nor Angular - this code/codebase is a product of multiple tutorials, meaning the structure of the codebase might not be perfect.
- A lot of the tutorials for Angular and Nest.js apps used monorepo, so I also wanted to try that. It might not be feasible in a bigger project, but it was fun to learn.
- TESTS. I did not have time to add tests, but I would definitely add some, especially for filtering and creating orders.
- Migrations. I did not have time to add migrations to database but that would be one of the first things in a real development team to implement.
- Indexes. I would add indexes with a migration: GIN index for the description filtering and probably b-tree index for country column.
- For the human-readable and non-guessable unique id, I just added an uuid field. If this is not readable enough, I would maybe shorten it or try to make 3 word identifiers (like https://what3words.com).
- I would also add packages to get countries and currency codes, so that user could select from a dropdown to not have any typos.
- I would also add a detailed view for the order data: I would like to show less data in the table and then have a detailed view as well.
