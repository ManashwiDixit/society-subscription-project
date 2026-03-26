
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;


//login:- both admin and user can login

export const login = async (req,res) => {

    try{
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            })
        }

        const user = await prisma.user.findUnique({
            where: {email},
        });

          if (!user) {
            return res.status(404).json({ error: "User not found" });
         }

          //  compare password
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
          return res.status(400).json({ error: "Invalid password" });
          }
           //create token
           
         const token = jwt.sign(
            {id: user.id, role: user.role},
            SECRET,
            {expiresIn: "7d"}
         );

         res.json({
            message: "Login success",
            token,
            user:{
                id: user.id,
                email: user.email,
                role: user.role,
            }
          
         })

    } catch(err) {
        res.status(500).json({ error: err.message});
    }
};

export const createUserFromFlat = async (req, res) => {
  try {
    const { email } = req.body;

    //  check flat exists
    const flat = await prisma.flat.findFirst({
      where: { email }
    });

    if (!flat) {
      return res.status(404).json({
        error: "No flat found with this email"
      });
    }

    //  check user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists. Please login."
      });
    }

    //  generate temporary password
    const tempPassword = "Temp@123"; 

    const hashed = await bcrypt.hash(tempPassword, 10);

    //  create user
    const user = await prisma.user.create({
      data: {
        name: flat.owner,
        email: flat.email,
        phone: flat.phone,
        password: hashed,
        role: "user",
        flatId: flat.id
      }
    });

    res.json({
      message: "User created successfully",
      tempPassword 
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};






