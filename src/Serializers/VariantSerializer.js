const RLP = require('rlp')
const FateTag = require('../FateTag.js')
const FateTuple = require('../types/FateTuple.js')
const FateVariant = require('../types/FateVariant.js')

class VariantSerializer {
    constructor(globalSerializer) {
        this.globalSerializer = globalSerializer
    }
    serialize(variant) {
        const valueTuple = new FateTuple(variant.valueTypes, variant.value)

        return  [
            FateTag.VARIANT,
            ...RLP.encode(new Uint8Array(variant.arities)),
            variant.tag,
            ...this.globalSerializer.serialize(valueTuple)
        ]
    }
    deserialize(data, typeInfo) {
        const [value, rest] = this.deserializeStream(data, typeInfo)

        return value
    }
    deserializeStream(data, typeInfo) {
        const buffer = new Uint8Array(data)
        const decoded = RLP.decode(buffer.slice(1), true)
        const arities = [...decoded.data]
        const tag = decoded.remainder[0]
        const [els, rest] = this.globalSerializer.deserializeStream(decoded.remainder.slice(1))

        let variants = []
        if (typeof typeInfo != 'undefined') {
            variants = typeInfo.variants
        }

        return [
            new FateVariant(arities, tag, els.items, els.valueTypes, variants),
            rest
        ]
    }
}

module.exports = VariantSerializer
