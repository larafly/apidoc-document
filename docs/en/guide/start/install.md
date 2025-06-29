# Installation

If you have PHP and Composer installed, you can install the Laravel installer via Composer:

```bash
composer global require laravel/installer
``` 

## Creating a Laravel Application
After installing PHP, Composer, and the Laravel installer, you can create a new Laravel application. The Laravel installer will prompt you to choose your preferred testing framework, database, and starter kit:
```bash
laravel new example-app
```

Once the application is created, you can use the `dev` Composer script to start the Laravel local development server, queue workers, and Vite development server:
```bash
cd example-app
npm install && npm run build
composer run dev
``` 

Once the development server is started, your application will be accessible in your browser at `http://localhost:8000`. Next, you can update the `.env` configuration file to use your desired database. For example, if using MySQL, you can update the `DB_*` variables in the `.env` file as follows:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
``` 

## Installing Laravel Apidoc
Install via Composer:
```bash
composer require --dev foryoufeng/larafly-apidoc
``` 

Run the following command to install the code generator:
```bash
php artisan generator:install
``` 

Now you can access your application URL `http://localhost:8000/apidoc` to use `Laravel Apidoc`

# UI Interface
After installation, access the link to see the following interface

![Laravel Apidoc](https://generator.pp-lang.tech/ui.png)

![Laravel Apidoc](https://generator.pp-lang.tech/generate.png)