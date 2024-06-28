const express = require("express");
const app = express();
const cors = require("cors");
const { customerType, ticketType, parSpaceType } = require("./types");
const { Customer, ParSpace, Ticket, Charges } = require("./db");
app.use(express.json());
app.use(cors());

app.post('/addCustomer',async (req,res)=>{
    const {success} = customerType.safeParse(req.body);
    if(!success){
        res.status(404).json({
            msg : "wrong inputs"
        })
        return;
    }
    //create customer entry
    const resp = await Customer.create(req.body);
    const slot_no = req.body.slot_no;
    await ParSpace.updateOne({slot_no:slot_no},{
        status:true
    });
    res.json({
        msg : "added successfully"
    })
})
app.get('/freeSlot',async (req,res)=>{
    const resp = await ParSpace.findOne({status:false});
    if(!resp){
        res.status(411).json({
            msg : "Parking is Full"
        })
        return;
    }
    res.json({
        slot_no:resp.slot_no
    });
});
app.post('/generateTicket',async (req,res)=>{
    const {success} = ticketType.safeParse(req.body);
    if(!success){
        res.status(404).json({
            msg: "incorrect inputs"
        })
        return;
    }
    const resp = await Ticket.create(req.body);
    //delete this customer 
    await Customer.deleteOne({veh_no:req.body.veh_no});
    res.json({
        msg : "created successfully"
    })
})
app.post('/addParking',async (req,res)=>{
    const {success} = parSpaceType.safeParse(req.body);
    if(!success){
        res.status(404).json({
            msg: "incorrect inputs"
        })
        return;
    }
    const res = await ParSpace.create(req.body);
    res.json({
        msg : "created successfully"
    })
})
app.post('/charges',async (req,res)=>{
    const {success} = parSpaceType.safeParse(req.body);
    if(!success){
        res.status(404).json({
            msg: "incorrect inputs"
        })
        return;
    }
    //find kro same entry nhi honi chaiye
    const resp = await Charges.findOne({
        type:req.body.type
    })
    if(resp){
        res.status(406).json({
            msg:"already exists kindly update it"
        })
    }
    const cr = await Charges.create(req.body);
    res.json({msg:"created"})
})
app.put('/updateCharge',async (req,res)=>{
    const {success} = Charges.safeParse(req.body);
    if(!success){
        res.status(405).json({
            msg:"wrong input"
        });
        return;
    }
    //find one 
    const finding = await Charges.findOne({type:req.body.type});
    if(!finding){
        res.status(410).json({
            msg:"no vehicle of this type exists "
        });
        return;
    }
    await Charges.updateOne({type:req.body.type},req.body);
    res.json({
        msg : "updated sucessfully"
    })
})
app.listen(3000);