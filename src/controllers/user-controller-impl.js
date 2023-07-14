const config = require('../database/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    // Ambil data semua karyawan
    getUser(req, res) {
        const query = 'SELECT * FROM discount_proposals LIMIT 2';
        console.log(query); // Mencetak query ke konsol

        pool.query(query, (error, results) => {
            if (error) {
                throw error;
            }
            res.send({
                success: true,
                message: 'Record Found',
                data: results
            });
        });
    }

}