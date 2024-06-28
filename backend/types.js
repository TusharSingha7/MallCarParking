const zod = require("zod");
const customerType = zod.object({
    entry_time: zod.string(),
    veh_no: zod.string(),
    owner : zod.string(),
    contact : zod.number().min(10).max(10),
    slot_no : zod.number()
});
const ticketType = zod.object({
    entry_time: zod.string(),
    charge : zod.number(),
    veh_no: zod.string(),
    owner : zod.string(),
    contact : zod.number().min(10).max(10),
    exit_time : zod.string(),
});
const chargesType = zod.object({
    type : zod.string(),
    charge : zod.number()
});
const parSpaceType = zod.object({
    slot_no : zod.number(),
    status : zod.boolean()
})
module.exports = {
    customerType,
    ticketType,
    parSpaceType,
    chargesType
}