const fs = require('fs')
const test = require('ava');
const Encoder = require('../src/Encoder.js')

test.before(async t => {
    const aci = JSON.parse(fs.readFileSync('build/contracts/Test.json', 'utf-8'))
    const encoder = new Encoder(aci[0].contract)

    t.context.encoder = encoder
});

test('Encode implicit init', t => {
    const encoded = t.context.encoder.encode('init', [])
    t.is(encoded, 'cb_KxFE1kQfP4oEp9E=', 'init()')
});

test('Encode empty arguments', t => {
    const encoded = t.context.encoder.encode('test_empty', [])
    t.is(encoded, 'cb_KxFLLL5rP7TGyoM=', 'test_empty()')
});

test('Encode boolean arguments', t => {
    const encoded = t.context.encoder.encode('test_bool', [true, false])
    t.is(encoded, 'cb_KxGhC8WIK/9/56SENg==', 'test_bool(true, false)')
});

test('Encode single int arguments', t => {
    const encoded1 = t.context.encoder.encode('test_single_int', [63])
    t.is(encoded1, 'cb_KxGcvF48G34gDHTz', 'test_single_int(63)')

    const encoded2 = t.context.encoder.encode('test_single_int', [-63])
    t.is(encoded2, 'cb_KxGcvF48G/4zzZ4m', 'test_single_int(-63)')
});

test('Encode multiple int arguments', t => {
    const encoded = t.context.encoder.encode('test_int', [63, -63, 64, -64])
    t.is(encoded, 'cb_KxFAuEQES37+bwDvAODy1qs=', 'test_int(63, -63, 64, -64)')
});

test('Encode bytes arguments', t => {
    const encoded = t.context.encoder.encode('test_bytes', [[0xbeef]])
    t.is(encoded, 'cb_KxEe407MG58BCb7vI/elQA==', 'test_bytes(#beef)')
});

test('Encode bits arguments', t => {
    const encoded = t.context.encoder.encode('test_bits', [[0]])
    t.is(encoded, 'cb_KxG27kGGG08Agq5jCw==', 'test_bits(Bits.none)')

    const encoded2 = t.context.encoder.encode('test_bits', [[-1]])
    t.is(encoded2, 'cb_KxG27kGGG88BYlyOgw==', 'test_bits(Bits.all)')

    const encoded3 = t.context.encoder.encode('test_bits', [[1]])
    t.is(encoded3, 'cb_KxG27kGGG08BD4ordQ==', 'test_bits(Bits.set(Bits.none, 0)')
});

test('Encode list arguments', t => {
    const encoded = t.context.encoder.encode('test_list', [[1,2,3,5,8,13,21]])
    t.is(encoded, 'cb_KxFLwdBRG3MCBAYKEBoquPlTeA==', 'test_list([1, 2, 3, 5, 8, 13, 21])')
});

test('Encode nested list arguments', t => {
    const encoded = t.context.encoder.encode('test_nested_list', [[[1,2],[3,4],[5,6]]])
    t.is(encoded, 'cb_KxEHeg4CGzMjAgQjBggjCgyQqs5t', 'test_nested_list([[1,2],[3,4],[5,6]])')
});

test('Encode map arguments', t => {
    const encoded = t.context.encoder.encode('test_simple_map', [[[7, false]]])
    t.is(encoded, 'cb_KxHLN316Gy8BDn+vbmBO', 'test_simple_map({[7] = false})')
});

test('Encode nested map arguments', t => {
    const encoded = t.context.encoder.encode('test_nested_map', [[
        [0, [[0, false]]],
        [1, [[1, true]]],
        [2, [[8, true]]],
    ]])
    t.is(
        encoded,
        'cb_KxFdEx+MGy8DAC8BAH8CLwEC/wQvARD/oZN9CA==',
        'test_nested_map({[0] = {[0] = false}, [1] = {[1] = true}, [2] = {[8] = true}})'
    )
});

test('Encode tuple arguments', t => {
    const encoded = t.context.encoder.encode('test_tuple', [[true, false]])
    t.is(encoded, 'cb_KxFbdB1sGyv/fzQzK9M=', 'test_tuple((true, false))')
});

test('Encode nested tuple arguments', t => {
    const encoded = t.context.encoder.encode('test_nested_tuple', [[[true, false], [false, true]]])
    t.is(encoded, 'cb_KxHkKCkeGysr/38rf/+ZQRDt', 'test_nested_tuple(((true, false), (false true)))')
});

test('Encode simple variant arguments', t => {
    const encoded = t.context.encoder.encode('test_variants', [{variant: 'No', values: []}])
    t.is(encoded, 'cb_KxFiWgvXG6+EAAABAAE/Yp8XdQ==', 'test_variants(No)')
});

test('Encode variant arguments with non-zero arity', t => {
    const encoded = t.context.encoder.encode('test_variants', [{variant: 'Yep', values: [7]}])
    t.is(encoded, 'cb_KxFiWgvXG6+EAAABAAIbDv+CzlA=', 'test_variants(Yep(7))')
});

test('Encode variant with template arguments', t => {
    const encoded = t.context.encoder.encode('test_template_variants', [{variant: 'Any', values: [7, true, 9, 21]}])
    t.is(encoded, 'cb_KxHBGrepG6+CAAQBSw7/EiqgmPlL', 'test_template_variants(Any(7, true, 9, 21))')
});

test('Encode type aliases', t => {
    const encoded = t.context.encoder.encode('test_int_type', [7])
    t.is(encoded, 'cb_KxE9BFdGGw7F/9+f', 'test_int_type(7)')

    const encodedMap = t.context.encoder.encode('test_map_type', [[["foo", 19]]])
    t.is(encodedMap, 'cb_KxEM7YA1Gy8BDWZvbybgU5Hd', 'test_map_type({["foo"] = 19})')
});

test('Encode template type', t => {
    const encoded = t.context.encoder.encode('test_template_type', [7])
    t.is(encoded, 'cb_KxGoCvQ/Gw6liNMS', 'test_template_type(7)')
});

test('Encode template maze', t => {
    const encoded = t.context.encoder.encode(
        'test_template_maze',
        [{
            variant: 'Any',
            values: [
                {origin: {x: 1, y: 2}, a: 3, b: 4},
                {variant: 'Yep', values: [10]},
                20,
                {origin: {x: 1, y: 2}, a: 3, b: 4},
            ]
        }]
    )
    t.is(
        encoded,
        'cb_KxGu5Sw8G6+CAAQBSzsrAgQGCK+EAAABAAIbFCg7KwIEBgj8xaf6',
        'test_template_maze(Any({origin = {x = 1, y = 2}, a = 3, b = 4}, Yep(10), 20, {origin = {x = 1, y = 2}, a = 3, b = 4}))'
    )
});

test('Encode records', t => {
    const encoded = t.context.encoder.encode('test_record', [{x: 0, y: 0}])
    t.is(encoded, 'cb_KxFMrKn+GysAAOlAPrs=', 'test_record({x = 0, y = 0})')

    const encodedNest = t.context.encoder.encode(
        'test_nested_record',
        [{origin: {x: 1, y: 2}, a: 3, b: 4}]
    )

    t.is(encodedNest,
        'cb_KxGQjbdUGzsrAgQGCNvA+iA=',
        'test_nested_record({origin = {x = 1, y = 2}, a = 3, b = 4})'
    )
});
