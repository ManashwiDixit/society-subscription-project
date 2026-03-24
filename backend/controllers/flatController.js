import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

//creating flat
export const createFlat = async (req, res) => {
  try {
    const { owner, email, phone, type, flatNumber, status } = req.body;

    // 1. create flat
    const flat = await prisma.flat.create({
      data: {
        owner,
        email,
        phone,
        type,
        flatNumber,
        status,
      },
    });

    // 2. check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      // 3. create user automatically
      const tempPassword = "Temp@123";
      const hashed = await bcrypt.hash(tempPassword, 10);

      await prisma.user.create({
        data: {
          name: flat.owner,
          email: flat.email,

          phone: flat.phone,
          password: hashed,
          role: "user",
          flatId: flat.id,
        },
      });
    }

    res.json({
      message: "Flat + User created",
      tempPassword: "Temp@123", // show this
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating flat" });
  }
};
//get all flats
//here using arrow function

export const getFlats = async (req,res)=>{
    try{
        const flats = await prisma.flat.findMany({
            orderBy: {createdAt : "desc"}
        });

        res.json(flats);

    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

//update flat
export const updateFlat = async (req,res)=>{
    try{
        const {id} = req.params;

        const { flatNumber, type, owner, email, phone, status } = req.body;

        const updatedFlat = await prisma.flat.update({
            where:{id},
            data:{
                flatNumber,
                type,
                owner,
                email,
                phone,
                status

            }
        });
        res.json(updatedFlat);

    } catch(err){
        res.status(500).json({error: err.message});
    }
};

//delete flat
export const deleteFlat = async (req,res)=>{
    try{
        const {id} = req.params;

        const deletedFlat = await prisma.flat.delete({
            where:{id}
        });

        res.json(deletedFlat);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};