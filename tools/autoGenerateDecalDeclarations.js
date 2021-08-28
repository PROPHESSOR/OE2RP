/**
 * Copyright (c) 2021 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const fs = require('fs');
const path = require('path');

const generator = require('./generateDecalDeclaration');

const DECALS_FOLDER = '../textures/decals';
const TEXTURE_DECLARATION_FILE = '../TEXTURES.SCALE';

const files = fs.readdirSync(DECALS_FOLDER).filter(x => x[0] === 'S');

const textureDeclarations = fs.openSync(TEXTURE_DECLARATION_FILE, 'a');

for (const file of files) {
    console.log(file);
    const id = Number(file.slice(-7, -4));

    fs.writeFileSync(textureDeclarations, generator(id) + '\n');

    fs.renameSync(path.join(DECALS_FOLDER, file), path.join(DECALS_FOLDER, '_' + file));
}