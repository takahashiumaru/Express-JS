const config = require('../../database');
const mysql = require('mysql2');
const pool = mysql.createPool(config);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require("../model");
const Query = db.query;
// const Op = db.Sequelize.Op;


pool.on('error', (err) => {
    console.error(err);
});

const users = [];
app.use(bodyParser.json());

module.exports = {
    // Get all users
    FindAll(req, res) {
        const query = 'SELECT * FROM users LIMIT 500';

        pool.query(query, (error, results) => {
            console.log(query);
            if (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            } else {
                const message = results.length === 0 ? "Record not found" : "Record found";
                res.status(200).json({
                    success: true,
                    message: message,
                    data: results
                });
            }
        });
    },

    // Get user by ID
    FindByID(req, res) {
        const userId = req.params.id;
        const query = `SELECT * FROM users WHERE id = ? LIMIT 1`;

        pool.query(query, [userId], (error, results) => {
            console.log(results);
            if (error) {
                console.error('Error this query:', error);
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "User not found",
                        data: results
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Record found",
                        data: results
                    });
                }
            }
        });
    },


    // Create a new user
    Create(req, res) {
        if (!req.body.name) {
            res.status(400).json({
                message: "Bad Request: 'name' field is required"
            });
        } else {
            const newUser = {
                name: req.body.name
            };
            users.push(newUser);
            // Save Tutorial in the database
            Query.create(newUser)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    if (err.name === 'SequelizeUniqueConstraintError') {
                        res.status(500).json({
                            success: false,
                            message: "User dengan nama yang telah diberikan sudah ada"
                        });
                    } else {
                        res.status(500).send({
                            message: "Terjadi kesalahan saat menambahkan user baru."
                        });
                    }
                });
            // if (users.length > 0) {
            //     const name = users[users.length - 1].name;
            //     const query = `INSERT INTO users (name) VALUES (?)`;

            //     pool.query(query, [name], (error, results) => {
            //         console.log(results);
            //         if (error) {
            //             console.error('Error creating user:', error);
            //             if (error.code === 'ER_DUP_ENTRY') {
            //                 res.status(500).json({
            //                     success: false,
            //                     message: "User with the provided name already exists"
            //                 });
            //             } else {
            //                 res.status(500).json({
            //                     success: false,
            //                     message: "Internal Server Error"
            //                 });
            //             }
            //         } else {
            //             res.status(201).json({
            //                 success: true,
            //                 message: 'User created successfully',
            //                 data: newUser
            //             });
            //         }
            //     });
            // } else {
            //     res.status(500).json({
            //         success: false,
            //         message: 'Internal Server Error'
            //     });
            // }
        }
    },

    // Update user data
    Update(req, res) {
        const userId = req.params.id;
        const newName = req.body.name;

        if (!newName) {
            res.status(400).json({
                message: "Bad Request: 'name' field is required"
            });
            return;
        }

        const query = `UPDATE users SET name = ? WHERE id = ?`;
        const updateUser = {
            id: userId,
            name: newName
        };

        pool.query(query, [newName, userId], (error, results) => {
            console.log(results);
            if (error) {
                console.error('Error updating user:', error);
                if (error.code === 'ER_DUP_ENTRY') {
                    res.status(500).json({
                        success: false,
                        message: "User with the provided name already exists"
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        message: "Internal Server Error"
                    });
                }
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "User not found",
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "User updated successfully",
                        data: updateUser
                    });
                }
            }
        });
    },

    // Delete user
    Delete(req, res) {
        const userId = req.params.id;

        const query = `DELETE FROM users WHERE id = ?`;

        pool.query(query, [userId], (error, results) => {
            if (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "User not found",
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "User deleted successfully",
                    });
                }
            }
        });
    }
};