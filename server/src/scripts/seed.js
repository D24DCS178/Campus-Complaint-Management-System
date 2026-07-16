const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("../config/db");

const User = require("../models/User");

const { ROLES } = require("../constants");

const seedAdmin = async () => {

    const adminExists = await User.findOne({

        email: "admin@campus.com"

    });

    if(adminExists){

        console.log("Admin already exists.");

        return;

    }

    await User.create({

        name:"System Administrator",

        email:"admin@campus.com",

        password:"Admin@123",

        enrollmentNo:"ADMIN001",

        department:"Administration Office",

        role:ROLES.ADMIN

    });

    console.log("Admin created successfully.");

};

const runSeeder = async () => {

    try{

        await connectDB();

        await seedAdmin();

        process.exit();

    }

    catch(error){

        console.error(error);

        process.exit(1);

    }

};

runSeeder();