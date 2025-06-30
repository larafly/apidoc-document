# Configuration

Laravel Apidoc provides flexible configuration options allowing you to customize it as needed. Below is how you can configure it.

## Configuration File

After installing Laravel Apidoc, you can publish the configuration file by running:

```sh
php artisan vendor:publish --tag=larafly-apidoc
```

This will create the file `config/larafly-apidoc.php`.

Explanation of `larafly-apidoc.php`:

```php
<?php

return [
    // API documentation access route
    'route' => env('API_DOC_ROUTE', 'apidoc'),
    // Date format
    'datetime_format' => 'Y-m-d H:i:s',
    // Author of the API documentation
    'author' => env('GENERATOR_AUTHOR', 'system'),
    // Whether to show documentation in production, default is false
    'is_show' => env('API_DOC_SHOW', false),
];
```

Configure the author in your `.env` file by setting `GENERATOR_AUTHOR=Your Name`.

## Usage in Production Environment

* It is generally not recommended to expose API documentation in production. By default, the documentation is hidden. If you want to display it in production, configure as follows:

1. Set `API_DOC_SHOW=true` in `.env`.
2. Set `API_DOC_ROUTE=apidoc/{token}` in `.env`, where `{token}` is a random string to protect the documentation URL.
