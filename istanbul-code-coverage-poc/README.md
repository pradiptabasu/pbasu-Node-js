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

_coverageTest and coverageTest1 are custome npm scripts ahence had to include the keyword run in command_

##Below are the commands to run the instanbul and mocha tests    

##//for local npm install   in istanbul-code-coverage-poc   
##//this will not check for source files not covered in test suite   
node_modules\.bin\_mocha test -R spec  
node_modules\.bin\istanbul cover node_modules\mocha\bin\_mocha test -R spec  
node_modules\.bin\istanbul cover node_modules\mocha\bin\_mocha test -- -R spec  
node_modules\.bin\istanbul cover node_modules\mocha\bin\_mocha .\test -- -R spec  

##//for local npm install   in istanbul-code-coverage-poc    with   --include-all-sources  
##//--include-all-sources cover all sources files, including the files not added in test cases as require  
node_modules\.bin\_mocha test -R spec  
node_modules\.bin\istanbul --include-all-sources cover node_modules\mocha\bin\_mocha test -R spec  
node_modules\.bin\istanbul --include-all-sources cover node_modules\mocha\bin\_mocha test -- -R spec  
node_modules\.bin\istanbul --include-all-sources cover node_modules\mocha\bin\_mocha .\test -- -R spec  