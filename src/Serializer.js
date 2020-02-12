const AddressSerializer = require('./Serializers/AddressSerializer')
const BitsSerializer = require('./Serializers/BitsSerializer')
const BoolSerializer = require('./Serializers/BoolSerializer')
const ByteArraySerializer = require('./Serializers/ByteArraySerializer')
const BytesSerializer = require('./Serializers/BytesSerializer')
const ChannelSerializer = require('./Serializers/ChannelSerializer')
const ContractSerializer = require('./Serializers/ContractSerializer')
const IntSerializer = require('./Serializers/IntSerializer')
const ListSerializer = require('./Serializers/ListSerializer')
const MapSerializer = require('./Serializers/MapSerializer')
const OracleQuerySerializer = require('./Serializers/OracleQuerySerializer')
const OracleSerializer = require('./Serializers/OracleSerializer')
const StringSerializer = require('./Serializers/StringSerializer')
const TupleSerializer = require('./Serializers/TupleSerializer')
const VariantSerializer = require('./Serializers/VariantSerializer')

Serializer = {
    serializers: {},
    register: function(type, instance) {
        this.serializers[type] = instance
    },
    serialize: function (data) {
        const [type, value] = data

        if (!this.serializers.hasOwnProperty(type)) {
            throw new Error("Unsupported type, " + type);
        }

        return this.serializers[type].serialize(value)
    }
}

Serializer.register('bool', new BoolSerializer())
Serializer.register('int', new IntSerializer())
Serializer.register('tuple', new TupleSerializer(Serializer))
//TODO, nested list
Serializer.register('list', new ListSerializer())
//TODO, nested map
Serializer.register('map', new MapSerializer(Serializer))
Serializer.register('byte_array', new ByteArraySerializer())
Serializer.register('string', new StringSerializer())
Serializer.register('bits', new BitsSerializer())
Serializer.register('variant', new VariantSerializer(Serializer))
Serializer.register('bytes', new BytesSerializer())
Serializer.register('address', new AddressSerializer())
Serializer.register('contract', new ContractSerializer())
Serializer.register('oracle', new OracleSerializer())
Serializer.register('oracle_query', new OracleQuerySerializer())
Serializer.register('channel', new ChannelSerializer())

module.exports = Serializer