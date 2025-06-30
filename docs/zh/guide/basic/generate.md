# 接口生成

定义好接口后，可通过命令行来生成相关的接口文档

* 生成文档前，请确保您在`.env`中配置好了`GENERATOR_AUTHOR={您的名字}`

### 生成命令

1. 文档写入数据库,运行如下命令

```shell
php artisan apidoc
```

生成完毕后,访问`http://localhost/apidoc` 即可看到生成的文档，如生成的有问题，可检查相关接口配置是否定义好


2. 文档写入`markdown`文件中,可运行如下命令

```shell
php artisan apidoc:md
```

生成完毕后,访问`storage/app/public/apidoc` 即可看到生成的文档文件