const sql = require("../models/db.js");
// const base64Img = require('base64-img');
// const fs = require('fs')

exports.Contacts = (req, responce) => {

    sql.query(`SELECT * FROM contact`, (err, res) => {

        if (res.length > 0) {
            responce.status(200).send({
                status: true,
                message: 'OK',
                data:res

            });
        } else {
            responce.status(201).send({
                status: false,
                message: 'data not found',
            });
        }


    });
};




