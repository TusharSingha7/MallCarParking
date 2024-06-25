const express = require("express");
const {createCustomer,createTicket,createPayment,createSpace,checkVeh} = require("./types");
const { vehicle,customer,ticket,parkingSpace,payment,charges} = require("./db");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get('/freeSlot',async function(req,res){
    const slot_no = await parkingSpace.findOne({stat:false});
    if(slot_no == null){
        res.status(404).json({
            msg:"all slots are full"
        });
        return;
    }
    res.status(200).json({
        no:slot_no
    })
    return;
})
app.post("/addCustomer",async function(req,res){
const custom = req.body;
const newcustom = createCustomer.safeParse(custom);
if(!newcustom.success){
    res.status(411).json({
        msg : "you sent wrong inputs"
    })
    return;
}
//else put in mongodb
await customer.create({
    cust_id: custom.cust_id,
    name: custom.name,
    gender: custom.gender,
    contact:custom.contact,
    veh_no:custom.veh_no
});
await vehicle.create({
    veh_no:custom.veh_no,
    type:custom.type,
    color:custom.color,
    model:custom.model,
});
const inTime = new Date();
const response = await parkingSpace.updateOne({slot:23},{
    stat:true,
    veh_no:custom.veh_no,
    entryTime:inTime
});
console.log(response);
res.json({msg:"added"});
return;
})
app.post("/ticket",async function(req,res){
const veh = req.body;
const vehCheck = checkVeh.safeParse(veh);
if(!vehCheck.success){
    res.status(404).json({
        msg:"wrong vehno input send a string "
    })
    return;
}
const vehDetails = await vehicle.findOne({veh_no:veh.veh_no});
if(vehDetails == null || vehDetails == undefined){
    res.status(404).json({
        msg:"no vehicle parked with this no"
    })
    return;
}
const parkDetail = await parkingSpace.findOne({veh_no:veh.veh_no});
const inTime = new Date(parkDetail.entryTime);
const exitTime = new Date();
const vehtype = vehDetails.type;
const chargeDetails = await charges.findOne({type:vehtype});
const charge = chargeDetails.charge;
const timeParked = Math.ceil((exitTime - inTime)/3600000);
const cost = timeParked*charge;
const cusDetails = await customer.findOne({veh_no:veh.veh_no});
const tic_id = Math.ceil((Math.random())*1000000);
const createdTicket = await ticket.create({
    ticket_id:tic_id,
    entryTime:inTime,
    exitTime:exitTime,
    charges:cost,
    veh_no:veh.veh_no,
    cust_id:cusDetails.cust_id
});
await parkingSpace.updateOne({veh_no:veh.veh_no},{
    stat:false
});
await customer.deleteOne({
    cust_id:cusDetails.cust_id
});
await vehicle.deleteOne({
    veh_no:veh.veh_no
})
res.status(200).json(createdTicket);
return;
})
app.post("/addPayment",async function(req,res){
    const pay = req.body;
    const checkPay = createPayment.safeParse(pay);
    if(checkPay.success){
        const newId =( Math.random())*10000000;
        await payment.create({
            cust_id:pay.cust_id,
            method:pay.method,
            amount:pay.amount,
            payId:newId,
        })
        res.status(200).json({
            msg:"payment added"
        })
        return;
    }
    req.status(404).send("failed");
    return;
})
app.post('/addSpace',async function(req,res){
    const slotno = req.body;
    const verify = createSpace.safeParse(slotno);
    if(!verify.success){
        res.status(404).send("send valid slot array");
        return;
    }
    for(let i = 0;i<slotno.slots.length;i++){
        await parkingSpace.create({
            slot:slotno.slots[i],
            veh_no:null,
            entryTime:null,
            stat:false
        })
    }
    res.status(200).json({
        msg:"slots added successfully"
    });
    return;
})
app.get('/retrieveTicket',async function(req,res){
    const veh = req.body;
    const veh_no = veh.veh_no;
    const tickets = await ticket.find({veh_no:veh_no});
    res.status(200).json({
        tickets:tickets
    })
})
app.listen(3000);