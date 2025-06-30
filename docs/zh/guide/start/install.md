# 安装

若已安装 PHP 和 Composer，可通过 Composer 安装 Laravel 安装器：
```sh
composer global require laravel/installer
```

## 创建Laravel应用

安装 PHP、Composer 和 Laravel 安装器后，您即可创建新 Laravel 应用。Laravel 安装器将提示您选择偏好的测试框架、数据库及入门套件：
```sh
laravel new example-app
```

应用创建完成后，可使用 `dev` Composer 脚本启动 Laravel 本地开发服务器、队列工作进程及 Vite 开发服务器：
```sh
cd example-app
npm install && npm run build
composer run dev
```

开发服务器启动后，您的应用可在浏览器中通过 `http://localhost:8000` 访问。接下来可更新 .env 配置文件以使用相应数据库。例如，若使用 MySQL，可如此更新 .env 文件中的 DB_* 变量
```sh
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```
## 安装Laravel Apidoc

通过 Composer 进行安装
```sh
composer require larafly/apidoc
```

运行如下命令来安装接口文档工具

```sh
php artisan apidoc:install
```

现在你可以访问您的应用url`http://localhost:8000/apidoc` 来使用`Laravel Apidoc`了

# UI界面

安装完成后，访问链接即可见到如下界面

![Laravel Apidoc](/ui.png)
