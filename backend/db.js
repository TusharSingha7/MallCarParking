//database
const mongoose = require("mongoose");
const { datetimeRegex, custom, string, boolean } = require("zod");

mongoose.connect("mongodb+srv://tusinghar:sqSv9wKtjMAe3@cluster0.pt2g1qa.mongodb.net/");
const customerSchema = new mongoose.Schema({
    cust_id:Number,
    name:String,
    gender:String,
    contact:Number,
    veh_no:String
});
const vehSchema = new mongoose.Schema({
    veh_no:String,
    type:String,
    model:String,
    color:String
})
const paymentSchema = new mongoose.Schema({
    cust_id:Number,
    method:String,
    amount:Number,
    payId:Number
})
const ticketSchema = new mongoose.Schema({
    ticket_id:Number,
    entryTime:String,
    exitTime:String,
    charges:Number,
    veh_no:String,
    cust_id:Number
})
const parkingSpaceSchema = new mongoose.Schema({
    slot:Number,
    stat:Boolean,
    entryTime:String,
    veh_no:String
})
const chargeSchema = new mongoose.Schema({
    type:String,
    charge:Number
})
const vehicle = mongoose.model('vehicle',vehSchema);
const customer = mongoose.model('customer',customerSchema);
const payment = mongoose.model('payment',paymentSchema);
const ticket = mongoose.model('ticket',ticketSchema);
const parkingSpace = mongoose.model('parkingSpace',parkingSpaceSchema);
const charges = mongoose.model('charges',chargeSchema);
module.exports = {
    vehicle,
    customer,
    payment,
    ticket,
    parkingSpace,
    charges
}
