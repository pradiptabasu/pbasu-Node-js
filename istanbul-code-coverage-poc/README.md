istanbul-code-coverage-poc is written to 
================================================
Numbered list:
1. check code coverage for nested function calls without explicitely calling the nested function  
2. check for code coverage of source files not imported in test suite  

##Below are npm commands to work with this
npm install  
npm start  
npm test  
npm run coverageTest   
npm run coverageTest1  

_coverageTest and coverageTest1 are custome npm scripts and hence had to include the keyword run in command_

##Below are the commands to run the instanbul and mocha tests    
node_modules\.bin\_mocha test -R spec  
node_modules\.bin\istanbul cover --include-all-sources --root ./src node_modules\mocha\bin\_mocha .\test -- -R spec
node_modules\.bin\istanbul cover --include-all-sources --root ./src -x "sample-offerings" node_modules\mocha\bin\_mocha .\test -- -R spec

--include-all-sources --root ./src -x "sample-offerings"
  --include-all-sources      Includes all files for coverage check including those not "require" in test suite
  --root ./src               this instructs src folder as starting point of --include-all-sources and in effect does not include other folders which are not src or children of src
  -x "sample-offerings"      this instructs in exclude "sample-offerings" folder. this folder is not present in this project. this folder is part of FCE project. And this whole command will work for FCE
