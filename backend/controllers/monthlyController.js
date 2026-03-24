import prisma from "../config/prisma.js";

export const getRecords = async (req ,res)=>{
    try{
        const records = await prisma.monthlyRecord.findMany({
            include: {flat:true}
        });
        res.json(records);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

export const markPaid = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await prisma.monthlyRecord.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({ error: "Record not found" });
    }

    const updated = await prisma.monthlyRecord.update({
      where: { id },
      data: { status: "Paid",
        amountPaid: existing.amount
      }
    });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//auto generate monthly records
export const generateMonthlyRecords = async (req,res)=>{
    try{
        const {month} = req.body;

        if(!month) {
            return res.status(400).json({error: "Month required"});
        }

        const flats = await prisma.flat.findMany();

        for(let flat of flats){

            if(!flat.flatNumber || !flat.type){
                   console.log("Skipping invalid flat:", flat);
                   continue;
            }
            const exists = await prisma.monthlyRecord.findFirst({
                where: {
                    flatId: flat.id,
                    month: month
                }
            });
            if(exists) {
                console.log("Already exists for: ", flat.flatNumber);
                continue; //this will skip duplicate
            }
            const plan = await prisma.subscriptionPlan.findFirst({
                where: {type: flat.type},
            }); 
     
            if(!plan) {
                console.log("No Plan for", flat.type);
                continue;
            }

         
            await prisma.monthlyRecord.create({
                data:{
                    flatId: flat.id,
                    month, 
                    amount: plan ? plan.amount : 0,
                    amountPaid: 0,
                    status: "Pending"

                }
            });

          
    }

    res.json({ message: "Records generated" });

  } catch(err){
  console.error(" ERROR:", err);   
  res.status(500).json({error: err.message});
}


        }

        export const getUserRecord = async (req,res) => {
            try{
                const userId = req.user.id;

                const user = await prisma.user.findUnique({
                    where: {id: userId}
                });
                const record = await prisma.monthlyRecord.findFirst({
                    where: {
                        flatId: user.flatId
                    },
                    orderBy: { createdAt: "desc"}
                });

                res.json(record);
            } catch(err){
                console.log(err);
                res.status(500).json({error: "Error fetching user record"});
            }
        }
    
