import prisma from "../config/prisma.js";

export const getDashboardData = async (req, res)=> {
    try{
        //fetch total flats
        const totalFlats = await prisma.flat.count();

        //pending payments

        const pendingPayments = await prisma.monthlyRecord.count({
            where: {status: "Pending"},
    });
    //total revenue
    const Payments = await prisma.payment.findMany();
    const totalRevenue = Payments.reduce((sum,p)=> sum + p.amountPaid , 0);

    //recent payments
    const recentPayments = await prisma.payment.findMany({
        
        orderBy: {date: "desc"},
        take: 5,
    });

    res.json({
        totalFlats,
        pendingPayments,
        totalRevenue,
        recentPayments,
    });  
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};