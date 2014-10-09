# Mygovscot Config

A simple module to support overriding config files using environment variables.

## Getting Started
Install this grunt plugin next to your project's Gruntfile.js with: 

> npm install mygovscot-config

Then add this line to your project's Gruntfile.js gruntfile:

> grunt.loadNpmTasks('mygovscot-config');

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
var conf = require('mygovscot-config').config();
```
* This grunt task will log what the effective config would be if the application is run:
```
grunt show-effective-config
```