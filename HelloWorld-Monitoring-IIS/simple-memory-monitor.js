const v8 = require('v8');

const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
arr.reverse();
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

arr.reverse();
const used1 = process.memoryUsage();
for (let key in used1) {
  console.log(`${key} ${Math.round(used1[key] / 1024 / 1024 * 100) / 100} MB`);
}

console.log(process.memoryUsage())
console.log("------>>>>>>>><<<<<<<-------")
console.log(v8.getHeapSpaceStatistics())
console.log("------>>>>>>>><<<<<<<-------")
console.log(v8.getHeapStatistics())
// require('memwatch-next').on('stats', stats => {
//     console.log("------>>>>>>>><<<<<<<-------")
//     console.log('Max memory consumption: ' + stats.max);
//   });