// READ ME FIRST
// you need node js, mocha js and chai js
// to get mocha js: npm install mocha
// to get chai js: npm install chai
// to get chai-string: npm install chai-string
// check out the documentation on different assert functions and add some tests
// remember to redefine the nameServer, url and trace field before each block test
//
// make sure the DNSlooup.jar file is in the same location as the script
// to run, simply travers to the test folder and type 'mocha --reporter spec > report.txt'

"use strict";

// requires
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
chai.use(require('chai-string'));

// scores
var part_function = 0;	// 22
var part_errhandle = 0;	// 8
var part_tracing = 0;	// 9
// block of tests, copy/paste and edit for each jar restart
describe('Functionality', function(){
	this.timeout(60000);

	// >>>>>>>>>> #1
	describe('>>>>>>>>>> #1 [2pt] Basic query to a name server that is authoritative', function () {
		var retData = '';
		var splitData;
		var nameServer = '198.162.35.1';
		var url = 'www.cs.ubc.ca';
		var trace = '';
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					// do your preprocessing here
  					var breakDown = breakDownNoTrace(retData);
  					splitData = breakDown.answer;
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
		    		lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

        var len = 0;
        it("[0pts] return shouldhave 3 items", function() {
        	expect(splitData).to.not.be.undefined;
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[1pts] return should have the original url", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[0]).to.not.be.undefined;
			expect(splitData[0]).to.equal(url);
			part_function += 1;
		});

		it("[0pts] return should have the TTL field", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
		});

		it("[0pts] return should have the TTL > 0", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
			var ttl = parseInt(splitData[1]);
			expect(ttl).to.be.above(0);
		});

		it("[1pts] return should have the expected ip address", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[2]).to.not.be.undefined;
			expect(splitData[2]).to.equal('142.103.6.5');
			part_function += 1;
		});

		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #2
	describe('>>>>>>>>>> #2 [5pt] Basic query start with root', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'www.ubc.ca';
		var trace = '';
		var splitData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					var breakDown = breakDownNoTrace(retData);
  					splitData = breakDown.answer;
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

		var len = 0;
		it("[0pts] return shouldhave 3 items", function() {
			expect(splitData).to.not.be.undefined;
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[1pts] return should have the original url", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[0]).to.equal(url);
			part_function += 1;
		});

		it("[0pts] return should have the TTL field", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
		});

		it("[0pts] return should have the TTL > 0", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
			var ttl = parseInt(splitData[1]);
			expect(ttl).to.be.above(0);
		});

		it("[4pts] return should have the expected ip address", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[2]).to.not.be.undefined;
			expect(splitData[2]).to.equal('142.103.59.226');
			part_function += 4;
		});


		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #3
	describe('>>>>>>>>>> #3 [5pt] basic type query result in a cname', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'prep.ai.mit.edu';
		var trace = '';
		var splitData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					var breakDown = breakDownNoTrace(retData);
  					splitData = breakDown.answer;
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

		var len = 0;
		it("[0pts] return shouldhave 3 items", function() {
			expect(splitData).to.not.be.undefined;
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[1pts] return should have the original url", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[0]).to.equal(url);
			part_function += 1;
		});

		it("[0pts] return should have the TTL field", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
		});

		it("[0pts] return should have the TTL > 0", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
			var ttl = parseInt(splitData[1]);
			expect(ttl).to.be.above(0);
		});

		it("[4pts] return should have the expected ip address", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[2]).to.not.be.undefined;
			expect(splitData[2]).to.equal('208.118.235.20');
			part_function += 4;
		});



		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #4
	describe('>>>>>>>>>> #4 [3pt] query that reutns a name server', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'www.stanford.edu';
		var trace = '';
		var splitData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					var breakDown = breakDownNoTrace(retData);
  					splitData = breakDown.answer;
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

		var len = 0;
        it("[0pts] return shouldhave 3 items", function() {
        	expect(splitData).to.not.be.undefined;
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[1pts] return should have the original url", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[0]).to.equal(url);
			part_function += 1;
		});

		it("[0pts] return should have the TTL field", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
		});

		it("[0pts] return should have the TTL > 0", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
			var ttl = parseInt(splitData[1]);
			expect(ttl).to.be.above(0);
		});

		it("[2pts] return should have the expected ip address", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[2]).to.not.be.undefined;
			expect(['52.27.47.89', '54.186.193.26', '52.11.42.24']).to.include(splitData[2]);
			part_function += 2;
		});





		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #5
	describe('>>>>>>>>>> #5 [3pt] a complicated lookup series', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'finance.google.ca';
		var trace = '';
		var splitData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					var breakDown = breakDownNoTrace(retData);
  					splitData = breakDown.answer;
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

		var len = 0;
        it("[0pts] return shouldhave 3 items", function() {
        	expect(splitData).to.not.be.undefined;
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[0pts] return should have the original url", function() {
			expect(splitData[0]).to.equal(url);
		});

		it("[0pts] return should have the TTL field", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
		});

		it("[0pts] return should have the TTL > 0", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
			var ttl = parseInt(splitData[1]);
			expect(ttl).to.be.above(0);
		});

		it("[3pts] return should have the expected ip address", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[2]).to.not.be.undefined;
			expect([
				'216.58.193.110', 
				'216.58.193.78', 
				'216.58.193.110', 
				'216.58.216.174',
				'216.58.216.142',
				'172.217.2.110', 
				'172.217.3.110', 
				'172.217.0.142', 
				'184.150.182.148',
				'184.150.182.153',
				'184.150.182.157',
				'184.150.182.162',
				'184.150.182.163',
				'184.150.182.167',
				'184.150.182.168',
				'184.150.182.172',
				'184.150.182.177',
				'184.150.182.182',
				'184.150.182.183',
				'184.150.182.187'
				]).to.include(splitData[2]);
			part_function += 3;
		});





		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #6
	describe('>>>>>>>>>> #6 [2pt] can deal with info in the additional field', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'groups.yahoo.com';
		var trace = '';
		var splitData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					var breakDown = breakDownNoTrace(retData);
  					splitData = breakDown.answer;
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

		var len = 0;
        it("[0pts] return shouldhave 3 items", function() {
        	expect(splitData).to.not.be.undefined;
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[0pts] return should have the original url", function() {
			expect(splitData[0]).to.equal(url);
			part_function += 1;
		});

		it("[0pts] return should have the TTL field", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
		});

		it("[0pts] return should have the TTL > 0", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[1]).to.not.be.undefined;
			expect(parseInt(splitData[1])).to.be.a('number');
			var ttl = parseInt(splitData[1]);
			expect(ttl).to.be.above(0);
		});

		it("[2pts] return should have the expected ip address", function() {
			expect(splitData).to.not.be.undefined;
			expect(splitData[2]).to.not.be.undefined;
			expect([
				'208.71.44.30',
				'208.71.44.31'
				]).to.include(splitData[2]);
			part_function += 1;
		});





		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #7
	describe('>>>>>>>>>> #7 [2pt] the TTL reported is the shortest', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'www.cs.ubc.ca';
		var trace = '-t';
		var traceData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					traceData = breakDownTrace(retData);
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);   var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url, trace]);
		
         	child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

        it("[IGNORE] shortest TTL should be used every step of the way??? ", function() {
        	var isValid = true;
        	expect(traceData).to.not.be.undefined;
			expect(traceData.tracing).to.not.be.undefined;
        	if (traceData && traceData.tracing) {
				var i;
				var smallestTTL = 9999999;
				var currentSmallest = [];
				for (i = 0; i < traceData.tracing.length; ++i) {
					var item = traceData.tracing[i];
					expect(item).to.not.be.undefined;
					expect(item.queryHost).to.not.be.undefined;
					expect(item.answers).to.not.be.undefined;
					expect(item.additionals).to.not.be.undefined;
					expect(item.additionals).to.not.be.undefined;
					if (item) {
						if (i > 0) {
							if (item.queryHost && currentSmallest) {
								var usingShorestTTL = (currentSmallest.indexOf(item.queryHost) > -1);
								if (!usingShorestTTL) {
									isValid = false;
									break;
						  		}
						  		smallestTTL = 999999;
						  		currentSmallest = [];
						  	}
						}
						var trace = [];
						var ans = item.answers;
						var add = item.additionals;
						if (ans) {
						  	trace = trace.concat(ans);
						}
						if (add) {
						  	trace = trace.concat(add);
						}
						if (trace) {
						  	trace.forEach(function(a) {
						  		expect(a).to.not.be.undefined;
						  		expect(a.ip).to.not.be.undefined;
						  		expect(a.ttl).to.not.be.undefined;
								if (a && a.ip && a.ttl) {
									if (a.ttl == smallestTTL) {
										currentSmallest.push(a.ip);
									} else if (parseInt(a.ttl) < smallestTTL) {
										currentSmallest = [];
										smallestTTL = parseInt(a.ttl);
										currentSmallest.push(a.ip);
									}
								}
							});
						}
					}
				}
			}
			expect(isValid).to.equal(true);
			// part_function += 1;
		});
		
		it("[2pts] shortest TTL should be used for the final answer", function() {
        	var isValid = true;
        	expect(traceData).to.not.be.undefined;
			expect(traceData.tracing).to.not.be.undefined;
			expect(traceData.finalAnswer).to.not.be.undefined;
        	if (traceData && traceData.tracing && traceData.finalAnswer) {
				var smallestTTL = 9999999;
				var currentSmallest = [];
				expect(traceData.tracing[traceData.tracing.length - 1]).to.not.be.undefined;
				expect(traceData.tracing[traceData.tracing.length - 1].answers).to.not.be.undefined;

				var ans = traceData.tracing[traceData.tracing.length - 1].answers;
				if (ans) {
					ans.forEach(function(a) {
						expect(a).to.not.be.undefined;
						expect(a.ip).to.not.be.undefined;
						expect(a.ttl).to.not.be.undefined;
						if (a && a.ip && a.ttl) {
							if (a.ttl == smallestTTL) {
								currentSmallest.push(a.ip);
							} else if (parseInt(a.ttl) < smallestTTL) {
								currentSmallest = [];
								smallestTTL = parseInt(a.ttl);
								currentSmallest.push(a.ip);
							}
						}
					});
				}
				var finalsplit = traceData.finalAnswer;
				if (finalsplit && finalsplit.length == 3 && currentSmallest) {
					var usingShorestTTL = (currentSmallest.indexOf(finalsplit[2]) > -1);
					if (!usingShorestTTL) {
						isValid = false;
					}
				}
			}
			expect(isValid).to.equal(true);
			part_function += 2;
		});

		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});
	
	after(function () {
		console.log();
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		console.log('Functionality ['+part_function+'/22]');
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		console.log();
	});
});

describe('Error Handling', function(){
	this.timeout(60000);

	// >>>>>>>>>> #1
	describe('>>>>>>>>>> #1 [/2] Timeout - nameserver doesnt respond', function () {
		var retData = '';
		var splitData;
		var nameServer = '198.162.35.192';
		var url = 'www.cs.ubc.ca';
		var trace = '';
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					// do your preprocessing here
  					var breakDown = breakDownNoTrace(retData);
  					splitData = breakDown.answer;
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
		    		lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

        var len = 0;
        it("[0pts] return shouldhave 3 items", function() {
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[0pts] return should have the original url", function() {
			expect(splitData[0]).to.equal(url);
		});

		it("[1pts] return should have the TTL field", function() {
			expect(splitData[1]).to.equal('-2');
			part_errhandle += 1;
		});

		it("[1pts] return should have the expected ip address", function() {
			expect(splitData[2]).to.equal('0.0.0.0');
			part_errhandle += 1;
		});

		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #2
	describe('>>>>>>>>>> #2 [/2] Too many queries', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'loop1.csproject.org';
		var trace = '';
		var splitData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					var breakDown = breakDownNoTrace(retData);
  					splitData = breakDown.answer;
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

		var len = 0;
		it("[0pts] return shouldhave 3 items", function() {
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[0pts] return should have the original url", function() {
			expect(splitData[0]).to.equal(url);
		});

		it("[1pts] return should have the TTL field", function() {
			expect(splitData[1]).to.equal('-3');
			part_errhandle += 1;
		});

		it("[1pts] return should have the expected ip address", function() {
			expect(splitData[2]).to.equal('0.0.0.0');
			part_errhandle += 1;
		});


		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #3
	describe('>>>>>>>>>> #3  [/2] Name does not resolve reports -1 for the TTL', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'wee.cs.ubc.ca';
		var trace = '';
		var splitData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					var breakDown = breakDownNoTrace(retData);
  					splitData = breakDown.answer;
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

		var len = 0;
		it("[0pts] return shouldhave 3 items", function() {
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[1pts] return should have the original url", function() {
			expect(splitData[0]).to.equal(url);
			
		});

		it("[0pts] return should have the TTL field", function() {
			expect(splitData[1]).to.equal('-1');
			part_errhandle += 1;
		});

		it("[1pts] return should have the expected ip address", function() {
			expect(splitData[2]).to.equal('0.0.0.0');
			part_errhandle += 1;
		});



		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #4a
	describe('>>>>>>>>>> #4a [/1] Other types of errors', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'ca';
		var trace = '';
		var splitData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					var breakDown = breakDownNoTrace(retData);
  					splitData = breakDown.answer;
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

        var len = 0;
		it("[0pts] return shouldhave 3 items", function() {
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[1pts] return should have the original url", function() {
			expect(splitData[0]).to.equal(url);
			
		});

		it("[0pts] return should have the TTL field", function() {
			expect(splitData[1]).to.equal('-4');
			part_errhandle += 1;
		});

		it("[1pts] return should have the expected ip address", function() {
			expect(splitData[2]).to.equal('0.0.0.0');
		});



		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #4b
	describe('>>>>>>>>>> #4b [/1] Other types of errors', function () {
		var retData = '';
		var nameServer = 'ab.ba.ab.ba';
		var url = 'www.google.com';
		var trace = '';
		var splitData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					var breakDown = breakDownNoTrace(retData);
  					splitData = breakDown.answer;
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

        var len = 0;
		it("[0pts] return shouldhave 3 items", function() {
			expect(splitData).to.not.be.undefined;
        	len = splitData.length;
        	expect(len).to.not.be.undefined;
			expect([3,44]).to.include(parseInt(len));
		});

		it("[1pts] return should have the original url", function() {
			expect([url,'Usage:']).to.include(splitData[0]);
		});

		it("[0pts] return should have the TTL field", function() {
			expect(['-4','java']).to.include(splitData[1]);
			part_errhandle += 1;
		});

		it("[1pts] return should have the expected ip address", function() {
			expect(['0.0.0.0','-jar']).to.include(splitData[2]);
		});



		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});
	
	after(function () {
		console.log();
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		console.log('Error Handling ['+part_errhandle+'/8]');
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		console.log();
	});
});

describe('Tracing', function(){
	this.timeout(60000);

	// >>>>>>>>>> #1
	describe('>>>>>>>>>> #1 [/2] Prints query ID, server being queried and FQDN', function () {
		var retData = '';
		var traceData;
		var nameServer = '192.112.36.4';
		var url = 'www.cs.ubc.ca';
		var trace = '-t';
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					// do your preprocessing here
  					if (retData) {
  						traceData = breakDownTrace(retData);
  					}
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url, trace]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
		    		lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

        it("[1pts] has the correct labels", function() {
        	var i;
        	var isValid = true;
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
			expect(traceData.tracing.length).to.be.above(0);
			for (i = 0; i < traceData.tracing.length; ++i) {
				var item = traceData.tracing[i];
				expect(item).to.not.be.undefined;
				var qid = item.queryID;
				var server = item.queryHost;
				var fqdn = item.queryURL;
				expect(qid).to.not.be.undefined;
				expect(server).to.not.be.undefined;
				expect(fqdn).to.not.be.undefined;
			}
			part_tracing += 1;
		});

		it("[1pts] has the correct labels and data", function() {
			var i;
			expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
			expect(traceData.tracing.length).to.be.above(0);
			for (i = 0; i < traceData.tracing.length; ++i) {
				var item = traceData.tracing[i];
				expect(item).to.not.be.undefined;
				var qid = item.queryID;
				var server = item.queryHost;
				var fqdn = item.queryURL;
				if (qid && fqdn && server) {
					expect(parseInt(qid)).to.be.a('number');
					expect(parseInt(qid)).to.be.above(0);
					expect(fqdn).to.be.a('string');
					expect(fqdn).to.equal(url);
					expect(server).to.be.a('string');
				}
			}
			part_tracing += 1;
		});


		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #2
	describe('>>>>>>>>>> #2 [/2] Query ID is different for every query during a run', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'www.cs.ubc.ca';
		var trace = '-t';
		var traceData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					if (retData) {
  						traceData = breakDownTrace(retData);
  					}
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url, trace]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

        it("[2pts] query id is different for every query", function() {
        	var listOfQID = [];
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
			expect(traceData.tracing.length).to.be.above(0);
			var i;
			expect(traceData.tracing.length).to.be.above(0);
			for (i = 0; i < traceData.tracing.length; ++i) {
				var item = traceData.tracing[i];
				expect(item).to.not.be.undefined;
				var qid = item.queryID;
				expect(qid).to.not.be.undefined;
				expect(listOfQID.indexOf(qid)).to.equal(-1);
				listOfQID.push(qid);
			}
			part_tracing += 2;
		});


		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #3
	describe('>>>>>>>>>> #3 [/1] Prints Response ID line, with query ID and whether or not this is an authoritative response', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'www.cs.ubc.ca';
		var trace = '-t';
		var traceData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					if (retData) {
  						traceData = breakDownTrace(retData);
  					}
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url, trace]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

		it("[1pts] has the correct labels and data", function() {
			console.log(traceData);
			var i;
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
			expect(traceData.tracing.length).to.be.above(0);
			for (i = 0; i < traceData.tracing.length; ++i) {
				var item = traceData.tracing[i];
				expect(item).to.not.be.undefined;
				var qid = item.queryID;
				var rid = item.responseID;
				var auth = item.isAuthoritative;
				expect(qid).to.not.be.undefined;
				expect(rid).to.not.be.undefined;
				expect(auth).to.not.be.undefined;
				expect(parseInt(qid)).to.be.a('number');
				expect(parseInt(qid)).to.be.above(-1);
				expect(parseInt(rid)).to.be.a('number');
				expect(parseInt(rid)).to.be.above(-1);
				expect(qid).to.equal(rid);
				expect([true, false]).to.include(auth);
			}
			part_tracing += 1;
		});


		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});

	// >>>>>>>>>> #4
	describe('>>>>>>>>>> #4 [/4] Prints the counts for the Ans, NS, and Additional Info includes TTL', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'www.cs.ubc.ca';
		var trace = '-t';
		var traceData;
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 15000 || (lastUpdatedTime != -1 && timeDiff > 3000)) {
  					if (retData) {
  						traceData = breakDownTrace(retData);
  					}
  					clearInterval(timer);
  					done();
  				} else {
  					currentTime += 1000;
  				}
			}, 1000);
            var child = require('child_process').spawn('java', ['-jar', 'DNSlookup.jar', nameServer, url, trace]);
			child.stdout.on('data', function(data) {
				if (data && data.toString() != 'undefined') {
					retData += data.toString(); 
					lastUpdatedTime = currentTime;
				}
			});
			child.stderr.on("data", function (data) {
		   		clearInterval(timer);
		   		console.log('Error occurred '+data.toString());
		   		done();
			});
	    });

        // ========================================================================
        // write your test here 
        // mocha js doc: https://mochajs.org/
        // chai js doc: http://chaijs.com/api/bdd/
        // chai-string api: http://chaijs.com/plugins/chai-string/

        it("[1pts] Prints the counts for the Answers", function() {
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
			var i;
			expect(traceData.tracing.length).to.be.above(0);
			for (i = 0; i < traceData.tracing.length; ++i) {
				var item = traceData.tracing[i];
				expect(item).to.not.be.undefined;
				var ansCount = item.numAnswer;
				var answers = item.answers;
				expect(ansCount).to.not.be.undefined;
				expect(answers).to.not.be.undefined;
				expect(parseInt(ansCount)).to.be.a('number');
				expect(answers.length).to.equal(parseInt(ansCount));
			}
			part_tracing += 1;
		});

		it("[1pts] Prints the counts for the Nameservers", function() {
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
			var i;
			expect(traceData.tracing.length).to.be.above(0);
			for (i = 0; i < traceData.tracing.length; ++i) {
				var item = traceData.tracing[i];
				expect(item).to.not.be.undefined;
				var nsCount = item.numNameserver;
				var nses = item.nameServers;
				expect(nsCount).to.not.be.undefined;
				expect(nses).to.not.be.undefined;
				expect(parseInt(nsCount)).to.be.a('number');
				expect(nses.length).to.equal(parseInt(nsCount));
			}
			part_tracing += 1;
		});

		it("[1pts] Prints the counts for the Additional Information", function() {
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
			var i;
			expect(traceData.tracing.length).to.be.above(0);
			var len = traceData.tracing.length;
			for (i = 0; i < len; ++i) {
				var item = traceData.tracing[i];
				expect(item).to.not.be.undefined;
				var addCount = item.numAdditional;
				var additionls = item.additionals;
				expect(addCount).to.not.be.undefined;
				expect(additionls).to.not.be.undefined;
				expect(parseInt(addCount)).to.be.a('number');
				expect(additionls.length).to.equal(parseInt(addCount));
			}
			part_tracing += 1;
		});

		it("[1pts] Format is as required and includes TTL", function() {
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
			var i;
			expect(traceData.tracing.length).to.be.above(0);
			for (i = 0; i < traceData.tracing.length; ++i) {
				var item = traceData.tracing[i];
				expect(item).to.not.be.undefined;
				var answers = item.answers;
				expect(answers).to.not.be.undefined;
				var nameServers = item.nameServers;
				expect(nameServers).to.not.be.undefined;
				var additionals = item.additionals;
				expect(additionals).to.not.be.undefined;
				var tracing = [].concat.apply([], [answers, nameServers, additionals]);
				expect(tracing).to.not.be.undefined;
				tracing.forEach(function(a) {
					expect(a).to.not.be.undefined;
					expect(a.url).to.not.be.undefined;
					expect(a.ttl).to.not.be.undefined;
					expect(a.typer).to.not.be.undefined;
					expect(a.ip).to.not.be.undefined;
					expect(parseInt(a.ttl)).to.be.a('number');
					expect(parseInt(a.ttl)).to.be.above(0);
				});
			}
			part_tracing += 1;
		});

		// ========================================================================
		// runs after block test is done, dont touch
		after(function() {
			// console.log();
			// console.log('---------------------------------------------------------------------------');
			// console.log();
			// console.log('Actual Return: ');
			// console.log(retData);
		 	// console.log();
		 	// console.log('===========================================================================');
		 	// console.log();
		});
	});
	
	after(function () {
		var suggestedGrade = part_function+part_errhandle+part_tracing;
		console.log();
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		console.log('Tracing ['+part_tracing+'/9]');
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		console.log();
		console.log();
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		console.log('Grade Suggestion ['+suggestedGrade+'/39]');
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		console.log();
	});
});



//
// Retruns {tracing, finalAnswer}
// 
// Tracing contains a list of aQuery: 
//		[{
//			queryID: '0',  <- should equal to responseID
//			queryURL: '',  <- should always be your query
//			queryHost: '', 
//			responseID: '0', <- should equal to queryID
//			isAuthoritative: 'false',
//			numAnswer: '0', <- this is the number shown in Answers(??)
//			answers: [],
//			numNameserver: '0', <- this is the number shown in Nameservers(??)
//			nameServers: [],
//			numAdditional: '0', <- this is the number shown in Additional Information(??)
//			additionals: []
//		}]
//
// answers, nameServers and additionals contains a list of:
// 		{
//			url: 'fs1.ugrad.cs.ubc.ca',
//			ttl: '2142',
//			typer: 'A',
//			ip: '198.162.35.1'
//		}
//
//
// Final Answer is the actual answer returned by the program
// 		www.cs.ubc.ca 2600 111.222.333.444
// 
// if you use -t and need the full data, call this function
function breakDownTrace(data) {
	var isValid = false;
	var result = [];
	var finans;
	try {
		if (data) {
			console.log(data);
			var eachTraceBlock = data.split('\n\n');
			for (var i = 0; i < eachTraceBlock.length; ++i){
				var rawQuery = eachTraceBlock[i];
				if (rawQuery) {
					var isLast = (i == eachTraceBlock.length - 1);
					var querySplit = preprocessRawQuery(rawQuery);
					var queryLine = parseQueryLine(querySplit);
					var resonseLine = parseResponseLine(querySplit);
					var ans = parseAnswer(querySplit);
					var nameservers = parseNameServer(querySplit);
					var addtional = parseAdditional(querySplit, isLast);
					var aQuery = {
						queryID: queryLine.QueryID,
						queryURL: queryLine.FQDN,
						queryHost: queryLine.Host,
						responseID: resonseLine.ResponseID,
						isAuthoritative: resonseLine.isAuth,
						numAnswer: ans.numAnswers,
						answers: ans.answers,
						numNameserver: nameservers.numNS,
						nameServers: nameservers.ns,
						numAdditional: addtional.numAdd,
						additionals: addtional.adds
					};
					if (isLast) {
						finans = addtional.finalAns;
					}
					result.push(aQuery);
				}
			}
			if (result && result[result.length - 1]) {
				var lastQuery = result[result.length - 1];
				var lastNumAdditional = lastQuery.numAdditional;
				var lastAdditional = lastQuery.additionals;
				if (lastNumAdditional && lastAdditional) {
					if (lastAdditional.length > lastNumAdditional) {
						lastAdditional.pop();
						result.pop();
						result.push({
							queryID: lastQuery.queryID,
							queryURL: lastQuery.queryURL,
							queryHost: lastQuery.queryHost,
							responseID: lastQuery.responseID,
							isAuthoritative: lastQuery.isAuthoritative,
							numAnswer: lastQuery.numAnswer,
							answers: lastQuery.answers,
							numNameserver: lastQuery.numNameserver,
							nameServers: lastQuery.nameServers,
							numAdditional: lastQuery.numAdditional,
							additionals: lastAdditional
						});
					}
				}
			}

		} else {
			isValid = false;
		}
	} catch (err) {
		console.log('PARSE ERROR '+err);
		result = undefined;
		finans = undefined;
	}
	return {tracing: result, finalAnswer: finans, check: isValid};
}

function preprocessRawQuery(raw) {
	var result;
	if (raw) {
		var pass1 = raw.trim().replace(/\r\n/g, '\n');
		var pass2 = pass1.trim().replace(/\n\n/g, '\n');	
		var pass3 = pass2.trim().replace(/\r/g, '');
		result = pass3.trim().split('\n');
	} 
	return result;
}

function parseQueryLine(query) {
	var qid;
	var fqdn;
	var host;
	var lineNum;
	if (query) {
		lineNum = 0;
		query.forEach(function(line) {
			if (line && line.indexOf('Query ID') > -1) {
				var words = line.trim().split(/\s+/);
				if (words) {
					qid = words[2];
					fqdn = words[3];
					host = words[5];
				}
				return;
			}
			lineNum += 1;
		});
	} 
	return {QueryID: qid, FQDN: fqdn, Host: host, pos: lineNum};
}

function parseResponseLine(query) {
	var rid;
	var auth;
	var lineNum;
	if (query) {
		lineNum = 0;
		query.forEach(function(line) {
			if (line && line.indexOf('Response ID') > -1) {
				var words = line.trim().split(/\s+/);
				if (words) {
					rid = words[2];
					if (words[4] && (words[4].indexOf('true') > -1 || words[4].indexOf('false') > -1)) {
						auth = words[4].indexOf('true') > -1;
					} else if (words[5]) {
						auth = words[5].indexOf('true') > -1;
					}
				}
				return;
			}
			lineNum += 1;
		});
	} 
	return {ResponseID: rid, isAuth: auth, pos: lineNum};
}

function parseAnswer(query) {
	var result;
	var lineNum;
	var numOfAnswers;
	var start = false;
	if (query) {
		var i;
		result = [];
		lineNum = 0;
		for (i = 0; i < query.length; ++i) {
			var line = query[i];
			if (line) {
				if (line.indexOf('Nameservers (') > -1) {
					break;
				}
				else if (line.indexOf('Answers (') > -1) {
					numOfAnswers = line.trim().replace(/[^0-9]/gi, '');
					start = true;
				} else if (start) {
					var words = line.trim().split(/\s+/);
					result.push({
						url: words[0],
						ttl: words[1],
						typer: words[2],
						ip: words[3]});
				}
			}
			lineNum += 1;
		}
	} 
	return {numAnswers: numOfAnswers, answers: result, pos: lineNum};
}

function parseNameServer(query) {
	var result;
	var numOfNS;
	var lineNum;
	var start = false;
	if (query) {
		var i;
		result = [];
		lineNum = 0;
		for (i = 0; i < query.length; ++i) {
			var line = query[i];
			if (line) {
				if (line.indexOf('Additional Information') > -1) {
					break;
				} else if (line.indexOf('Nameservers (') > -1) {
					numOfNS = line.trim().replace(/[^0-9]/gi, '');
					start = true;
				} else if (start) {
					var words = line.trim().split(/\s+/);
					result.push({
						url: words[0],
						ttl: words[1],
						typer: words[2],
						ip: words[3]});
				}
			}
			lineNum += 1;
		}
	} 
	return {numNS: numOfNS, ns: result, pos: lineNum};
}

function parseAdditional(query, isLast) {
	var result;
	var finAns;
	var lineNum;
	var numAdditional;
	var start = false;
	if (query) {
		var i;
		result = [];
		lineNum = 0;
		for (i = 0; i < query.length; ++i) {
			var line = query[i];
			if (line) {
				var words = line.trim().split(/\s+/);
				if (line.indexOf('Additional Information') > -1) {
					numAdditional = line.trim().replace(/[^0-9]/gi, '');
					start = true;
				} else if (words && start) {
					if (i == query.length - 1 && isLast) {
						finAns = {
							url: words[0],
							ttl: words[1],
							typer: 'FIN',
							ip: words[2]};
					} else {
						result.push({
							url: words[0],
							ttl: words[1],
							typer: words[2],
							ip: words[3]});
					}
				}
			}
			lineNum += 1;
		}
	} 
	return {finalAns: finAns, numAdd: numAdditional, adds: result, pos: lineNum};
}

function breakDownNoTrace(data) {
	var isValid = false;
	var result;
	var finalAnswer;
	try {
		if (data) {
			result = data.trim().split(/\s+/);
		} else {
			isValid = false;
		}
	} catch (err) {
		console.log('PARSE ERROR '+err);
		result = undefined;
		isValid = false;
	}
	return {answer: result, check: isValid};
}