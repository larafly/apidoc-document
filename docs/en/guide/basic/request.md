# Request

Used to define the request parameters for API endpoints.

### Generate Request

Use the command line to generate a Request class:

```sh
php artisan apidoc:request UserRequest
```

If your class extends the pagination base class `PageApiRequest`, you can add the `--p` option:

```sh
php artisan apidoc:request UserRequest --p
```

### Example

The `index` method in `HomeController` defines the request class `UserLogRequest`:

```php
<?php
namespace App\Http\Controllers;

use Larafly\Apidoc\Attributes\Api;
use Larafly\Apidoc\Attributes\Group;
use App\Http\Requests\UserLogRequest;

#[Group('User Management')]
class HomeController extends Controller
{
    #[Api('List Page', desc: "User list data")]
    public function index(UserLogRequest $request)
    {
       ... 
    }
}
```

Define request parameters in `App\Http\Requests\UserLogRequest` using `Larafly\Apidoc\Attributes\Prop`:

```php
<?php

namespace App\Http\Requests;

use Larafly\Apidoc\Attributes\Prop;
use Larafly\Apidoc\Requests\PageApiRequest;

class UserLogRequest extends PageApiRequest
{
    #[Prop('User ID')]
    public int $user_id;
    
    #[Prop('User Name')]
    public ?string $name;

    public function rules(): array
    {
        $rules = parent::rules();

        return array_merge($rules, [
            'user_id' => 'int',
            'name' => 'nullable|string|max:3',
        ]);
    }

    public function messages(): array
    {
        $messages = parent::messages();
        return array_merge($messages, [
            'user_id' => 'User ID is required',
            'name.max' => 'Name cannot exceed 3 characters',
        ]);
    }
}
```

### Property Definition

* `Larafly\Apidoc\Attributes\Prop` defines request parameter properties.

### Property Explanation

* `#[Prop('User ID')]`: Describes the property.
* The request parameter `user_id` is of type `int` and required. `user_name` is of type `string` and optional. A `?` before the type indicates the field is optional.

```php
#[Prop('User ID')]
public int $user_id;

#[Prop('User Name')]
public ?string $name;
```

### Advanced Usage

Use `Enum`, for example `App\Enums\UserTypeEnum`:

```php
<?php

namespace App\Enums;

enum UserTypeEnum: int
{
    case ENABLE = 1;
    case DISABLE = 0;
}
```

Used in request classes to define a multidimensional array:

```php
<?php

#[Prop(desc: 'User Records', type:[
    [
        'name' => 'name',
        'type' => '?string',
        'desc' => 'User Name',
    ],
    [
        'name' => 'age',
        'type' => '?int',
        'desc' => 'User Age',
    ],
])]
public ?array $user_logs;

#[Prop(desc: 'User Records', type: UserApiRequest::class)]
public ?array $user_logs;
```

### `type` Parameter Explanation

* `type=array`: `name` is the parameter name, `type` defines the type, and `desc` is the description.
* `type=string`: such as `type: UserApiRequest::class`, allows referencing another request class to reuse request definitions.

```php
<?php

namespace App\Http\Requests;

use App\Enums\UserTypeEnum;
use Illuminate\Validation\Rule;
use Larafly\Apidoc\Attributes\Prop;
use Larafly\Apidoc\Requests\ApiRequest;

class UserApiRequest extends ApiRequest
{
    #[Prop(desc: 'ID')]
    public int $id;

    #[Prop(desc: 'Name')]
    public ?string $name;

    #[Prop(desc: 'User Type')]
    public UserTypeEnum $user_type;

    #[Prop(desc: 'User Records', type:[
        [
            'name' => 'name',
            'type' => '?string',
            'desc' => 'User Name',
        ],
        [
            'name' => 'age',
            'type' => '?int',
            'desc' => 'User Age',
        ],
    ])]
    public ?array $user_logs;
    
    public function rules(): array
    {
        return [
            'id' => ['required', 'integer'],
            'name' => ['nullable', 'string', 'max:4'],
            'user_type' => ['required', Rule::enum(UserTypeEnum::class)],
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'ID is required',
            'name.required' => 'Name is required',
            'name.max' => 'Name cannot exceed 4 characters',
            'user_type.required' => 'User type is required',
            'user_type' => 'User type must be 0 or 1',
        ];
    }
}
```

### Base Class Explanation

Use `Larafly\Apidoc\Requests\ApiRequest` as the base class for normal requests:

```php
<?php

namespace Larafly\Apidoc\Requests;

use Illuminate\Foundation\Http\FormRequest;
use ReflectionNamedType;
use ReflectionProperty;

abstract class ApiRequest extends FormRequest
{
    protected function passedValidation(): void
    {
        $data = $this->validated();

        foreach ($data as $key => $value) {
            if (!property_exists($this, $key)) {
                continue;
            }

            $propertyType = (new ReflectionProperty($this, $key))->getType();

            if ($propertyType instanceof ReflectionNamedType && !$propertyType->isBuiltin()) {
                $className = $propertyType->getName();
                if (enum_exists($className)) {
                    $this->{$key} = $className::from($value);
                } elseif (is_array($value) && array_is_list($value)) {
                    $this->{$key} = array_map(fn($v) => new $className(...$v), $value);
                } else {
                    $this->{$key} = new $className(...$value);
                }
            } else {
                $this->{$key} = $value;
            }
        }
    }
}
```

Use `Larafly\Apidoc\Requests\PageApiRequest` to include default pagination parameters `page=1` and `per_page=10`:

```php
<?php

namespace Larafly\Apidoc\Requests;

use Larafly\Apidoc\Attributes\Prop;

class PageApiRequest extends ApiRequest
{
    #[Prop(desc: 'Page number, minimum is 1')]
    public ?int $page = 1;

    #[Prop(desc: 'Items per page, minimum is 10, maximum is 100')]
    public ?int $per_page = 10;

    public function rules(): array
    {
        return [
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:10', 'max:100'],
        ];
    }

    public function messages(): array
    {
        return [
            'page.min' => 'Page number must be greater than 1',
            'per_page.min' => 'Items per page must be greater than 10',
            'per_page.max' => 'Items per page cannot exceed 100',
        ];
    }
}
```
