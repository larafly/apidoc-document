# 自定义命令

从 [接口生成](/guide/basic/generate.html) 中可以看出，生成文档的方式可以有多种，如果需要自定义文档生成规则，可生成自定义命令

### 创建命令

```sh
php artisan make:command CustomCommand
```

通过`ApidocMdCommand`源码可以看出，继承`ApidocCommand`后，覆写`saveControllerDoc`即可实现将文档写入到其他地方

```php
<?php

namespace Larafly\Apidoc\Commands;

use Illuminate\Support\Facades\Storage;

class ApidocMdCommand extends ApidocCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    public $signature = 'apidoc:md';

    /**
     * The console command description.
     *
     * @var string
     */
    public $description = 'generator api documents to markdown files';

    #[\Override]
    public function saveControllerDoc(array $api): void
    {
        $groupName = $api['name'];
        $folder = "apidoc/{$groupName}";

        foreach ($api['api_methods'] as $method) {
            $markdown = $this->buildMarkdownDoc($method);
            $fileName = $method['name'].'.md';
            Storage::disk('public')->put("$folder/{$fileName}", $markdown);
        }
    }

    private function buildMarkdownDoc(array $method): string
       ...
    }
}

```


`CustomCommand`示例如下

```php
<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\Storage;

class CustomCommand extends ApidocCommand
{

    public $signature = 'apidoc:custom';

    public $description = 'custom api documents';

    #[\Override]
    public function saveControllerDoc(array $api): void
    {
        $groupName = $api['name'];
        $folder = "apidoc/{$groupName}";

        foreach ($api['api_methods'] as $method) {
            $markdown = $this->buildMarkdownDoc($method);
            $fileName = $method['name'].'.md';
            Storage::disk('public')->put("$folder/{$fileName}", $markdown);
        }
    }

    private function buildMarkdownDoc(array $method): string
       ...
    }
}
```

如果需要自定义返回值,而不是使用现在定义的返回字段，可复写`public function getResponseData(string $response_class): array` 方法

