import express from 'express';
import { buyCourse, createCourse, deleteCourse, getCourses, partculrCourse, updateCourse } from '../Controller/Course.control.js';
import usermiddlewere from '../Middlewere/User.mid.js';
import adminMiddleware from '../Middlewere/Admine.mid.js';
const router = express.Router();
// || route neviget the other page or route
router.post("/create",adminMiddleware, createCourse);
router.put("/update/:courseId",adminMiddleware, updateCourse);
router.delete("/delete/:courseId",adminMiddleware, deleteCourse);
router.get("/courses", getCourses);
router.get("/Part..course/:courseId",partculrCourse );

router.post('/buy/:courseId',usermiddlewere,buyCourse)


export default router;