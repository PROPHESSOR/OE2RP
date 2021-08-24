/**
 * Copyright (c) 2021 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 * 
 * node generateDecalDeclaration.js <sprite id> <width> <height> >> ../TEXTURES.SCALE
 */

const TEX_SIZE = 117; // Wall texture size
const BTS2 = TEX_SIZE / 2; // divide by 2
const SPRITE_SIZE = 88; // Sprite full size
const SCALE = Number((TEX_SIZE / SPRITE_SIZE).toFixed(2)); // Scale sprite to texture size

const { round } = Math;

const gen = (id, width, height) => `Texture "STEX${id}", ${TEX_SIZE}, ${TEX_SIZE} {
    XScale ${SCALE}
    YScale ${SCALE}
    Patch "_STEX${id}", ${round(BTS2 - width * SCALE / 2)}, ${round(BTS2 - height * SCALE / 2)}
}
`;


module.exports = gen;

if (!module.parent) {
    if (process.argv.length !== 5) {
        return console.log('Usage: <sprite id> <width> <height>');
    }

    console.log(gen(Number(process.argv[2]), Number(process.argv[3]), Number(process.argv[4])));
}
