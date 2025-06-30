# Installation

If PHP and Composer are installed, you can install the Laravel installer globally via Composer:

```sh
composer global require laravel/installer
```

## Create Laravel Application

After installing PHP, Composer, and the Laravel installer, you can create a new Laravel application. The installer will prompt you to select your preferred testing framework, database, and starter kit:

```sh
laravel new example-app
```

Once the application is created, use the `dev` Composer script to start the Laravel local development server, queue workers, and Vite dev server:

```sh
cd example-app
npm install && npm run build
composer run dev
```

After the server starts, your app can be accessed in the browser at `http://localhost:8000`. Next, update the `.env` configuration file to connect to your database. For example, if using MySQL, update the DB\_\* variables in `.env` like so:

```sh
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

## Install Laravel Apidoc

Install via Composer:

```sh
composer require larafly/apidoc
```

Run the following command to install the API documentation tool:

```sh
php artisan apidoc:install
```

You can now access `Laravel Apidoc` at `http://localhost:8000/apidoc`.

# UI Interface

After installation, visiting the URL will show the following interface:

![Laravel Apidoc](/ui.png)
