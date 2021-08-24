/**
 * Copyright (c) 2021 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 * 
 * node generateDecalDeclaration.js <sprite id> <width> <height> >> ../TEXTURES.SCALE
 */

const BIG_TEX_SIZE = 117;
const BTS2 = BIG_TEX_SIZE / 2;
const SPRITE_SIZE = 88;
const SCALE = Number((BIG_TEX_SIZE / SPRITE_SIZE).toFixed(2));

const gen = (spriteid, width, height) => `Texture "STEX${spriteid}", ${BIG_TEX_SIZE}, ${BIG_TEX_SIZE} {
    XScale 1.33
    YScale 1.33
    Patch "_STEX${spriteid}", ${(BTS2 - (width * 1.33) / 2).toFixed(0)}, ${(BTS2 - (height * SCALE) / 2).toFixed(0)}
}
`;


module.exports = gen;

if (!module.parent) {
    if (process.argv.length !== 5) {
        return console.log('Usage: <sprite id> <width> <height>');
    }

    console.log(gen(Number(process.argv[2]), Number(process.argv[3]), Number(process.argv[4])));
}
