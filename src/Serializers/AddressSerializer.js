const RLP = require('rlp')
const FateTag = require('../FateTag.js')
const FateAccountAddress = require('../types/FateAccountAddress.js')

class AddressSerializer {
    serialize(data) {
        return [
            FateTag.OBJECT,
            FateTag.OTYPE_ADDRESS,
            ...RLP.encode(data.value)
        ]
    }
    deserialize(data) {
        const [value, rest] = this.deserializeStream(data)

        return value
    }
    deserializeStream(data) {
        const buffer = new Uint8Array(data)
        const decoded = RLP.decode(buffer.slice(2), true)

        return [
            new FateAccountAddress(decoded.data),
            new Uint8Array(decoded.remainder)
        ]
    }
}

module.exports = AddressSerializer
