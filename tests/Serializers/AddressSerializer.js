const test = require('ava')
const AddressSerializer = require('../../src/Serializers/AddressSerializer.js')

const s = new AddressSerializer()

test('Serialize', t => {
    t.deepEqual(
        s.serialize(BigInt("0xfedcba9876543210")),
        [159,0,136,254,220,186,152,118,84,50,16]
    )
});