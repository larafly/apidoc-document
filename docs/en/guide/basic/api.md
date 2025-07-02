# API

Used to define API categories and endpoint lists.

### Example

```php
<?php
namespace App\Http\Controllers\Home;

use Larafly\Apidoc\Attributes\Api;
use Larafly\Apidoc\Attributes\Group;

#[Group('User Management', parent_name: 'User', module: 'Home')]
class UserController extends Controller
{
    #[Api('List Page', desc: "User list data")]
    public function index(UserLogRequest $request)
    {
       ... 
    }

    #[Api('Detail Page')]
    public function show()
    {
       ... 
    }
    
    #[Api('Update', desc: 'This endpoint is deprecated and no longer recommended')]
    public function update()
    {
       ... 
    }
}
```

### Description

Attribute definitions:

* `Larafly\Apidoc\Attributes\Group`: Defines the group to which the API category belongs.
* `Larafly\Apidoc\Attributes\Api`: Defines the name of the API endpoint.

Attribute descriptions:

* `#[Group('User Management')]`: Defines the group of the API category. For multi-level grouping, use `/`, e.g. `#[Group('Orders/Shipping Management')]`.
* `#[Group('User Management', parent_name: 'User', module: 'Home')]`: `parent_name` specifies the parent group, and `module` specifies the module the API belongs to. If not set, the default module is inferred from the namespace, e.g., `namespace App\Http\Controllers\Home;` implies `Home`.
* Access the corresponding module via `http://localhost:8000/apidoc/home`.
* `#[Api('Detail Page')]`: Defines the name of the API endpoint.
* `#[Api('List Page', desc: "User list data")]`: Use the `desc` parameter to provide a description of the endpoint.

With this setup, you can group and define your API documentation.
