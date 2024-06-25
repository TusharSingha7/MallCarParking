const z = require("zod");
const createTicket = z.object({
    ticket_id:z.number(),
    entryTime:z.string(),
    exitTime:z.string(),
    charges:z.number(),
    veh_no:z.string(),
    cust_id:z.number()
});
const createCustomer = z.object({
    cust_id:z.number(),
    name:z.string(),
    gender:z.string(),
    contact:z.number(),
    veh_no:z.string(),
    model:z.string(),
    color:z.string(),
    type:z.string(),
    slot:z.number()
});
const checkVeh = z.object({
    veh_no:z.string()
})
const createSpace = z.object({
    slots:z.array(z.number())
})
const createPayment = z.object({
    method:z.string(),
    amount:z.number(),
    cust_id:z.number()
})
module.exports = {
    createCustomer,
    createSpace,
    createTicket,
    createPayment,
    checkVeh
}