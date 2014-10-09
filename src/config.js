module.exports = {

    // apply the env to a config object
    applyConfig : function (env, config, prefix) {

        Object.keys(env).forEach(function(key){
            if (key.indexOf(prefix) === 0) {
                var val = env[key];

                // strip off the prexif and then tokenize by '_'
                key = key.substring(prefix.length+1);// +1 for the _

                var parts = key.split('_');
        
                // set the value
                var place = config;

                parts.forEach(function (part, i) {
                    // if this is the last value in the path then just set it ...
                    if (i === parts.length - 1) {
                        place[part] = val;
                    } else {

                        // if an object for this part does not exist then create one
                        if (!place[part]) {
                            place[part] = {};
                        }

                        // move onto the next part...
                        place = place[part];
                    }
                });
            }
        });
    },

    // get a list of env vars to use to override these slots
    showVars : function (config, prefix) {
        var path = prefix;
        var that = this;
        Object.keys(config).forEach(function(prop){
            if (config[prop] instanceof Object) {
                that.showVars(config[prop], prefix+'_'+prop)
            } else {
                console.log(prefix+'_'+prop+'='+config[prop]);
            }
        }); 
    },

    // get the config for the module.  This is the result of applying all environment
    // variable to the config.yaml file for this module.
    config : function (configFile) {

        var yaml = require('js-yaml');
        var fs = require('fs');

        // if none is specified then assume /config.yaml
        if (configFile === undefined) {
            configFile = 'config.yaml';
        }

        // parse the YAML
        var conf = yaml.safeLoad(fs.readFileSync(configFile, 'utf-8'));

        // each project should have an application.name property
        var appName = conf.application.name;

        // apply the config
        this.applyConfig(process.env, conf, appName);

        return conf;
    }
};