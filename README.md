# Config Weaver

A simple module to support overriding config files using environment variables.

## Getting Started

Install this package as follows:

> npm install --save config-weaver


## Documentation

* the root of the client project should contain a config file named config.yaml
  This file should be a valid YAML file containing at least an application.name plus any values that need to be externalised an under the control of infrastructure, for example:

```yml
application:
  name: myproj     
database:
  connectionString: jdbc:postgresql://hostname:5432/dbname
```

  * Values can be overridden via environment variables, for example:
```
     myproj_database_connectionString=jdbc:postgresql://hostname/newdbname
```

* The following code allows you to access the effective config:
```
var conf = require('config-weaver').config();
```
