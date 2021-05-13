# General Knowledge Quiz (Backend)

## To get it running:

Rename the

```
example.env
```

file to:

```
.env
```

Run the following command to start a dev server:

```shell
npm run dev
```

To populate the database with some [dummy data](#Dummy-Data) run the following command:

```shell
npm run db:load:test
```

If you already have some data you want to populate the database with you can run the following command

```shell
npm run db:load [pathToFileFromRoot]
```

### Dummy data

The dummy data consists of:

- One user
  - Username: user, Password: Password123
- Three categories
  - KATEGORI1, KATEGORI2, KATEGORI3
- Five questions per category
- Six answers per question
  - One correct answer, five incorrect answers
