const path = require('path')
const winax = require('winax')

module.exports = {
    init: function (ids) {
        return winax.Object(ids)
    }
}