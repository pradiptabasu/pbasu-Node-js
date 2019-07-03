var uri = 'http://localhost:8080/fc/fcengine/GetPackagesFilteredByClassifications/Classifications([TVFP_Access_Classification;a4e8c747-4f89-407b-ae72-1dbc49176b8a,4df9f9c2-5ff2-410a-9150-90baac28ec2d,92bb6e5b-e0c7-44d3-87e8-d9598fd575cd,be94dcba-df88-475b-a9d3-eb63089d656b,759e8b04-7cca-4e7c-9f1a-17a1804ade85,73c3e336-9cc1-424d-9ee3-f28320797e14;false])';
var encoded = encodeURI(uri);
console.log(encoded);
// expected output: "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"

try {
  console.log(decodeURI(encoded));

  
  console.log(decodeURI(encoded));


  // expected output: "https://mozilla.org/?x=шеллы"
} catch(e) { // catches a malformed URI
  console.error(e);
}