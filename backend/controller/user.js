const { default: mongoose } = require("mongoose");
const { sendError, sendSuccess } = require("../utility/helper");
const constants = require("../utility/errorConstants");

require("../models/User");

const User = mongoose.model("User")

exports.createUser = (req, res) => {
    console.log(req.body)
    var {name, phone_number, password, email, age, batch} = req.body;
    if(age < 18 || age > 65) return sendError(res, {}, "You're not elligible for our services.", constants.FORBIDDEN)
    var user = new User({name, phone_number, email, password, batch, age});
    user.save(function (err, userSaved) {
        if(err) return sendError(res, err, err.message, constants.SERVER_ERROR);
        return sendSuccess(res, userSaved);
    })
}

exports.loginUser = (req, res) => {
    console.log(req.body)
    var {email, password} = req.body;
    if(!email) return sendError(res, {}, "Email is missing", constants.BAD_REQUEST);
    if(!password) return sendError(res, {}, "Password is missing", constants.BAD_REQUEST);
    User.findOne({email}, function (err, user) {
        if (err) {
            return sendError(res, err, "server_error", constants.SERVER_ERROR);
        }
        if (!user) {
            return sendError(
              res,
              "Account doesn't exits",
              "account_doesnot_exist",
              constants.BAD_REQUEST
            );
        }
        user.comparePassword(password, function(err, match_password){
            if(err) return sendError(res, err, err.message, constants.SERVER_ERROR);
            if(match_password) return sendSuccess(res, user);
            else return sendError(res, {}, "Invalid Credentials", constants.FORBIDDEN);
        })
    })
}

exports.makePayment = (req, res) => {
    var {id,batch} = req.query;
    User.findById(id, function(err, user){
        if(err) return sendError(res, err, err.message, constants.SERVER_ERROR);
        var d = new Date();
        if(user.subscription_time && (d.getMonth() == user.subscription_time.getMonth()) && (d.getFullYear() == user.subscription_time.getFullYear())){
            return sendError(res, {}, "Subscription is already active", constants.BAD_REQUEST);
        }else{
            User.findByIdAndUpdate(
                id, 
                { $set: { subscription_time: new Date(),batch:batch
                }},
                {new:true},
                function(err, user){
                if(err) return sendError(res, err, err.message, constants.BAD_REQUEST);
                else return sendSuccess(res, user);
            })
        }
    })
}

exports.loadUser = (req, res) => {
    var {id} = req.query;
    User.findById(id, function(err, user){
        if(err) return sendError(res, err, err.message, constants.SERVER_ERROR);
        if(!user) return sendError(res, "No User found", "No User found", constants.NOT_FOUND);
        else{
            return sendSuccess(res, user);
        }
    })
}