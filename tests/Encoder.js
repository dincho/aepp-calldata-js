const fs = require('fs')
const test = require('../src/test.js');
const Encoder = require('../src/Encoder.js')
const aci = require('../build/contracts/Test.json')

const CONTRACT = 'Test'
const encoder = new Encoder(aci)

test('Encode implicit init', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'init', [])
    t.is(encoded, 'cb_KxFE1kQfP4oEp9E=', 'init()')
});

test('Encode empty arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_empty', [])
    t.is(encoded, 'cb_KxFLLL5rP7TGyoM=', 'test_empty()')
});

test('Encode boolean arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_bool', [true, false])
    t.is(encoded, 'cb_KxGhC8WIK/9/56SENg==', 'test_bool(true, false)')
});

test('Encode single int arguments', t => {
    t.plan(2)
    const encoded1 = encoder.encode(CONTRACT, 'test_single_int', [63])
    t.is(encoded1, 'cb_KxGcvF48G34gDHTz', 'test_single_int(63)')

    const encoded2 = encoder.encode(CONTRACT, 'test_single_int', [-63])
    t.is(encoded2, 'cb_KxGcvF48G/4zzZ4m', 'test_single_int(-63)')
});

test('Encode multiple int arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_int', [63, -63, 64, -64])
    t.is(encoded, 'cb_KxFAuEQES37+bwDvAODy1qs=', 'test_int(63, -63, 64, -64)')
});

test('Encode bytes arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_bytes', [0xbeef])
    t.is(encoded, 'cb_KxEe407MG58BCb7vI/elQA==', 'test_bytes(#beef)')
});

test('Encode string arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_string', ["whoolymoly"])
    t.is(encoded, 'cb_KxHwzCuVGyl3aG9vbHltb2x5zwMSnw==', 'test_bytes("whoolymoly")')
});

test('Encode hash arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(
        CONTRACT,
        'test_hash',
        ["0x000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f"]
    )
    t.is(
        encoded,
        'cb_KxEjJ6ybG58BgQABAgMEBQYHCAkKCwwNDg8AAQIDBAUGBwgJCgsMDQ4PUyyi1w==',
        'test_hash(#000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f)'
    )
});


test('Encode signature arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(
        CONTRACT,
        'test_signature',
        [`0x000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f`]
    )
    t.is(
        encoded,
        'cb_KxEbznV5G58BAQAAAQIDBAUGBwgJCgsMDQ4PAAECAwQFBgcICQoLDA0ODwABAgMEBQYHCAkKCwwNDg8AAQIDBAUGBwgJCgsMDQ4P+jjEQA==',
        `test_signature(
            #000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f
            000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f
        )`
    )
});

test('Encode account address arguments', t => {
    t.plan(1)
    t.is(
        encoder.encode(
            CONTRACT,
            'test_account_address',
            ["0xDE68BFE1B203E51F52351BA087F79B7828E6A140F0C314A670C7003B3FF57075"]
        ),
        'cb_KxHgYyOEG58AoN5ov+GyA+UfUjUboIf3m3go5qFA8MMUpnDHADs/9XB1FYw7tQ==',
        'test_account_address(ak_2gx9MEFxKvY9vMG5YnqnXWv1hCsX7rgnfvBLJS4aQurustR1rt)'
    )
});

test('Encode contract address arguments', t => {
    t.plan(1)
    t.is(
        encoder.encode(
            CONTRACT,
            'test_contract_address',
            ["0x1FC0D099EC5A13CB9328A317FCECD852B1F7489E5E00BA09573C3C2DB6985553"]
        ),
        'cb_KxELEfrsG58CoB/A0JnsWhPLkyijF/zs2FKx90ieXgC6CVc8PC22mFVTzM0KJQ==',
        'test_contract_address(ct_Ez6MyeTMm17YnTnDdHTSrzMEBKmy7Uz2sXu347bTDPgVH2ifJ)'
    )
});

test('Encode oracle address arguments', t => {
    t.plan(1)
    t.is(
        encoder.encode(
            CONTRACT,
            'test_oracle_address',
            ["0xCAF22A244EDAC03D26F02A17D923942D055CFC862328B25A51C284BC9D420E49"]
        ),
        'cb_KxGPms0RG58DoMryKiRO2sA9JvAqF9kjlC0FXPyGIyiyWlHChLydQg5Jyfi1MA==',
        'test_oracle_address(ok_2YNyxd6TRJPNrTcEDCe9ra59SVUdp9FR9qWC5msKZWYD9bP9z5)'
    )
});

test('Encode oracle query address arguments', t => {
    t.plan(1)
    t.is(
        encoder.encode(
            CONTRACT,
            'test_oracle_query_address',
            ["0xED1EE7DC0278D05CE9509473C50A93D43A28B28D5032F6DF7DAA442FE1371348"]
        ),
        'cb_KxFBufYfG58EoO0e59wCeNBc6VCUc8UKk9Q6KLKNUDL2332qRC/hNxNIgI8x6g==',
        'test_oracle_query_address(oq_2oRvyowJuJnEkxy58Ckkw77XfWJrmRgmGaLzhdqb67SKEL1gPY)'
    )
});

test('Encode bits arguments', t => {
    t.plan(3)
    const encoded = encoder.encode(CONTRACT, 'test_bits', [[0]])
    t.is(encoded, 'cb_KxG27kGGG08Agq5jCw==', 'test_bits(Bits.none)')

    const encoded2 = encoder.encode(CONTRACT, 'test_bits', [[-1]])
    t.is(encoded2, 'cb_KxG27kGGG88BYlyOgw==', 'test_bits(Bits.all)')

    const encoded3 = encoder.encode(CONTRACT, 'test_bits', [[1]])
    t.is(encoded3, 'cb_KxG27kGGG08BD4ordQ==', 'test_bits(Bits.set(Bits.none, 0)')
});

test('Encode list arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_list', [[1,2,3,5,8,13,21]])
    t.is(encoded, 'cb_KxFLwdBRG3MCBAYKEBoquPlTeA==', 'test_list([1, 2, 3, 5, 8, 13, 21])')
});

test('Encode nested list arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_nested_list', [[[1,2],[3,4],[5,6]]])
    t.is(encoded, 'cb_KxEHeg4CGzMjAgQjBggjCgyQqs5t', 'test_nested_list([[1,2],[3,4],[5,6]])')
});

test('Encode map arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_simple_map', [[[7, false]]])
    t.is(encoded, 'cb_KxHLN316Gy8BDn+vbmBO', 'test_simple_map({[7] = false})')
});

test('Encode nested map arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_nested_map', [[
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
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_tuple', [[true, false]])
    t.is(encoded, 'cb_KxFbdB1sGyv/fzQzK9M=', 'test_tuple((true, false))')
});

test('Encode nested tuple arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_nested_tuple', [[[true, false], [false, true]]])
    t.is(encoded, 'cb_KxHkKCkeGysr/38rf/+ZQRDt', 'test_nested_tuple(((true, false), (false true)))')
});

test('Encode simple variant arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_variants', [{variant: 'No', values: []}])
    t.is(encoded, 'cb_KxFiWgvXG6+EAAABAAE/Yp8XdQ==', 'test_variants(No)')
});

test('Encode variant arguments with non-zero arity', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_variants', [{variant: 'Yep', values: [7]}])
    t.is(encoded, 'cb_KxFiWgvXG6+EAAABAAIbDv+CzlA=', 'test_variants(Yep(7))')
});

test('Encode variant with template arguments', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_template_variants', [{variant: 'Any', values: [7, true, 9, 21]}])
    t.is(encoded, 'cb_KxHBGrepG6+CAAQBSw7/EiqgmPlL', 'test_template_variants(Any(7, true, 9, 21))')
});

test('Encode type aliases', t => {
    t.plan(2)
    const encoded = encoder.encode(CONTRACT, 'test_int_type', [7])
    t.is(encoded, 'cb_KxE9BFdGGw7F/9+f', 'test_int_type(7)')

    const encodedMap = encoder.encode(CONTRACT, 'test_map_type', [[["foo", 19]]])
    t.is(encodedMap, 'cb_KxEM7YA1Gy8BDWZvbybgU5Hd', 'test_map_type({["foo"] = 19})')
});

test('Encode template type', t => {
    t.plan(1)
    const encoded = encoder.encode(CONTRACT, 'test_template_type', [7])
    t.is(encoded, 'cb_KxGoCvQ/Gw6liNMS', 'test_template_type(7)')
});

test('Encode template maze', t => {
    t.plan(1)
    const encoded = encoder.encode(
        CONTRACT,
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
    t.plan(2)
    const encoded = encoder.encode(CONTRACT, 'test_record', [{x: 0, y: 0}])
    t.is(encoded, 'cb_KxFMrKn+GysAAOlAPrs=', 'test_record({x = 0, y = 0})')

    const encodedNest = encoder.encode(
        CONTRACT,
        'test_nested_record',
        [{origin: {x: 1, y: 2}, a: 3, b: 4}]
    )

    t.is(encodedNest,
        'cb_KxGQjbdUGzsrAgQGCNvA+iA=',
        'test_nested_record({origin = {x = 1, y = 2}, a = 3, b = 4})'
    )
});

test('Encode namespaced arguments', t => {
    t.plan(1)
    const encoded1 = encoder.encode(CONTRACT, 'test_lib_type', [404])
    t.is(encoded1, 'cb_KxGExpeGG2+CAVT2R/aU', 'test_lib_type(404)')
});

test('Encode optional arguments', t => {
    t.plan(2)
    const encoded1 = encoder.encode(CONTRACT, 'test_optional', [{variant: 'None', values: []}])
    t.is(encoded1, 'cb_KxG0+HBxG6+CAAEAP4sG0gs=', 'test_optional(None)')

    const encoded2 = encoder.encode(CONTRACT, 'test_optional', [{variant: 'Some', values: [404]}])
    t.is(encoded2, 'cb_KxG0+HBxG6+CAAEBG2+CAVSsnrJE', 'test_optional(Some(404))')
});

test('Encode TTL arguments', t => {
    t.plan(2)
    const encoded1 = encoder.encode(CONTRACT, 'test_ttl', [{variant: 'RelativeTTL', values: [50]}])
    t.is(encoded1, 'cb_KxGDonYLG6+CAQEAG2Smlh4I', 'test_ttl(RelativeTTL(50))')

    const encoded2 = encoder.encode(CONTRACT, 'test_ttl', [{variant: 'FixedTTL', values: [50]}])
    t.is(encoded2, 'cb_KxGDonYLG6+CAQEBG2SzOT3Y', 'test_ttl(FixedTTL(50))')
});
