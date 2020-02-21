const FateData = require('./FateData.js')
const {FateTypeTuple} = require('../FateTypes.js')

class FateTuple extends FateData {
  constructor(valueTypes = [], items = []) {
    super('tuple')

    this._valueTypes = (valueTypes.hasOwnProperty('valueTypes')) ? valueTypes.valueTypes : valueTypes
    this._type = Array.isArray(valueTypes) ? FateTypeTuple(valueTypes) : valueTypes
    this._items = Array.from(items)
  }

  get valueTypes() {
    return this._valueTypes
  }

  get type() {
    return this._type
  }

  get size() {
    return this._items.length
  }

  get items() {
    return this._items
  }
}

module.exports = FateTuple
