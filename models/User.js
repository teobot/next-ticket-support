// getting access to schema
import mongoose from "mongoose";

import bcrypt from "bcrypt";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  permissions: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
});

userSchema.pre("save", function (next) {
  // Only salt and hash its a new user
  const user = this;
  if (!user.isModified("password")) {
    // If password is already hashed
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    // Generate salt
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      // Hash the password using the salt
      if (err) {
        return next(err);
      }

      // overwrite the password with the hashed value
      user.password = hash;
      next();
    });
  });
});

userSchema.pre("update", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    // Generate salt
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      // Hash the password using the salt
      if (err) {
        return next(err);
      }

      // overwrite the password with the hashed value
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  // Foreach user that is created
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      // Check if the hashed password is the same that is in the database
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

export const returnPermissionsObject = () => {
  let permissions = Object.keys(JSON.parse(JSON.stringify(userSchema)).paths)
    .filter((key) => key.includes("permissions"))
    .map((key) => {
      return key.replace("permissions.", "");
    });

  let permissionsObj = {};
  permissions.forEach((perm) => {
    permissionsObj[perm] = false;
  });

  return permissionsObj;
};

export default mongoose.models.User || mongoose.model("User", userSchema);
