/**
 * Copyright (c) 2021 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 * 
 * node generateDecalDeclaration.js <sprite id> <width> <height> >> ../TEXTURES.SCALE
 */

const TEX_SIZE = 117; // Wall texture size
const SPRITE_SIZE = 88; // Sprite full size
const SCALE = Number((TEX_SIZE / SPRITE_SIZE).toFixed(2)); // Scale sprite to texture size

const { round } = Math;

const gen = (id, width, height, offsetx = 0, offsety = 0) => {
    offsetx = round(88 / 2 - offsetx);
    offsety = round(107 - height) - (offsety - height);

    return `Texture "STEX${id}", ${117}, ${117} {
    XScale ${SCALE}
    YScale ${SCALE}
    Patch "_STEX${id}", ${round(offsetx)}, ${round(offsety)}
}
`};


module.exports = gen;

if (!module.parent) {
    if (process.argv.length !== 5) {
        return console.log('Usage: <sprite id> <width> <height>');
    }

    console.log(gen(Number(process.argv[2]), Number(process.argv[3]), Number(process.argv[4])));
}
