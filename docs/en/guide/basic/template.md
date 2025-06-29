# Templates
Used to set the templates for generating files. Theoretically, it can generate any file you need. A set of template files was pre-installed during installation.

### UI Interface

![Templates](/template.png)

### Description

#### List Description:

* **Path:** The relative path where the file will be generated, with the project directory as the root.
* **Selected:** Whether the file is automatically checked for generation in the generator interface.
* **Group:**  Groups files together for easier management of generated files.
* **Edit:** Allows editing of template information.

### Template Field Description:

#### Basic Fields:
  * **DummyDisplayName:** Display name, such as User Address.
  * **DummyClass:** Class name, such as UserAddress.
  * **DummyCamelClass:** Camel case class name, such as userAddress.
  * **DummySnakeClass:** Lowercase class name, such as user_address.
  * **DummyPluralClass:** Plural class name, such as Users.
  * **DummySnakePluralClass:** Lowercase plural class name, such as users.

#### Global Variables:
  * `$tableFields`: All table field data, looped through using @foreach to extract table data
  * `$customKeys`: Custom key-value pairs , such as `$customKeys['author']`
  * `$relationShips`: Data for associations
  * `$modelFields`: Model-related data, such as `primary_key`, `timestamps`, `soft_deletes`

#### Template Rendering
  * Uses [blade](https://laravel.com/docs/12.x/blade) for template processing.

#### Template Example

```php
<?php
/**
 *
 * DummyDisplayName
 * author: {{$customKeys['author']}}
 * created_at: {{ date('Y-m-d H:i:s') }}
 */
namespace App\Http\Controllers\Admin;

use App\Models\DummyClass;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;

class DummyClassController extends Controller
{

  public function index(Request $request): JsonResponse
  {
        $create_start_time = $request->get('create_start_time');
        $create_end_time = $request->get('create_end_time');
@foreach($tableFields as $field)
@if($field['can_search'])
        ${{$field['field_name'] }} = $request->get('{{$field['field_name'] }}');
@endif
@endforeach
      $data = DummyClass::orderByDesc('id')
@foreach($tableFields as $field)
@if($field['can_search'])
@if('numeric'==$field['rule'])
              ->when(${{$field['field_name'] }}, fn (Builder $query) => $query->where('{{$field['field_name'] }}',  ${{$field['field_name'] }}))
@elseif('string'==$field['rule'])
      ->when(${{$field['field_name'] }}, fn (Builder $query) => $query->where('{{$field['field_name'] }}', 'like', "%${{$field['field_name'] }}%"))
@else
      ->when(${{$field['field_name'] }}, fn (Builder $query) => $query->where('{{$field['field_name'] }}', 'like', "%${{$field['field_name'] }}%"))
@endif
@endif
@endforeach
      ->when($create_start_time, fn (Builder $query) => $query->where('created_at', '>=', $create_start_time))
      ->when($create_end_time, fn (Builder $query) => $query->where('created_at', '<=', $create_end_time))
      ->paginate();
      
      $data->getCollection()->transform(function (DummyClass $DummySnakeClass){
          //$DummySnakeClass->setAttribute('id', 'ID');
        
          return $DummySnakeClass;
      });
      
      return response()->json(['message' => 'success', 'errcode' => 0, 'data' => $data->toArray()]);
    }

    public function update(Request $request)
    {
                $id = (int)$request->get('id');
                $DummySnakeClass = null;
                if($id){
                  $DummySnakeClass = DummyClass::whereId($id)->first();
                }
                $data=$request->validate([
                  'id' => 'required|int',
@foreach($tableFields as $field)
    @if('string'==$field['rule'] && false==$field['nullable'])
                '{{$field['field_name'] }}' => 'required'
@endif
@endforeach
              ],[],[
                'id' => 'ID',
@foreach($tableFields as $field)
@if('string'==$field['rule'] && false==$field['nullable'])
                '{{$field['field_name'] }}' => '{{$field['field_display_name'] }}'
@endif
@endforeach
              ]);
              
                if(!$DummySnakeClass){
                  $DummySnakeClass=new DummyClass();
                }
                $DummySnakeClass->fill($data);
                if($DummySnakeClass->save()){
                  return response()->json(['message' => '保存成功', 'errcode' => 0, 'data' => []]);
                }
                return response()->json(['message' => '保存失败', 'errcode' => 1, 'data' => []]);
    }

    public function delete(Request $request)
    {
          $id = (int)$request->get('id');
          $DummySnakeClass = DummyClass::whereId($id)->first();
          if($DummySnakeClass && $DummySnakeClass->delete()){
            return response()->json(['message' => '删除成功', 'errcode' => 0, 'data' => []]);
          }
          return response()->json(['message' => '删除失败', 'errcode' => 1, 'data' => []]);
    }
}
```
