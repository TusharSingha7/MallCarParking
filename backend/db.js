//database
const mongoose = require("mongoose");
const { number } = require("zod");
mongoose.connect("mongodb+srv://tusinghar:sqSv9wKtjMAe3@cluster0.pt2g1qa.mongodb.net/ParkingSystem");
const chargesSchema = new mongoose.Schema({
    type: String,
    charge : Number
});
const ticketSchema = new mongoose.Schema({
    entry_time:String,
    charge : Number,
    veh_no: String,
    owner : String,
    contact : {
        type : Number,
        length : 10
    },
    exit_time : String,
});
const parSpaceSchema = new mongoose.Schema({
    slot_no:Number,
    status : Boolean
}
);
const customerSchema = new mongoose.Schema({
    entry_time:String,
    veh_no: String,
    owner : String,
    contact : {
        type : Number,
        length : 10
    },
    slot_no: Number
});
const Customer = mongoose.model('customer',customerSchema);
const Ticket = mongoose.model('ticket',ticketSchema);
const ParSpace = mongoose.model('parSpace',parSpaceSchema);
const Charges = mongoose.model('charges',chargesSchema);
module.exports = {
    Customer,
    Ticket,
    ParSpace,
    Charges
}
