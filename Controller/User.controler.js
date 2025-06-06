import { Users } from "../Models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { config } from "dotenv";
import { Purchase } from "../Models/purchase.js";
import { Course } from "../Models/Course.model.js";
// User Signup
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userSchema = z.object({
    firstName: z
      .string()
      .min(3, { message: "firstName must be atleast 3 char long" }),
    lastName: z
      .string()
      .min(3, { message: "lastName must be atleast 3 char long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "password must be atleast 6 char long" }),
  });

  const validatedData = userSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res
      .status(400)
      .json({ errors: validatedData.error.issues.map((err) => err.message) });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ errors: "User already exists" });
    }
    const newUser = await new Users({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Signup succeedded", newUser });
  } catch (error) {
    res.status(500).json({ errors: "Error in signup" });
    console.log("Error in signup", error);
  }
};
// User Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
const user=await Users.findOne({ email: email});
const ispassword = await bcrypt.compare(password,user.password);
if(!ispassword|| !user){
    return res.status(401).json({ errors: "Invalid login user" });
}
// jwt token
var token = jwt.sign({ id: user._id }, "Jsaif@me_fdw%$",
  {expiresIn: "1d" }
);
const cokiesExpire={
  expires:  new Date(Date.now()+24*60*60*1000),//24*60*60*1000
  httpOnly: true,  // catnot be accessed via javascript
  secure: 'Production'===false, // false for http and true for https
}
res.cookie("JWT_TOKEN", token, cokiesExpire)
 await res.status(200).json({massege:"login successful",user,token});
    } catch (error) {
        res.status(500).json({ errors: "Error in login" })
        console.log("Error in login", error);
    }
}

export const logout = (req, res) => {
  try {
  res.clearCookie("JWT_TOKEN");
res.status(200).json({massege:"logout successfully"})    
  } catch (error) {
    console.log("Error in logout", error);
    
  }
}

export const purchases = async (req, res) => {
  const userId = req.userId;

  try {
    const purchased = await Purchase.find({ userId });

    let purchasedCourseId = [];

    for (let i = 0; i < purchased.length; i++) {
      purchasedCourseId.push(purchased[i].courseId);
    }
    const courseData = await Course.find({
      _id: { $in: purchasedCourseId },
    });

    res.status(200).json({ purchased, courseData });
  } catch (error) {
    res.status(500).json({ errors: "Error in purchases" });
    console.log("Error in purchase", error);
  }
};
