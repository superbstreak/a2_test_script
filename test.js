// READ ME FIRST
// you need node js, mocha js and chai js
// to get mocha js: npm install mocha
// to get chai js: npm install chai
// to get chai-string: npm install chai-string
// check out the documentation on different assert functions and add some tests
// remember to redefine the nameServer, url and trace field before each block test
//
// make sure the DNSlooup.jar file is in the same location as the script
// to run, simply travers to the test folder and type 'mocha'

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

	// #1
	describe('#1 [2pt] Basic query to a name server that is authoritative', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
  					// do your preprocessing here
  					if (retData) {
  						splitData = retData.trim().split(/\s+/);
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

        var len = 0;
        it("[0pts] return shouldhave 3 items", function() {
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[1pts] return should have the original url", function() {
			expect(splitData[0]).to.equal(url);
			part_function += 1;
		});

		it("[0pts] return should have the TTL field", function() {
			expect(parseInt(splitData[1])).to.be.a('number');
		});

		it("[0pts] return should have the TTL > 0", function() {
			var ttl = parseInt(splitData[1]);
			expect(ttl).to.be.above(0);
		});

		it("[1pts] return should have the expected ip address", function() {
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

	// #2
	describe('#2 [5pt] Basic query start with root', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
  					if (retData) {
  						splitData = retData.trim().split(/\s+/);
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

		var len = 0;
		it("[0pts] return shouldhave 3 items", function() {
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[1pts] return should have the original url", function() {
			expect(splitData[0]).to.equal(url);
			part_function += 1;
		});

		it("[0pts] return should have the TTL field", function() {
			expect(parseInt(splitData[1])).to.be.a('number');
		});

		it("[0pts] return should have the TTL > 0", function() {
			var ttl = parseInt(splitData[1]);
			expect(ttl).to.be.above(0);
		});

		it("[4pts] return should have the expected ip address", function() {
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

	// #3
	describe('#3 [5pt] basic type query result in a cname', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
  					if (retData) {
  						splitData = retData.trim().split(/\s+/);
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

		var len = 0;
		it("[0pts] return shouldhave 3 items", function() {
        	len = splitData.length;
			expect(splitData).to.have.lengthOf(3);
		});

		it("[1pts] return should have the original url", function() {
			expect(splitData[0]).to.equal(url);
			part_function += 1;
		});

		it("[0pts] return should have the TTL field", function() {
			expect(parseInt(splitData[1])).to.be.a('number');
		});

		it("[0pts] return should have the TTL > 0", function() {
			var ttl = parseInt(splitData[1]);
			expect(ttl).to.be.above(0);
		});

		it("[4pts] return should have the expected ip address", function() {
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

	// #4
	describe('#4 [3pt] query that reutns a name server', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'www.stanford.edu';
		var trace = '';
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
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

		it("[1pts] return should have the original url", function() {
			expect(retData).to.contain(url);
			part_function += 1;
		});

		it("[2pts] return should have the expected ip address", function() {
			retData.should.endWith('52.11.42.24\r\n');
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

	// #5
	describe('#5 [3pt] a complicated lookup series', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'finance.google.ca';
		var trace = '';
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
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

		it("[1pts] return should have the original url", function() {
			expect(retData).to.contain(url);
			part_function += 1;
		});

		it("[2pts] return should have the expected ip address", function() {
			retData.should.endWith('52.11.42.24\r\n');
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

	// #6
	describe('#6 [2pt] can deal with info in the additional field', function () {
		var retData = '';
		var nameServer = '192.112.36.4';
		var url = 'groups.yahoo.com';
		var trace = '';
		// ========================================================================
		// access child process, mess but works :]
        before(function (done) {
        	var lastUpdatedTime = -1;
        	var currentTime = 0;
        	var timer = setInterval(function (){
        		var timeDiff = currentTime - lastUpdatedTime;
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
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

		it("[0.5pts] return should have the original url", function() {
			expect(retData).to.contain(url);
			part_function += 0.5;
		});

		it("[1.5pts] return should have the expected ip address", function() {
			retData.should.endWith('208.71.44.30\r\n');
			part_function += 1.5;
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

	// #7
	describe('#7 [2pt] the TTL reported is the shortest', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
  					if (retData) {
  						traceData = breakDownTrace(retData);
  					}
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

        it("[?pts] shortest TTL should be used every step of the way??? ", function() {
        	var isValid = true;
        	if (traceData && traceData.tracing) {
				var i;
				var smallestTTL = 9999999;
				var currentSmallest = [];
				for (i = 0; i < traceData.tracing.length; ++i) {
					var item = traceData.tracing[i];
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
        	if (traceData && traceData.tracing && traceData.finalAnswer) {
				var i;
				var smallestTTL = 9999999;
				var currentSmallest = [];
				var ans = traceData.tracing[traceData.tracing.length].answers;
				if (ans) {
					ans.forEach(function(a) {
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
				var finalsplit = traceData.finalAnswer.split('/\s+/')
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

	// #1
	describe('#1 [/2] Timeout - nameserver doesnt respond', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
  					// do your preprocessing here
  					if (retData) {
  						splitData = retData.trim().split(/\s+/);
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

	// #2
	describe('#2 [/2] Too many queries', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
  					if (retData) {
  						splitData = retData.trim().split(/\s+/);
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

	// #3
	describe('#3  [/2] Name does not resolve reports -1 for the TTL', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
  					if (retData) {
  						splitData = retData.trim().split(/\s+/);
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

	// #4
	describe('#4 [/2] Other types of errors', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
  					if (retData) {
  						splitData = retData.trim().split(/\s+/);
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

	// #1
	describe('#1 [/2] Prints query ID, server being queried and FQDN', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
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
        	var isValid = true;
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
        	if (traceData && traceData.tracing) {
				var i;
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
			}
			part_tracing += 1;
		});

		it("[1pts] has the correct labels and data", function() {
        	var isValid = true;
        	if (traceData && traceData.tracing) {
				var i;
				for (i = 0; i < traceData.tracing.length; ++i) {
					var item = traceData.tracing[i];
					if (item) {
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
				}
			}
			expect(isValid).to.equal(true);
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

	// #2
	describe('#2 [/2] Query ID is different for every query during a run', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
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
        	if (traceData && traceData.tracing) {
				var i;
				for (i = 0; i < traceData.tracing.length; ++i) {
					var item = traceData.tracing[i];
					if (item) {
						var qid = item.queryID;
						if (qid) {
							expect(listOfQID.indexOf(qid)).to.equal(-1);
							listOfQID.push(qid);
						}
					}
				}
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

	// #3
	describe('#3 [/1] Prints Response ID line, with query ID and whether or not this is an authoritative response', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
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
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
        	if (traceData && traceData.tracing) {
				var i;
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
					expect(parseInt(qid)).to.be.above(0);
					expect(parseInt(rid)).to.be.a('number');
					expect(parseInt(rid)).to.be.above(0);
					expect(qid).to.equal(rid);
					expect(['true', 'false']).to.include(auth);
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

	// #4
	describe('#4 [/4] Prints the counts for the Ans, NS, and Additional Info includes TTL', function () {
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
  				if (currentTime > 11000 || (lastUpdatedTime != -1 && timeDiff > 1000)) {
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
        	if (traceData && traceData.tracing) {
				var i;
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
			}
			part_tracing += 1;
		});

		it("[1pts] Prints the counts for the Nameservers", function() {
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
        	if (traceData && traceData.tracing) {
				var i;
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
			}
			part_tracing += 1;
		});

		it("[1pts] Prints the counts for the Additional Information", function() {
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
        	if (traceData && traceData.tracing) {
				var i;
				for (i = 0; i < traceData.tracing.length; ++i) {
					var item = traceData.tracing[i];
					expect(item).to.not.be.undefined;
					var addCount = item.numAdditional;
					var additionls = item.additionals;
					expect(addCount).to.not.be.undefined;
					expect(additionls).to.not.be.undefined;

					expect(parseInt(addCount)).to.be.a('number');
					expect(additionls.length).to.equal(parseInt(addCount));
				}
			}
			part_tracing += 1;
		});

		it("[1pts] Format is as required and includes TTL", function() {
        	expect(traceData).to.not.be.undefined;
        	expect(traceData.tracing).to.not.be.undefined;
        	if (traceData && traceData.tracing) {
				var i;
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
		console.log();
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		console.log('Tracing ['+part_tracing+'/9]');
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
	var result = [];
	var finalAnswer;
	if (data) {
		var eachTraceBlock = data.split('\n\n');
		if (eachTraceBlock) {
			var i;
			for (i = 0; i < eachTraceBlock.length; ++i) {
				var rawQuery = eachTraceBlock[i];
				if (rawQuery && rawQuery.length > 0) {
					var aQuery = {
						queryID: '0',
						queryURL: '',
						queryHost: '',
						responseID: '0',
						isAuthoritative: 'false',
						numAnswer: '0',
						answers: [],
						numNameserver: '0',
						nameServers: [],
						numAdditional: '0',
						additionals: []
					};
					var splitByLine = rawQuery.split('\r\n');
					
					if (splitByLine && splitByLine.length > 0) {
						var j;
						if (splitByLine && splitByLine.length > 0) {
							var offset = 0;
							var hasAnswer = false;
							var hasNameserver = false;

							// get query line
							var rawQueryLine = splitByLine[offset];
							if (rawQueryLine) {
								var queryLine = rawQueryLine.trim().split(/\s+/);
								aQuery.queryID = queryLine[2];
								aQuery.queryURL = queryLine[3];
								aQuery.queryHost = queryLine[5];
								offset += 1;
							}							

							// get response line
							var rawResponseLine = splitByLine[offset];
							if (rawResponseLine) {
								var responseLine = rawResponseLine.trim().split(/\s+/);
								aQuery.responseID = responseLine[2];
								aQuery.isAuthoritative = responseLine[5];
								offset += 1;
							}


							// get answers
							var rawAnswerLine = splitByLine[offset];
							if (rawAnswerLine) {
								var answerLine = rawAnswerLine.trim().split(/\s+/);
								aQuery.numAnswer = answerLine[1].replace(/[^0-9]/gi, '');
								offset += 1;
							}
							var answerLength = parseInt(aQuery.numAnswer);
							var a;
							if (answerLength && answerLength > 0) {
								var rawAnswerLineSingle = splitByLine[offset];
								if (rawAnswerLineSingle) {
									var rawAnswers = rawAnswerLineSingle.split('\n');
									offset += 1;

									var answerLength = parseInt(aQuery.numAnswer);
									if (answerLength && answerLength > 0) {
										var a;
										for (a = 0; a < rawAnswers.length; ++a) {
											var answer = {
												url: '',
												ttl: '0',
												typer: '',
												ip: ''
											};
											var item = rawAnswers[a];
											if (item) {
												if (item.indexOf('Nameservers (') >= 0) { 
													aQuery.numNameserver = item.replace(/[^0-9]/gi, '');
													hasAnswer = true;
												} else {
													var splitAns = item.trim().split(/\s+/);
													answer.url = splitAns[0];
													answer.ttl = splitAns[1];
													answer.typer = splitAns[2];
													answer.ip = splitAns[3];
													aQuery.answers.push(answer);
												}
											}
										} 
									}
								}
							}

							// get name servers
							if(!hasAnswer) {
								var rawNSLine = splitByLine[offset];
								if (rawNSLine) {
									var nsLine = rawNSLine.trim().split(/\s+/);
									aQuery.numNameserver = nsLine[1].replace(/[^0-9]/gi, '');
									offset += 1;
								}
							}
							var nslength = parseInt(aQuery.numNameserver);
							var ns;
							if (nslength && nslength > 0) {
								var rawNSdata = splitByLine[offset];
								offset += 1;
								if (rawNSdata) {
									var rawNS = rawNSdata.split('\n');
									for (ns = 0; ns < rawNS.length; ++ns) {
										var nsitem = rawNS[ns];
										var namserver = {
											url: '',
											ttl: '0',
											typer: '',
											ip: ''
										};
										if (nsitem) {
											if (nsitem.indexOf('Additional Information') >= 0) { 
												aQuery.numAdditional = nsitem.replace(/[^0-9]/gi, '');
												hasNameserver = true;
											} else {
												var splitNS = nsitem.trim().split(/\s+/);
												namserver.url = splitNS[0];
												namserver.ttl = splitNS[1];
												namserver.typer = splitNS[2];
												namserver.ip = splitNS[3];
												aQuery.nameServers.push(namserver);
											}
										}
									} 
								}
							}


							// get additional
							if (!hasNameserver) {
								var rawADDLine = splitByLine[offset];
								offset += 1;
								if (rawADDLine) {
									var addtionalLine = rawADDLine.trim().split(/\s+/);
									aQuery.numAdditional = addtionalLine[1].replace(/[^0-9]/gi, '');
								}
							}
							var additionalLen = parseInt(aQuery.numAdditional);
							var add;
							if (additionalLen && additionalLen > 0) {
								var rawAddORG = splitByLine[offset];
								offset += 1;
								if (rawAddORG) {
									var rawAdd =  rawAddORG.split('\n');
									if (rawAdd && rawAdd.length > 0) {
										for (add = 0; add < rawAdd.length; ++add) {
											var additional = {
												url: '',
												ttl: '0',
												typer: '',
												ip: ''
											};
											var item = rawAdd[add];
											if (item) {
												if (add < aQuery.numAdditional) {
													var splitAdd = item.trim().split(/\s+/);
													additional.url = splitAdd[0];
													additional.ttl = splitAdd[1];
													additional.typer = splitAdd[2];
													additional.ip = splitAdd[3];
													aQuery.additionals.push(additional);
												} else {
													finalAnswer = item;
												}
											}
										}
									}
								}
							}
						}
					}
					result.push(aQuery);
				}
			}
		}
		// console.log(result);
	}
	return {tracing: result, answer: finalAnswer};
}


