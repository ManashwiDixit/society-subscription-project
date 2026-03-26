import prisma from "../config/prisma.js"
import bcrypt from "bcrypt";

export const createUser = async (req,res) => {
    try{
        const {name, email, phone } = req.body;

        //temporary password
        const tempPassword = "123456";

        const hashed = await bcrypt.hash(tempPassword, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashed,
                role: "user"
            }
        });

        res.json({
            message: "User created",
            tempPassword
        });

    }
    catch(err) {
        res.status(500).json({error : err.message});

    }
};

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        flat: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};