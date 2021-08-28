/**
 * Copyright (c) 2021 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 * 
 * node generateDecalDeclaration.js <sprite id> <width> <height> >> ../TEXTURES.SCALE
 */

const WALL_SIZE = 117;
const ORIG_SIZE = 88;
const NEEDED_SIZE = 64;
const SCALE = ORIG_SIZE / NEEDED_SIZE;

const gen = (id) => {
    return `Texture "STEX${id}", ${WALL_SIZE}, ${WALL_SIZE} {
    XScale ${SCALE}
    YScale ${SCALE}
    WorldPanning
    Patch "_STEX${id}", ${Math.round(ORIG_SIZE / 2)}, ${ORIG_SIZE} {
        UseOffsets
    }
}
`};


module.exports = gen;

if (!module.parent) {
    if (process.argv.length !== 5) {
        return console.log('Usage: <sprite id> <width> <height>');
    }

    console.log(gen(Number(process.argv[2]), Number(process.argv[3]), Number(process.argv[4])));
}
