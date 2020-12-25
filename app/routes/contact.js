
const { URL } = require("../config/env");
const constroller = require("../constroller/contact.js");
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({
    // storage,
    dest: "public/Image/",
  });


module.exports = app => {

    app.post(
        `${URL}/AddContacts`,
        upload.single('files'),
        constroller.AddContacts
    );
    app.get(
        `${URL}/Contacts`,
        constroller.Contacts
    );
    app.get(
        `${URL}/GetContacts/:id`,
        constroller.GetContacts
    );
    app.post(
        `${URL}/AddToFavorites`,
        constroller.AddToFavorites
    );
    app.post(
        `${URL}/RemoveToFavorites`,
        constroller.RemoveToFavorites
    );
};