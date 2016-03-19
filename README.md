# a2_test_script

How to run:
------
Since student's code may fail more often, instead of running 'mocha', I suggest export it to a file.
Instead of 'mocha' **do 'mocha --reporter spec > report.txt' instead**
This will output it to a file with all the stacktraces if their program crashed.

Test Coverage
Functionality: [/22]
------
   **COVERED**
   [/2] Basic query to a name server that is authoritative.
   	(e.g. www.cs.ubc.ca to 198.162.35.1)

   **COVERED** 
   [/5] Basic Query that starts at root server and works to an authoritative server but doesn't do anything strange. (e.g. www.cs.ubc.ca to a root name server)

   **COVERED**
   [/5] A basic type query that results in a CNAME and the need to restart the search for the alias. (e.g. prep.ai.mit.edu)

   *NOT COVERED*
   [/3] A query that returns a name server to use where the name server's address isn't provided. (e.g. www.stanford.edu)

   *NOT COVERED*
   [/3] A complicated lookup series that potentially involves multiple cnames and DNS server name lookups (finance.google.ca)

   *NOT COVERED*
   [/2] Can deal with information in the additional information section when not all of it is of interest/use (e.g. groups.yahoo.com)
  
   **COVERED**
   [/2] The TTL is reported and is the shortest TTL from the A record or any CNAMEs leading to that record.  





Error Handling: [/8]
------
   In this next section there is 1 mark for detecting the error and
   another for properly printing the output
   
   **COVERED**
   [/2] Timeout - nameserver doesn't respond

   **COVERED**
   [/2] Too many queries (e.g. loop1.csproject.org)

   **PARTIALLY COVERED (MANUALLY CHECK CODE)**
   [/2] Name does not resolve returns 3 for rcode and reports -1 for the TTL (e.g. wee.cs.ubc.ca)

   **PARTIALLY COVERED (MANUALLY CHECK CODE)**
   [/2] Other types of errors (e.g. ca)
  



Tracing: [/9]
------
  *NOT COVERED*
  [/2] Prints query ID, server being queried and FQDN
  
  *NOT COVERED*
  [/2] Query ID is different for every query during a run
  
  *NOT COVERED*
  [/1] Prints Response ID line, with query ID and whether or not this is an authoritative response

  *NOT COVERED*
  [/4] Prints the counts for the Answers, Nameservers, and Additional
  Information fields. Format is as required and includes TTL





**(NOT COVERING)**
PROGRAM STRUCTURE AND STYLE: [/18]
