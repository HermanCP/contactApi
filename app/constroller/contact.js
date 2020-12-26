const sql = require("../models/db.js");
const { endoint } = require("../config/env")

exports.Contacts = (req, responce) => {

    sql.query(`SELECT a.id, a.firstName, 
            a.lastName, a.mobile, a.avatar,a.email,
            b.isFavorites 
            FROM contact a 
            LEFT JOIN favorites b 
            ON a.id = b.user_id group 
            by a.id ORDER BY a.createdAt DESC`, (err, res) => {

        if (res.length > 0) {
            const avt = {}
            const newArr = []
            res.forEach(function (v) {
                avt['avatar'] = `${endoint}/${v.avatar}`;

                a = Object.assign(v, avt);
                newArr.push(a);

            })
            responce.status(200).send({
                status: true,
                message: 'OK',
                data: newArr

            });
        } else {
            responce.status(201).send({
                status: false,
                message: 'data not found',
            });
        }


    });
};

exports.AddContacts = (req, res) => {
    var path_file = 'public/Image/' + req.file.filename;
    const { firstName, lastName, mobile, email } = req.body;
    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "mobile": mobile,
        "avatar": path_file,
        "email": email,
        "createdAt":new Date(),
        "updatedAt":new Date()

    }
    let qry = 'INSERT INTO contact SET ?';
    sql.query(qry, data, function (err, result) {
        if (err) throw err;
        res.status(200).send({
            status: true,
            message: 'success insert',
        });
    });
};
exports.GetContacts = (req, responce) => {
    const { id } = req.params
    sql.query(`SELECT a.id, a.firstName, 
            a.lastName, a.mobile, a.avatar,a.email,
            b.isFavorites 
            FROM contact a 
            LEFT JOIN favorites b 
            ON a.id = b.user_id 
            WHERE a.id=${id}
            group by a.id`, (err, res) => {
        if (res.length > 0) {
            const avt = {}
            const newArr = []
            res.forEach(function (v) {
                avt['avatar'] = `${endoint}/${v.avatar}`;

                a = Object.assign(v, avt);
                newArr.push(a);

            })
            responce.status(200).send({
                status: true,
                message: 'OK',
                data: newArr[0]

            });
        } else {
            responce.status(201).send({
                status: false,
                message: 'data not found',
            });
        }
    });
};
exports.AddToFavorites = (req, res) => {
    const { id } = req.body;
    var data = {
        "user_id": id,
        "isFavorites": 1
    }
    let qry = 'INSERT INTO favorites SET ?';
    sql.query(qry, data, function (err, result) {
        if (err) throw err;
        res.status(200).send({
            status: true,
            message: 'success insert',
        });
    });
};
exports.RemoveToFavorites = (req, res) => {
    const { id } = req.body;
    let qry = `DELETE FROM favorites WHERE user_id =${id}`;
    sql.query(qry, function (err, result) {
        if (err) throw err;
        res.status(200).send({
            status: true,
            message: 'success deleted',
        });
    });
};

exports.UpdateContacts = (req, res) => {
    const {id}= req.params;
    const {firstName, lastName,mobile,email } = req.body;

    let qr;
    if(req.file === undefined){
        qr ='';
    }else{
        var path_file = 'public/Image/' + req.file.filename;
        qr = `,avatar='${path_file}'`;
    }
    let query = `UPDATE contact SET  firstName='${firstName}', lastName='${lastName}',mobile='${mobile}', email='${email}' ${qr}  where id='${id}'`;
    sql.query(query, function (err, result) {
        if (err) throw err;
        res.status(200).send({
            status: true,
            message: 'success updated',
        });
    });
};





