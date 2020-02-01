const FATE = require('./FATE_data.js')

module.exports = {
    serialize: function (type, value) {
        if (!this.serializers.hasOwnProperty(type)) {
            console.error("Unsupported type: " + type)
            return
        }

        return this.serializers[type](value)
    },
    serializers: {
        'bool': function (value) {
            return (value === true) ? [FATE.TRUE] : [FATE.FALSE]
        },
        'tuple': function (value) {
            if (value.length === 0) {
                // console.log(
                //     "serialized empty typle:",
                //     [FATE.EMPTY_TUPLE]
                // )
                return [FATE.EMPTY_TUPLE]
            }

            // should we serialize it ?! what about types ?!
            // const elements = tuple.map(e => serialize(x))
            const elements = value

            if (value.length < 16) {
                const lenBin = (value.length << 4)
                const prefix = (value.length << 4) | FATE.SHORT_TUPLE
                // console.log(
                //     "serialized tuple (len, lenbin, shlbin, prefix, prefixbin):",
                //     value.length,
                //     value.length.toString(2).padStart(8, '0'),
                //     lenBin.toString(2).padStart(8, '0'),
                //     prefix,
                //     prefix.toString(2).padStart(8, '0')
                // )
                return [
                    prefix,
                    ...elements
                ]
            }

            return [
                FATE.LONG_TUPLE,
                value.size - 16,
                ...elements
            ]
        },
        'byte_array': function (byteArray) {
            if (byteArray.length === 0) {
                return [FATE.EMPTY_STRING]
            }

            if (byteArray.length < 64) {
                const lenBin = (byteArray.length << 2)
                const prefix = (byteArray.length << 2) | FATE.SHORT_STRING
                // console.log(
                //     "serialized byteArray (len, lenbin, shlbin, prefix, prefixbin):",
                //     byteArray.length,
                //     byteArray.length.toString(2).padStart(8, '0'),
                //     lenBin.toString(2).padStart(8, '0'),
                //     prefix,
                //     prefix.toString(2).padStart(8, '0')
                // )

                return [
                    prefix,
                    ...byteArray
                ]
            }
        }
    }
}