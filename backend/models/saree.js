const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('mongoose-bcrypt');
const Types  = Object.freeze({
    kanchipuram: "Kanchipuram",
    softSilk: "Soft Silk",
    fancy: "Fancy",
    georgette: "Georgette",
    linen: "Linen",
    cotton: "Cotton",
    pattu: "Pattu"
});
const HistorySchema = new Schema({
    lastWorn: {type: Date, index: true},
    crowd: {type:String, index: true},
    description: {type: String}
});
const sareeSchema = new Schema({
        owner: {type: String, required: true},
        // Is the blouse already stitched
        blouseStitched: {type: Boolean, index:true},
        // Type of saree fabric
        type: {
            type: String,
            enum: Object.values(Types),
            required: true
        },
        // Where and when saree was purchased
        purchase: {
            datePurchased: {type: Date, index: true},
            wherePurchased: {type:String, index: true}
        },

        // Current location of saree
        location: {
            type: String, 
            required: true
        },
        // Any additional general notes about saree
        notes: {type: String},
        imgs: [
            { type: String}],
        worn: [HistorySchema]
        
})
sareeSchema.plugin(bcrypt);
Object.assign(sareeSchema.statics, {Types});
module.exports= mongoose.model('saree', sareeSchema);