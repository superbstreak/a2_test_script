=================================================================
	CPSC 317 Assignment 2 - DNSlookup Test Script with Mocha.js

=================================================================
Setup:
	you need node js, mocha js, chai js and chai-string js
	- to get mocha js: npm install mocha
	- to get chai js: npm install chai
	- to get chai-string: npm install chai-string

	check out the documentation on different assert functions and add some tests remember to redefine the nameServer, url and trace field before each block test. 

	make sure the DNSlooup.jar file is in the same location as the script to run, simply travers to the test folder and type 'mocha --reporter spec > report.txt'


=================================================================
Running the Test:
	Since student's code may fail more often, I suggest exporting result to a file. Instead of 'mocha' do 'mocha --reporter spec > report.txt' instead. This will output it to a file with all the stacktraces if their program crashed.


=================================================================
Reading Test Results:
	
>>>>>> Please manually check over all failed tests. <<<<<<<
	
A passed Test
	>>>>>>>>>> #1 [2pt] Basic query to a name server that is authoritative
      √ [0pts] return shouldhave 3 items
      √ [1pts] return should have the original url
      √ [0pts] return should have the TTL field
      √ [0pts] return should have the TTL > 0
      √ [1pts] return should have the expected ip address

A Single failed Test: correctly formatted but incorrect data
	>>>>>>>>>> #5 [3pt] a complicated lookup series
      √ [0pts] return shouldhave 3 items
      √ [0pts] return should have the original url
      √ [0pts] return should have the TTL field
      √ [0pts] return should have the TTL > 0
      1) [3pts] return should have the expected ip address

A failed Test: all tests failed
	>>>>>>>>>> #1 [/2] Timeout - nameserver doesnt respond
      2) [0pts] return shouldhave 3 items
      3) [0pts] return should have the original url
      4) [1pts] return should have the TTL field
      5) [1pts] return should have the expected ip address

Program Crashed trigged failed test
    >>>>>>>>>> #4b [/1] Other types of errors
Error occurred Exception in thread "main" 
Error occurred java.net.UnknownHostException: ab.ba.ab.ba
      10) "before all" hook
Error occurred 
	at java.net.Inet6AddressImpl.lookupAllHostAddr(Native Method)
	at java.net.InetAddress$2.lookupAllHostAddr(Unknown Source)
	at java.net.InetAddress.getAddressesFromNameService(Unknown Source)
	at java.net.InetAddress.getAllByName0(Unknown Source)
	at java.net.InetAddress.getAllByName(Unknown Source)
	at java.net.InetAddress.getAllByName(Unknown Source)
	at java.net.InetAddress.getByName(Unknown Source)
	at DNSlookup.main(DNSlookup.java:41)

      11) [0pts] return shouldhave 3 items
      12) [1pts] return should have the original url
      13) [0pts] return should have the TTL field
      14) [1pts] return should have the expected ip address


=================================================================
Test Coverage:
	>>>>>> Please manually check over all failed tests. <<<<<<<

	Functionality: [/22] (If a test failed, please investigate)
	COVERED [/2] Basic query to a name server that is authoritative.
	COVERED [/5] Basic Query that starts at root server and works to an 
				authoritative server but doesn't do anything strange.
	COVERED [/5] A basic type query that results in a CNAME and the need to 
				restart the search for the alias. (e.g. prep.ai.mit.edu)
	COVERED [/3] A query that returns a name server to use where the name
				 server's address isn't provided. (e.g. www.stanford.edu)
	COVERED [/3] A complicated lookup series that potentially involves 
				multiple cnames and DNS server name lookups
	COVERED [/2] Can deal with information in the additional information 
				section when not all of it is of interest/use
	COVERED [/2] The TTL is reported and is the shortest TTL from the A 
				record or any CNAMEs leading to that record.

	Error Handling: [/8] (Please manually check code as well)
	COVERED [/2] Timeout - nameserver doesn't respond
	COVERED [/2] Too many queries (e.g. loop1.csproject.org)
	COVERED [/2] Name does not resolve returns 3 for rcode and reports -1 for
				 the TTL (e.g. wee.cs.ubc.ca)
	COVERED [/2] Other types of errors (e.g. ca)


	Tracing: [/9] (Please manually do at least one -t)
	COVERED [/2] Prints query ID, server being queried and FQDN
	COVERED [/2] Query ID is different for every query during a run
	COVERED [/1] Prints Response ID line, with query ID and whether or not 
				this is an authoritative response
	COVERED  [/4] Prints the counts for the Answers, Nameservers, and Additional Information fields. Format is as required and includes TTL

	(NOT COVERED) PROGRAM STRUCTURE AND STYLE: [/18]

=================================================================