
const { URL } = require("../config/env");
const constroller = require("../constroller/contact.js");
// const multer = require('multer')

// const storage = multer.memoryStorage();
// const upload = multer({
//     // storage,
//     dest: "FotoTKP/",
//   });


module.exports = app => {

    app.get(
        `${URL}/Contacts`,
        constroller.Contacts
    );
};