const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { ROLES } = require("../constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    enrollmentNo: {
      type: String,
      required: [true, "Enrollment Number is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.STUDENT,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

module.exports = mongoose.model("User", userSchema);