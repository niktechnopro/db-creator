//this are bunch of functions that we use to validate various things
import React from 'react';
//1st-email validator based on regex
//2nd-password validator based on requirements 

const validate = {
  isPassword(password) {
    let reqMet = false;
    let capLetter = false;
    let oneNum = false;
    const arr = password.split('');
    arr.forEach((char) => {
      if (!isNaN(parseInt(char, 10))) {
        oneNum = true;
      } else if (char === char.toUpperCase()) {
        capLetter = true;
      }
    });
    if (capLetter && oneNum && arr.length > 6) {
      reqMet = true;
    }
    return reqMet;
  },

  isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}

export default validate;