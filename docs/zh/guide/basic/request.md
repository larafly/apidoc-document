# 请求
用于定义接口中请求的参数数据

### 生成Request

使用命令行生成Request类

```sh
php artisan apidoc:request UserRequest --p
```

如果您继承分页的类`PageApiRequest`，可以加上`--p`

```sh
php artisan apidoc:request UserRequest --p
```

### 示例

HomeController的index请求参数中定义`UserLogRequest $request`请求类

```php
<?php
namespace App\Http\Controllers;

use Larafly\Apidoc\Attributes\Api;
use Larafly\Apidoc\Attributes\Group;
use App\Http\Requests\UserLogRequest;

#[Group('用户管理')]
class HomeController extends Controller
{
    #[Api('列表页',desc:"用户列表数据")]
    public function index(UserLogRequest $request)
    {
       ... 
    }
}
```

在`App\Http\Requests\UserLogRequest`定义好请求参数的 `Larafly\Apidoc\Attributes\Prop`

```php
<?php

namespace App\Http\Requests;

use Larafly\Apidoc\Attributes\Prop;
use Larafly\Apidoc\Requests\PageApiRequest;

class UserLogRequest extends PageApiRequest
{
    #[Prop('用户id')]
    public int $user_id;
    
    #[Prop('用户名称')]
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
            'user_id' => '用户id不能为空',
            'name.max' => '名称不能超过3',
        ]);
    }
}

```

属性定义
* `Larafly\Apidoc\Attributes\Prop` 定义请求参数的属性

属性说明：
* `#[Prop('用户id')]`：用于对该属性字段进行说明
* 以下说明请求参数为`user_id`,字段类型为`int`,参数必填，`user_name`为`string`，不必填，属性前加上`?`表示该字段必填
```php
#[Prop('用户id')]
public int $user_id;

#[Prop('用户名称')]
public ?string $name;
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

在请求中进行使用,如下将定义请求参数的多维数组

```php
<?php

#[Prop(desc: '用户记录',type:[
    [
        'name'=>'name',
        'type'=>'?string',
        'desc'=>'用户名称',
    ],
    [
        'name'=>'age',
        'type'=>'?int',
        'desc'=>'用户年龄',
    ],
])]
public ?array $user_logs;

#[Prop(desc: '用户记录',type:UserApiRequest::class)]
public ?array $user_logs;
```

`type`参数说明：
* `type=array`：`name` 表示参数的名称,`type`定义参数的类型，`desc`对参数的说明
* `type=string`：如`type:UserApiRequest::class`，可引用其他请求类，复用请求方法


```php
<?php

namespace App\Http\Requests;

use App\Enums\UserTypeEnum;
use Illuminate\Validation\Rule;
use Larafly\Apidoc\Attributes\Prop;
use Larafly\Apidoc\Requests\ApiRequest;

class UserApiRequest extends ApiRequest
{
    #[Prop(desc: 'id',)]
    public int $id;

    #[Prop(desc: '名称')]
    public ?string $name;

    #[Prop(desc: '用户类型')]
    public UserTypeEnum $user_type;

    
    #[Prop(desc: '用户记录',type:[
        [
            'name'=>'name',
            'type'=>'?string',
            'desc'=>'用户名称',
        ],
        [
            'name'=>'age',
            'type'=>'?int',
            'desc'=>'用户年龄',
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
            'id.required' => 'id是必须的',
            'name.required' => '名字是必须的',
            'name.max' => '名字长度不能超过4',
            'user_type.required' => '用户类型是必须的',
            'user_type' => '用户类型必须是 0 或 1',
        ];
    }
}

```

### 继承基类说明

`Larafly\Apidoc\Requests\ApiRequest;` 普通请求拦截可使用这个基类

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
            if (! property_exists($this, $key)) {
                continue;
            }

            $propertyType = (new ReflectionProperty($this, $key))->getType();

            if ($propertyType instanceof ReflectionNamedType && ! $propertyType->isBuiltin()) {
                // If it's a custom class, construct an array of objects.
                $className = $propertyType->getName();
                if (enum_exists($className)) {
                    // if type is  enum，use ::from to set key
                    $this->{$key} = $className::from($value);
                } elseif (is_array($value) && array_is_list($value)) {
                    $this->{$key} = array_map(fn ($v) => new $className(...$v), $value);
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


`Larafly\Apidoc\Requests\PageApiRequest;` 默认设置了分页的请求属性`page=1`和`per_page=10`

```php
<?php

namespace Larafly\Apidoc\Requests;

use Larafly\Apidoc\Attributes\Prop;

class PageApiRequest extends ApiRequest
{
    #[Prop(desc: '页码,最小为1')]
    public ?int $page = 1;

    #[Prop(desc: '每页条数,最小为10，最大为100')]
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
            'page.min' => '页码必须大于1',
            'per_page.min' => '每页数必须大于10',
            'per_page.max' => '每页数不能超过100',
        ];
    }
}
```