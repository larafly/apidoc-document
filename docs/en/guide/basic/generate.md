# API Generation

After defining your API, you can generate the corresponding documentation via the command line.

* Before generating documentation, make sure you have set `GENERATOR_AUTHOR={Your Name}` in the `.env` file.

### Generation Commands

1. Write documentation to the database. Run the following command:

```shell
php artisan apidoc
```

After generation, visit `http://localhost/apidoc` to view the documentation.
If the generated result is incorrect, check whether the API configuration is properly defined.

2. Write documentation to a `markdown` file. Run the following command:

```shell
php artisan apidoc:md
```

After generation, go to `storage/app/public/apidoc` to view the generated documentation files.
