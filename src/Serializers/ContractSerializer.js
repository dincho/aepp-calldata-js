const RLP = require('rlp')
const FateTag = require('../FateTag.js')
const FateContractAddress = require('../types/FateContractAddress.js')

class ContractSerializer {
    serialize(data) {
        return [
            FateTag.OBJECT,
            FateTag.OTYPE_CONTRACT,
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
            new FateContractAddress(decoded.data),
            new Uint8Array(decoded.remainder)
        ]
    }
}

module.exports = ContractSerializer
