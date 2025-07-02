# 接口

用于定义接口分类和接口列表

### 示例

```php
<?php
namespace App\Http\Controllers\Home;

use Larafly\Apidoc\Attributes\Api;
use Larafly\Apidoc\Attributes\Group;

#[Group('用户管理',parent_name:'用户',module:'Home')]
class UserController extends Controller
{
    #[Api('列表页',desc:"用户列表数据")]
    public function index(UserLogRequest $request)
    {
       ... 
    }

    #[Api('详情页')]
    public function show()
    {
       ... 
    }
    
    #[Api('更新',desc:'改接口即将废弃,已不建议使用')]
    public function update()
    {
       ... 
    }
}
```

### 说明

属性定义
* `Larafly\Apidoc\Attributes\Group` 定义接口分类所属组的属性
* `Larafly\Apidoc\Attributes\Api` 定义接口名称的属性

属性说明：
  * `#[Group('用户管理')]`：用于定义接口分类所属组，多层级分组可使用 `/` 进行区分，如 `#[Group('订单/发货管理')]`
  * `#[Group('用户管理',parent_name:'用户',module:'Home')]`：`parent_name`表示组所属的父级分组,`module`表示api接口所属的板块，不设置默认以`namespace App\Http\Controllers\Home;`中的`Home`为模块
  * 可通过访问`http://localhost:8000/apidoc/home` 来访问对应的模块
  * `#[Api('详情页')]`：用于定义api接口的名称， 
  * `#[Api('列表页',desc:"用户列表数据")]` 如需对接口进行说明，可使用`desc`参数


以上即可完成对api接口文档的分组和接口的定义