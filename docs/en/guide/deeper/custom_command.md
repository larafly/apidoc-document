# Custom Command

As shown in [API Generation](/guide/basic/generate.html), there are multiple ways to generate documentation. If you need custom generation rules, you can create your own custom command.

### Create a Command

```sh
php artisan make:command CustomCommand
```

From the source code of `ApidocMdCommand`, you can see that by extending `ApidocCommand` and overriding `saveControllerDoc`, you can write the documentation to a different location:

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
    public $description = 'generate API documents as markdown files';

    #[\Override]
    public function saveControllerDoc(array $api): void
    {
        $groupName = $api['name'];
        $folder = "apidoc/{$groupName}";

        foreach ($api['api_methods'] as $method) {
            $markdown = $this->buildMarkdownDoc($method);
            $fileName = $method['name'] . '.md';
            Storage::disk('public')->put("$folder/{$fileName}", $markdown);
        }
    }

    private function buildMarkdownDoc(array $method): string
       ...
    }
}
```

Example `CustomCommand`:

```php
<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\Storage;

class CustomCommand extends ApidocCommand
{
    public $signature = 'apidoc:custom';

    public $description = 'custom API documentation generation';

    #[\Override]
    public function saveControllerDoc(array $api): void
    {
        $groupName = $api['name'];
        $folder = "apidoc/{$groupName}";

        foreach ($api['api_methods'] as $method) {
            $markdown = $this->buildMarkdownDoc($method);
            $fileName = $method['name'] . '.md';
            Storage::disk('public')->put("$folder/{$fileName}", $markdown);
        }
    }

    private function buildMarkdownDoc(array $method): string
       ...
    }
}
```

If you want to customize the response data instead of using the current predefined response fields, you can override the `public function getResponseData(string $response_class): array` method.
