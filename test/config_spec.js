var config = require('../src/config.js');

describe('config', function() {

	describe('applyConfig', function () {
		it('blank config object', function() {

			// ARRANGE
			var conf = {};

			var env = {
				test_mongoConnectionString : 'mongoConnectionStringChanged',
				test_sqlConnectionString : 'sqlConnectionStringChanged'
			};

			var expectedConf = {
				mongoConnectionString : 'mongoConnectionStringChanged',
				sqlConnectionString : 'sqlConnectionStringChanged'
			};


			// ACT
			config.applyConfig(env, conf, 'test');
			
			// ASSERT
			expect(conf).toEqual(expectedConf);
		});

		it('flat config object', function() {
			// ARRANGE
			var conf = {
				mongoConnectionString : 'mongoConnectionString',
				sqlConnectionString : 'sqlConnectionString',
				featureFlag1 : true,
				featureFlag2 : false
			};

			var env = {
				test_mongoConnectionString : 'mongoConnectionStringChanged',
				test_sqlConnectionString : 'sqlConnectionStringChanged',
				test_featureFlag1 : 'false',
				test_featureFlag2 : 'true',
			};

			var expectedConf = {
				mongoConnectionString : 'mongoConnectionStringChanged',
				sqlConnectionString : 'sqlConnectionStringChanged',
				featureFlag1 : false,
				featureFlag2 : true
			};

			// ACT
			config.applyConfig(env, conf, 'test');

			// ASSERT
			expect(conf).toEqual(expectedConf);

		});

		it('structured config object', function() {
			// ARRANGE
			var conf = {
				mongo: {
					connectionString : 'mongoConnectionString',
				},
				sql: {
					connectionString : 'sqlConnectionString'
				}
			};

			var env = {
				test_mongo_connectionString : 'mongoConnectionStringChanged',
				test_sql_connectionString : 'sqlConnectionStringChanged'
			};

			var expectedConf = {
				mongo : {
					connectionString : 'mongoConnectionStringChanged'
				},
				sql : {
					connectionString : 'sqlConnectionStringChanged'
				}
			};


			// ACT
			config.applyConfig(env, conf, 'test');


			// ASSERT
			expect(conf).toEqual(expectedConf);

		});

		it('structured config object with section absent from initial config', function() {
			// ARRANGE
			var conf = {
				mongo: {
					connectionString : 'mongoConnectionString',
				}
			};

			var env = {
				test_mongo_connectionString : 'mongoConnectionStringChanged',
				test_sql_connectionString : 'sqlConnectionStringChanged'
			};

			var expectedConf = {
				mongo : {
					connectionString : 'mongoConnectionStringChanged'
				},
				sql : {
					connectionString : 'sqlConnectionStringChanged'
				}
			};

			// ACT
			config.applyConfig(env, conf, 'test');

			// ASSERT
			expect(conf).toEqual(expectedConf);

		});
	});

	describe('config', function () {
		it('blank config object', function() {
			var conf = config.config();
			console.log(JSON.stringify(conf), null, '\t');
		});
	});


	describe('showVars', function () {
		it('example', function() {
			var conf = config.showVars(config.config());
		});
	});
});
