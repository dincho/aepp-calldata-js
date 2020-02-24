const test = require('ava')
const Serializer = require('../../src/Serializer.js')
const ListSerializer = require('../../src/Serializers/ListSerializer.js')
const {FateTypeInt, FateTypeList} = require('../../src/FateTypes.js')
const FateInt = require('../../src/types/FateInt.js')
const FateList = require('../../src/types/FateList.js')

const s = new ListSerializer(Object.create(Serializer))

test('Serialize', t => {
    t.deepEqual(
        s.serialize(new FateList(FateTypeInt(), [])),
        [3],
        'empty list'
    )

    t.deepEqual(
        s.serialize(new FateList(
            FateTypeInt(),
            [new FateInt(1), new FateInt(2), new FateInt(3)]
        )),
        [51,2,4,6],
        'short list'
    )

    const longList = [...Array(16).keys()].map(e => new FateInt(e))
    t.deepEqual(
        s.serialize(new FateList(FateTypeInt(), longList)),
        [31,0,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30],
        'long list'
    )


    t.deepEqual(
        s.serialize(new FateList(
            FateTypeList(FateTypeInt()),
            [
                new FateList(FateTypeInt(), [new FateInt(1), new FateInt(2)]),
                new FateList(FateTypeInt(), [new FateInt(3), new FateInt(4)]),
                new FateList(FateTypeInt(), [new FateInt(5), new FateInt(6)]),
            ]
        )),
        [51,35,2,4,35,6,8,35,10,12],
        'nested list'
    )
});
