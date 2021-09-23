var bcrypt = require('bcryptjs');

function encryptPass(value){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(`${value}`, salt);
    return hash
    // console.log(bcrypt.compareSync(`${value}`, hash), "ini enkripsi")
    // console.log(salt,hash)
}

function bcryptCheck(hash,value){
    if(bcrypt.compareSync(hash, value)){
        return true
    }else{
        return false
    }
}

// console.log(encryptPass('Monica'))
module.exports = {encryptPass, bcryptCheck}