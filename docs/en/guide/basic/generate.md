# Apidoc
Used to quickly generate template files based on configuration information. You can first save the configuration, have the team review it, and then generate the files according to your needs.
### UI Interface

![Apidoc](/generate.png)

### Description
* **Model name:** The actual name of the Model, such as User, Order, etc.
* **Display name:** The name representing the model, such as User, Order, etc.
* **Create migration:** Indicates generating the migration file, **Run migrate:** Indicates running the migration file, **ide-helper:models:** Indicates running the ide Model helper function.
* The list below shows the files that the template needs to generate. The file name can be dynamically modified. `DummyClass` is a placeholder name that changes dynamically based on the entered Model name.
* The fields in **Table fields** correspond to the configuration of various fields in the migration file and can be processed according to custom configuration rules. The specific field calls will be explained in the template.
* Supports handling of foreign keys and associated relationships.
* The set data can be saved first or saved directly and files generated.