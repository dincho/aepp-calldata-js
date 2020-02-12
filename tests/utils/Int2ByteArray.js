const test = require('ava')
const Int2ByteArray = require('../../src/utils/Int2ByteArray.js')

const b = (value) => new Uint8Array(value)

test('Int2ByteArray', t => {
    t.deepEqual(Int2ByteArray(0), b([0]))
    t.deepEqual(Int2ByteArray(1), b([1]))
    t.deepEqual(Int2ByteArray(255), b([255]))
    t.deepEqual(Int2ByteArray(256), b([1, 0]))
    t.deepEqual(Int2ByteArray(300), b([1, 44]))
    t.deepEqual(Int2ByteArray(511), b([1, 255]))
    t.deepEqual(Int2ByteArray(512), b([2, 0]))
    t.deepEqual(Int2ByteArray(552), b([2, 40]))
    t.deepEqual(Int2ByteArray(100000), b([1, 134, 160]))
    t.deepEqual(
        Int2ByteArray(10000000000000009999999n),
        b([2,30,25,224,201,186,178,216,150,127])
    )
});