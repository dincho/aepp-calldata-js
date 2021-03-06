const test = require('../../src/test.js')
const FateString = require('../../src/types/FateString.js')
const StringSerializer = require('../../src/Serializers/StringSerializer.js')

const s = new StringSerializer()

test('Serialize', t => {
    t.plan(3)
    t.deepEqual(s.serialize(new FateString("abc")), [13,97,98,99])
    t.deepEqual(s.serialize("abc"), [13,97,98,99])
    t.deepEqual(
        s.serialize("x".repeat(64)),
        [1,0].concat(Array(64).fill(120))
    )
});

test('Deserialize', t => {
    t.plan(2)
    t.deepEqual(s.deserialize([13,97,98,99]), new FateString("abc"))
    t.deepEqual(
        s.deserialize([1,0].concat(Array(64).fill(120))),
        new FateString("x".repeat(64))
    )
});
