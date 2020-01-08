/**
 * Configuration file
 * Create and export configuration varriables
 */

 // container for all ebvironments
 const environments = {};

 // create staging {default} environment

 environments.staging = {
     'port': 3000,
     'envName': 'staging'

 };

 //create production environment

 environments.production = {
    'port': 5000,
    'envName': 'production'

 };

 //determine which environment to be passed as a cmd argument
 const currentEnvironment = typeof(process.env.NODE_ENV) == 'string'? process.env.NODE_ENV.toLowerCase(): '';

 //check if the env set is among available env objects

 const environmentToExport = typeof(environments[currentEnvironment]) == 'object'? environments[currentEnvironment] : environments.staging;

 //Export the module

 module.exports = environmentToExport;
