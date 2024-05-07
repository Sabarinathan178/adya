const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
 username: { type: String, unique: true, required: true },
 password: { type: String, required: true },
 email: { type: String, required: true },
 isAdmin:{
    type:Boolean,
    required:true,
    default:false
}
 });

 userSchema.pre('save', async function (next) {
    if (this.username === 'admin') {
        this.isAdmin = true;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);