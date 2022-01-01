/**
 * Copyright (c) 2021-2022 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * Usage: node depackIndexed.js <path/to/file.idx>
 */

const fs = require('fs');

if (process.argv.length !== 3) return console.log('Usage: <path to file.idx>');

const filebase = process.argv[2].slice(0, -4);

console.log(`Opening ${filebase}.idx`);

const idx = fs.readFileSync(`${filebase}.idx`);

let offset = 0;

const count = idx.readUInt16LE(offset);
offset += 2;

console.log('Found', count, 'chunks');

const indices = [];

for (let i = 0; i < count + 1; i++) {
    const datafile = idx.readUInt8(offset);
    offset += 1;
    const dataoffset = idx.readUInt16LE(offset);
    offset += 2;

    indices.push([dataoffset, datafile]);
}

for (let i = 1; i <= indices.length; i++) {
    const index = indices[i - 1];
    if (index[1] === 255) break;
    const data = fs.readFileSync(`${filebase}${index[1]}.bin`);
    console.log(`${filebase}${index[1]}.bin =[extract]=> ${filebase}_${i}.bin`);
    fs.writeFileSync(`${filebase}_${i}.bin`, data.slice(index[0], indices[i][0]));
}

