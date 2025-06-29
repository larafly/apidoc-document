# 配置

Laravel Apidoc 灵活的配置允许您根据自己的需要进行相应的配置，下面来看看您可以如何进行配置


## 配置文件

安装完Laravel Apidoc后，您可以通过运行如下命令来获取配置文件,将会放到`config/larafly-apidoc.php`
```sh
php artisan vendor:publish --tag=larafly-apidoc
```

`larafly-apidoc.php` 文件说明

```php

<?php

return [
    # 接口文档访问地址
    'route' => env('API_DOC_ROUTE', 'apidoc'),
    # 格式化日期
    'datetime_format' => 'Y-m-d H:i:s',
    # 接口文档撰写人
    'author' => env('GENERATOR_AUTHOR', 'system'),
    # 生产环境是否显示文档，默认为不显示
    'is_show' => env('API_DOC_SHOW', false),
];

```

在`.env`中配置`GENERATOR_AUTHOR=您的名字`，来进行创建人的配置

## 生产环境中使用

* 并不建议在生产环境中显示api接口文档，所以默认是不显示api接口文档数据的，如果确实要展示接口数据，可做如下配置

1. 在 `.env` 中配置 `API_DOC_SHOW=true`
2. 在 `.env` 中配置 `API_DOC_ROUTE=apidoc/{token}`,`token`可为随机字符串，来保护接口文档地址