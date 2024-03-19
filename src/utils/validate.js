import { z } from 'zod';

// Define schemas for email, password, and mobile number validation
const emailSchema = z.string().email();
const passwordSchema = z.string().min(6); // Adjust minimum length as needed
const mobileNumberSchema = z.string().regex(/^\d{10}$/);
const AadharCardSchema = z.string().regex(/^\d{12}$/);
// Validate email
const validateEmail = (email) => {
  try {
    emailSchema.parse(email);
    return true; // Valid email
  } catch (error) {
    return false // Invalid email
  }
};

// Validate password
const validatePassword = (password) => {
  try {
    passwordSchema.parse(password);
    return true; // Valid password
  } catch (error) {
    return false // Invalid password
  }
};

// Validate mobile number
const validateMobileNumber = (mobileNumber) => {
  try {
    mobileNumberSchema.parse(mobileNumber);
    return true; // Valid mobile number
  } catch (error) {
    return false // Invalid mobile number
  }
};

// Function to validate Aadhar card number
const validateAadharCardNumber = (aadharCardNumber) => {
    try {
        AadharCardSchema.parse(aadharCardNumber);
        return true; // Aadhar card number is valid
    } catch (error) {
        return false; // Aadhar card number is invalid
    }
};

export const validateRegisterForm=(mobileNumber,password,email)=>{
    if(!validateMobileNumber(mobileNumber)){
        return "Mobile number is not valid"
    }else if(!validateEmail(email)){
        return "Email is not valid"
    }else if(!validatePassword(password)){
        return "Password must be at least 6 characters long"
    }
   return true
}

export const validateLoginForm=(password,email)=>{
    if (
        [password,email].some(
          (field) => field?.trim() === ""
        )
      ) {
        return "Please fill all the fields"
      }
   if(!validateEmail(email)){
        return "Email is not valid"
    }else if(!validatePassword(password)){
        return "Password must be at least 6 characters long"
    }
   return true
}

export const validateAadharForm=(employeeName,aadharCardHolderName,aadharCardNumber,aadharCard)=>{
    if (
        [employeeName, aadharCardHolderName, aadharCardNumber].some(
          (field) => field?.trim() === ""
        )
      ) {
        return "Please fill all the fields"
      }
      if(!aadharCard){
        return "Please upload file"
      }
     if(!validateAadharCardNumber(aadharCardNumber)){
        return "Aadhar card number is invalid"
     }
      return true
}

export const htmlErrorMsg=(errorHtml)=>{
// Regular expression to match the error message
const errorMessageRegex = /Error: (.+?)<br>/;
const match = errorMessageRegex.exec(errorHtml);

// Extract the error message
const errorMessage = match ? match[1] : 'An error occurred';
   return errorMessage
}