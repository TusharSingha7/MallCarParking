const express = require("express");
const app = express();
const cors = require("cors");
const { customerType, ticketType, parSpaceType, chargesType } = require("./types");
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
    if(req.body.slot_no == -1){
        res.status(407).json({
            msg:"Parking full cannot add"
        });
        return;
    }
    //create customer entry
    const check = await Customer.findOne({
        veh_no:req.body.veh_no
    });
    if(check){
        res.status(413).json({
            msg:"customer already exists"
        });
        return;
    }
    const check2 = await ParSpace.findOne({slot_no:req.body.slot_no});
    if(check2.status){
        res.status(407).json({
            msg:"parking slot already occupied get another"
        });
        return;
    }
    const resp = await Customer.create(req.body);
    const slot_no = req.body.slot_no;
    await ParSpace.updateOne({slot_no:slot_no},{
        status:true
    });
    res.json({
        msg : "added successfully",
        slot_no : slot_no
    })
})
app.get('/freeSlot',async (req,res)=>{
    const resp = await ParSpace.findOne({status:false});
    if(!resp){
        res.status(411).json({
            msg : "Parking is Full",
            slot_no:-1
        })
        return;
    }
    res.json({
        slot_no:resp.slot_no
    });
});
app.post('/generateTicket',async (req,res)=>{
    console.log(req.body);
    const {success} = ticketType.safeParse(req.body);
    if(!success){
        res.status(404).json({
            msg: "incorrect inputs"
        })
        return;
    }
    const resp = await Ticket.create(req.body);
    //delete this customer 
    const cusDet = await Customer.findOne({veh_no:req.body.veh_no});
    const slot = cusDet.slot_no;
    await ParSpace.updateOne({slot_no:slot},{status:false});
    await Customer.deleteOne({veh_no:req.body.veh_no});
    res.json({
        ticket : resp
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
    const check = await ParSpace.findOne({slot_no:req.body.slot_no});
    if(check){
        res.status(412).json({
            msg:"space already exists"
        });
        return;
    }
    const resp = await ParSpace.create({
        slot_no:req.body.slot_no,
        status:false
    });
    res.json({
        msg : "created successfully"
    })
})
app.post('/charges',async (req,res)=>{
    const {success} = chargesType.safeParse(req.body);
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
        });
        return;
    }
    const cr = await Charges.create(req.body);
    res.json({msg:"created"})
})
app.put('/updateCharge',async (req,res)=>{
    const {success} = chargesType.safeParse(req.body);
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
});
app.get('/customers',async (req,res)=>{
    const customers = Customer.find();
    res.json({
        customers
    });
})
app.listen(3000);