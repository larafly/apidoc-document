# 响应
用于定义接口中返回的数据

### 示例

HomeController的index返回参数中定义`UserLogPaginateResponse`响应类

```php
<?php
namespace App\Http\Controllers;

use Larafly\Apidoc\Attributes\Api;
use Larafly\Apidoc\Attributes\Group;
use App\Http\Requests\UserLogRequest;
use App\Http\Daos\UserLogDao;

#[Group('用户管理')]
class HomeController extends Controller
{
    #[Api('列表页',desc:"用户列表数据")]
    public function index(UserLogRequest $request):UserLogPaginateResponse
    {
       return $this->userLogDao->getList($request->name, $request->per_page);
    }
}
```

在`App\Http\Daos\UserLogDao`的处理

```php
<?php

namespace App\Http\Daos;

use App\Enums\UserTypeEnum;
use App\Http\Responses\UserLogPaginateResponse;
use App\Models\UserLog;

class UserLogDao
{

    public function getList(string $name='', int $per_page=10): UserLogPaginateResponse
    {
        $data = UserLog::with('user')
            ->when($name, fn ($q) => $q->where('name', 'like', "%$name%"))
            ->paginate($per_page);

        return UserLogPaginateResponse::success($data);
    }
}


```

在`App\Http\Responses\UserLogPaginateResponse`定义好接口返回参数的 `Larafly\Apidoc\Attributes\Prop`

```php
<?php

namespace App\Http\Responses;

use Larafly\Apidoc\Attributes\Prop;
use Larafly\Apidoc\Responses\PaginateResponse;

class UserLogPaginateResponse extends PaginateResponse
{
    #[Prop(desc: '记录id')]
    public int $id;
    
    #[Prop(desc: '名称')]
    public string $name;
    
    #[Prop(desc: '用户记录', type:[
        [
            'name'=>'name',
            'type'=>'string',
            'desc'=>'用户名称',
        ],
        [
            'name'=>'age',
            'type'=>'int',
            'desc'=>'用户年龄',
        ],
    ])]
    public array $user;
    
    #[Prop(desc: '用户信息')]
    public UserResponse $user_info;
}

```

属性定义
* `Larafly\Apidoc\Attributes\Prop` 定义接口返回参数的属性

属性说明：
* `#[Prop('记录id')]`：用于对该属性字段进行说明
* 以下说明返回参数为`id`,字段类型为`int`,说明为记录id，`name`为`string`，说明为名称

```php
#[Prop('用户id')]
public int $id;

#[Prop('名称')]
public string $name;
```

### 高级使用

使用Enum，可创建`App\Enums\UserTypeEnum`

```php
<?php

namespace App\Enums;

enum UserTypeEnum: int
{
    case ENABLE = 1;
    case DISABLE = 0;

}

```

在请求中进行使用,如下将定义响应参数的多维数组

```php
<?php

#[Prop(desc: '用户记录',type:[
    [
        'name'=>'name',
        'type'=>'string',
        'desc'=>'用户名称',
    ],
    [
        'name'=>'age',
        'type'=>'int',
        'desc'=>'用户年龄',
    ],
])]
public array $user_logs;

```

`type`参数说明：
* `type=array`：`name` 表示参数的名称,`type`定义参数的类型，`desc`对参数的说明
* `type=string`：如`type:UserResponse::class`，可引用其他响应类，复用响应

也可直接返回响应的数据

```php
<?php

#[Prop(desc: '用户信息')]
public UserResponse $user_info;
```

`Larafly\Apidoc\Responses\PaginateResponse;` 默认设置了返回分页的响应的`meta`数据

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

默认会根据定义的`Prop`属性来生成`响应示例`,如果需要修改默认的响应示例，可在Response中增加`getDemo`方法

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