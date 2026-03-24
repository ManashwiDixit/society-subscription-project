import prisma from "../config/prisma.js"

//get all plans

export const getPlans = async (req , res) => {
     
 try{
    const plans = await prisma.subscriptionPlan.findMany();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE plan
export const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const updated = await prisma.subscriptionPlan.update({
      where: { id },
      data: { amount: Number(amount) }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}