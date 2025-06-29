# Configuration

Laravel Apidoc's flexible configuration allows you to configure it according to your needs. Let's take a look at how you can configure it.

## Configuration File

After installing Laravel Apidoc, you can obtain the configuration file by running the following command, which will be placed in `config/larafly-apidoc.php`:

```sh
php artisan vendor:publish --tag=larafly-apidoc
```

`larafly-apidoc.php` file description:

```php
<?php

return [
    // Project name
    'name' => 'Laravel Apidoc',
    // Access address
    'route' => 'larafly-apidoc',
    // Define rules
    'rules' => [
        'string',
        'email',
        'file',
        'numeric',
        'array',
        'alpha',
        'alpha_dash',
        'alpha_num',
        'date',
        'boolean',
        'distinct',
        'phone',
        'custom'
    ],
    // Custom parameters
    'custom_keys'=>[
        'author'=>env('GENERATOR_AUTHOR','system')
    ]
];
```

Configure `GENERATOR_AUTHOR=Your Name` in the `.env` file to configure the creator.