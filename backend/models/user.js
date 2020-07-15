// Schema for user
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Types  = Object.freeze({
    kanchipuram: "Kanchipuram",
    softSilk: "Soft Silk",
    fancy: "Fancy",
    georgette: "Georgette",
    linen: "Linen",
    cotton: "Cotton",
    pattu: "Pattu"
});
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true
    },
    locations: [{
        type: String,
        required: false
    }],
    crowd: [{
        type: String,
        required: false
    }],
    tags: [{
        type: String,
        required: false
    }],
    sarees: [{
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
        tags: [{type: String}],
        imgs: [
            { type: String}],
        worn: [{
            lastWorn: {type: Date, index: true},
            crowd: {type:String, index: true},
            description: {type: String}
        }]
    }]


},
{
    strict:false,
    timestamps: true,
});


userSchema.pre('save', function(next) {
    var user = this;
    
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }
    // Generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        // Hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            // Override the plaintext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

const User = mongoose.model('User', userSchema);
module.exports = User;