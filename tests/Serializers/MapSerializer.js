const test = require('ava')
const Serializer = require('../../src/Serializer.js')
const MapSerializer = require('../../src/Serializers/MapSerializer.js')
const FateInt = require('../../src/types/FateInt.js')
const FateBool = require('../../src/types/FateBool.js')
const FateMap = require('../../src/types/FateMap.js')
const {FateTypeInt, FateTypeBool, FateTypeMap} = require('../../src/FateTypes.js')

const s = new MapSerializer(Object.create(Serializer))

test('Serialize', t => {
    const FTInt = FateTypeInt()
    const FTBool = FateTypeBool()

    t.deepEqual(
        s.serialize(new FateMap(FTInt, FTBool, [])),
        [47,0],
        'empty map'
    )

    t.deepEqual(
        s.serialize(new FateMap(FTInt, FTBool, [[new FateInt(0), new FateBool(false)]])),
        [47,1,0,127],
        'single element map'
    )

    t.deepEqual(
        s.serialize(
            new FateMap(
                FTInt,
                FateTypeMap(FTInt, FTBool),
                [
                    [new FateInt(0), new FateMap(
                        FTInt, FTBool, [[new FateInt(0), new FateBool(false)]])
                    ],
                    [new FateInt(1), new FateMap(
                        FTInt, FTBool, [[new FateInt(1), new FateBool(true)]])
                    ],
                    [new FateInt(2), new FateMap(
                        FTInt, FTBool, [[new FateInt(8), new FateBool(true)]])
                    ],
                ]
            )
        ),
        [47,3,0,47,1,0,127,2,47,1,2,255,4,47,1,16,255],
        'nested map'
    )

    t.deepEqual(
        s.serialize(new FateMap(FTInt, FTBool, [
            [new FateInt(0), new FateBool(false)],
            [new FateInt(1), new FateBool(true)],
            [new FateInt(3), new FateBool(true)]
        ])),
        [47,3,0,127,2,255,6,255]
    )

    t.deepEqual(
        s.serialize(new FateMap(FTInt, FTBool, [
            [new FateInt(3), new FateBool(false)],
            [new FateInt(5), new FateBool(true)],
            [new FateInt(1), new FateBool(true)]
        ])),
        [47,3,2,255,6,127,10,255]
    )
});
