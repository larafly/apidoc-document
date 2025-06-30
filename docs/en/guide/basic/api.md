# Interface

Used to define API groups and endpoint lists.

### Example

```php
<?php
namespace App\Http\Controllers;

use Larafly\Apidoc\Attributes\Api;
use Larafly\Apidoc\Attributes\Group;

#[Group('User Management')]
class HomeController extends Controller
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

### Explanation

Property Definitions:

* `Larafly\Apidoc\Attributes\Group`: Defines the group to which the API belongs.
* `Larafly\Apidoc\Attributes\Api`: Defines the name of the API endpoint.

Property Descriptions:

* `#[Group('User Management')]`: Defines the group of the API. For nested groups, use `/`, e.g., `#[Group('Orders/Shipping Management')]`.
* `#[Api('Detail Page')]`: Defines the name of the API endpoint.
* `#[Api('List Page', desc: "User list data")]`: Use the `desc` parameter to add a description for the endpoint.

This is how you group and define API documentation.
