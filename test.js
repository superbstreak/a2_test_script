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
		var url = 'groups.yahoo.com';
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
  					// if (retData) {
  					// 	traceData = breakDownTrace(retData);
  					// }
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
			expect(url).to.contain(url);
			part_function += 0.5;
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

// under dev
// if you use -t and need the full data, call this function
function breakDownTrace(data) {
	var result = [];
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
					console.log('SPLINE '+splitByLine[3]);
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
										for (a = 0; a < answerLength; ++a) {
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
													console.log(aQuery.numNameserver);
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
									for (ns = 0; ns < nslength; ++ns) {
										var nsitem = rawNS[ns];
										var namserver = {
											url: '',
											ttl: '0',
											typer: '',
											ip: ''
										};
										if (nsitem) {
											if (nsitem.indexOf('Additional Information') >= 0) { 
												aQuery.numAdditional = nsitem.replace(/[^0-9]/, '');
												hasNameserver = true;
												console.log(aQuery.numAdditional);
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
									aQuery.numAdditional = addtionalLine[1].replace(/[^0-9]/, '');
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
										for (add = 0; add < additionalLen; ++add) {
											var additional = {
												url: '',
												ttl: '0',
												typer: '',
												ip: ''
											};
											var item = rawAdd[offset];
											if (item) {
												var splitAdd = item.trim().split(/\s+/);
												additional.url = splitAdd[0];
												additional.ttl = splitAdd[1];
												additional.typer = splitAdd[2];
												additional.ip = splitAdd[3];
												aQuery.additionals.push(additional);
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
		console.log(result);
	}
	return result;
}


