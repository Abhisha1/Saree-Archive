// Schema for user
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

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
    mobile: {
        type: String
    },
    home: {
        type: String
    },
    work: {
        type: String
    }



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