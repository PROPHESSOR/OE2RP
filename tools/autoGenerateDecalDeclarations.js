/**
 * Copyright (c) 2021 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const generator = require('./generateDecalDeclaration');

const DECALS_FOLDER = '../textures/decals';
const TEXTURE_DECLARATION_FILE = '../TEXTURES.SCALE';

const files = fs.readdirSync(DECALS_FOLDER).filter(x => x[0] === 'S');

const textureDeclarations = fs.openSync(TEXTURE_DECLARATION_FILE, 'a');

for (const file of files) {
    console.log(file);
    const id = Number(file.slice(-7, -4));

    const size = cp.execSync(`identify -format '%wx%h' "${path.join(DECALS_FOLDER, file)}"`).toString().split('x').map(Number);

    // Read png offsets
    let offsetX = 0, offsetY = 0;
    const png = fs.readFileSync(path.join(DECALS_FOLDER, file));
    const grAbChunk = png.indexOf('grAb');
    if (grAbChunk !== -1) {
        offsetX = png.readInt32BE(grAbChunk + 4);
        offsetY = png.readInt32BE(grAbChunk + 8);
    }

    fs.writeFileSync(textureDeclarations, generator(id, size[0], size[1], offsetX, offsetY) + '\n');

    fs.renameSync(path.join(DECALS_FOLDER, file), path.join(DECALS_FOLDER, '_' + file));
}