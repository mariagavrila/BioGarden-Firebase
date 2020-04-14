const mongoose = require('mongoose')
var Schema = mongoose.Schema

var WalletSchema = Schema({
    date: {type: Date, default: new Date()},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    positiveBalance: {type: Number, default: 0},
    negativeBalance: {type: Number, default: 0},
}, {timestamps: true})

module.exports = mongoose.model('Wallet', WalletSchema)
