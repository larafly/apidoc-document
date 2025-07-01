# Response

Used to define the returned data of an API endpoint.

### Generate Response

Use the command line to generate a Response class:

```sh
php artisan apidoc:response UserResponse
```

If your class extends the paginated response class `PaginateResponse`, you can add the `--p` option:

```sh
php artisan apidoc:response UserResponse --p
```

### Example

The `index` method in `HomeController` defines a response class `UserLogPaginateResponse`:

```php
<?php
namespace App\Http\Controllers;

use Larafly\Apidoc\Attributes\Api;
use Larafly\Apidoc\Attributes\Group;
use App\Http\Requests\UserLogRequest;
use App\Http\Daos\UserLogDao;

#[Group('User Management')]
class HomeController extends Controller
{
    #[Api('List Page', desc: "User list data")]
    public function index(UserLogRequest $request): UserLogPaginateResponse
    {
       return $this->userLogDao->getList($request->name, $request->per_page);
    }
}
```

In `App\Http\Daos\UserLogDao`:

```php
<?php

namespace App\Http\Daos;

use App\Enums\UserTypeEnum;
use App\Http\Responses\UserLogPaginateResponse;
use App\Models\UserLog;

class UserLogDao
{
    public function getList(string $name = '', int $per_page = 10): UserLogPaginateResponse
    {
        $data = UserLog::with('user')
            ->when($name, fn ($q) => $q->where('name', 'like', "%$name%"))
            ->paginate($per_page);

        return UserLogPaginateResponse::success($data);
    }
}
```

In `App\Http\Responses\UserLogPaginateResponse`, define response parameters using `Larafly\Apidoc\Attributes\Prop`:

```php
<?php

namespace App\Http\Responses;

use Larafly\Apidoc\Attributes\Prop;
use Larafly\Apidoc\Responses\PaginateResponse;

class UserLogPaginateResponse extends PaginateResponse
{
    #[Prop(desc: 'Record ID')]
    public int $id;
    
    #[Prop(desc: 'Name')]
    public string $name;
    
    #[Prop(desc: 'User Records', type: [
        [
            'name' => 'name',
            'type' => 'string',
            'desc' => 'User Name',
        ],
        [
            'name' => 'age',
            'type' => 'int',
            'desc' => 'User Age',
        ],
    ])]
    public array $user;
    
    #[Prop(desc: 'User Info')]
    public UserResponse $user_info;
}
```

### Property Definition

* `Larafly\Apidoc\Attributes\Prop` is used to define response parameter properties.

### Property Explanation

* `#[Prop('Record ID')]`: Describes the purpose of the property.
* The response parameter `id` is of type `int` with description "Record ID", `name` is of type `string` with description "Name":

```php
#[Prop('User ID')]
public int $id;

#[Prop('Name')]
public string $name;
```

### Advanced Usage

Using Enum, create `App\Enums\UserTypeEnum`:

```php
<?php

namespace App\Enums;

enum UserTypeEnum: int
{
    case ENABLE = 1;
    case DISABLE = 0;
}
```

Define a multidimensional array in the response:

```php
<?php

#[Prop(desc: 'User Records', type: [
    [
        'name' => 'name',
        'type' => 'string',
        'desc' => 'User Name',
    ],
    [
        'name' => 'age',
        'type' => 'int',
        'desc' => 'User Age',
    ],
])]
public array $user_logs;
```

### `type` Parameter Explanation

* `type = array`: `name` defines the parameter name, `type` defines the data type, `desc` is the description.
* `type = string`: such as `type: UserResponse::class`, allows referencing other response classes for reuse.

Directly returning a response class is also supported:

```php
<?php

#[Prop(desc: 'User Info')]
public UserResponse $user_info;
```

`Larafly\Apidoc\Responses\PaginateResponse` provides default pagination response `meta` data:

```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "user_type": 1,
      "user": [
        {
          "name": "John Doe",
          "age": 1
        },
        {
          "name": "John Doe",
          "age": 1
        }
      ]
    },
    {
      "id": 1,
      "name": "John Doe",
      "user_type": 1,
      "user": [
        {
          "name": "John Doe",
          "age": 1
        },
        {
          "name": "John Doe",
          "age": 1
        }
      ]
    }
  ],
  "message": "success",
  "meta": {
    "current_page": 1,
    "last_page": 10,
    "per_page": 10,
    "total": 100
  }
}
```

By default, the `response example` is generated based on the defined `Prop` attributes.
If you need to customize the default response example, you can add a `getDemo` method in the Response class:

```php
<?php

class UserLogPaginateResponse extends PaginateResponse
{
    ...

    public function getDemo(): string
    {
        return <<<'json'
{
    "code": 200,
    "message": "success",
    "data": "success"
}
json;
    }

}
```
