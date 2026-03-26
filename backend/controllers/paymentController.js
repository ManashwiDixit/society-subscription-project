import prisma from "../config/prisma.js";

export const createPayment = async (req, res) => {
  try {
    const user = req.user;

    let { flat, month, amountPaid, mode } = req.body;

    let flatData;

    // ADMIN FLOW 
    if (user.role === "admin") {
      if (!flat || !month || !amountPaid || !mode) {
        return res.status(400).json({ error: "all fields required" });
      }

      flatData = await prisma.flat.findFirst({
        where: { flatNumber: flat },
      });

      if (!flatData) {
        return res.status(404).json({ error: "Flat not found" });
      }
    }

    // USER FLOW 
    else {
      if (!amountPaid || !mode) {
        return res.status(400).json({
          error: "amount and mode required",
        });
      }

      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!dbUser || !dbUser.flatId) {
        return res.status(404).json({
          error: "User flat not found",
        });
      }

      flatData = await prisma.flat.findUnique({
        where: { id: dbUser.flatId },
      });

      if (!flatData) {
        return res.status(404).json({
          error: "Flat not found",
        });
      }

    
    }

     // use month from frontend, fallback if missing
if (!month) {
  month = new Date().toLocaleString("default", { month: "long" });
}

// format same as DB
const formattedMonth =
  month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

    // FIND MONTHLY RECORD
    let record = await prisma.monthlyRecord.findFirst({
      where: {
        flatId: flatData.id,
        month: formattedMonth,
      },
    });

    console.log("FOUND RECORD:", record);

    if (!record) {
      return res.status(404).json({
        error: "Monthly record not found. Generate records first.",
      });
    }

    //  UPDATE PAYMENT
    const newPaid = (record.amountPaid || 0) + Number(amountPaid);

    if (newPaid > record.amount) {
      return res.status(400).json({
        error: "Payment exceeds total amount",
      });
    }

    const updatedRecord = await prisma.monthlyRecord.update({
      where: { id: record.id },
      data: {
        amountPaid: newPaid,
        status:
          newPaid >= record.amount
            ? "Paid"
            : newPaid > 0
            ? "Partial"
            : "Pending",
      },
    });

    console.log("New Paid:", newPaid);

    // SAVE PAYMENT
    const payment = await prisma.payment.create({
      data: {
        flat: flatData.flatNumber,
        month: formattedMonth,
        amount: Number(amountPaid),
        amountPaid: Number(amountPaid),
        mode: mode || "online",
        status: "Paid",
      },
    });

    console.log("UPDATED RECORD:", updatedRecord);

    res.json({ payment, updatedRecord });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};