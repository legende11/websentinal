const fs = require('fs');
const printascii = () => {
fs.readFileSync('./src/ascii.txt').toString().split(',').forEach(arr => {
    console.log(arr)
})
}

module.exports ={
    printascii
}