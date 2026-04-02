import prisma from "../config/prisma.js";

export const getAdminReport = async (req , res) => {
    try{
        const records = await prisma.monthlyRecord.findMany();

        const totalExpected = records.reduce((sum,r) => sum + r.amount ,0);

        const totalCollection = records.reduce(
          (sum, r) => sum + r.amountPaid,
          0
         );

        const pending = totalExpected-totalCollection;

        const totalFlats = await prisma.flat.count();

        res.json({
            totalExpected,
            totalCollection,
            pending,
            totalFlats,
        });

    } catch(err){
        res.status(500).json({error: err.message});
    }
}