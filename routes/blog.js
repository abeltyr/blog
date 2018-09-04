const express = require('express')
const db = require('../models')
const app = express.Router()


app.get("/all", (req, res) => {
    db.blog.findAll({}).then(result => {
        res.json(["data", result]);
    });
});

app.post("/all/Category", (req, res) => {
    db.blog
        .findAll({
            where: {
                category: req.body.category
            }
        }).then(result => {
            db.blog
                .count({
                    where: {
                        category: req.body.category
                    }
                }).then(amount => {
                    res.json(["data", result, "total", [{
                        amount
                    }]]);
                });
        });
});
app.post("/all/Title", (req, res) => {
    db.blog
        .findAll({
            where: {
                title: req.body.title
            }
        })
        .then(result => {
            db.blog.count({
                where: {
                    title: req.body.title
                }
            }).then(amount => {
                res.json(["data", result, "total", [{
                    amount
                }]]);
            });
        });
});

app.post("/User", (req, res) => {
    db.blog.findAll({
        where: {
            user_id: req.body.user_id
        }
    }).then(result => {
        db.blog.count({
            where: {
                user_id: req.body.user_id
            }
        }).then(amount => {
            res.json(["data", result, "total", [{
                amount
            }]]);
        });
    });
});

app.post("/New", (req, res) => {
    db.blog
        .create({
            user_id: req.body.user_id,
            title: req.body.title,
            category: req.body.category,
            content: req.body.content
        })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error.errors);
        });
});
app.put("/Update/:id", (req, res) => {
    db.blog
        .update({
            title: req.body.title,
            category: req.body.category,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        });
});
app.delete("/Delete/:id", (req, res) => {
    db.blog
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        });
});
module.exports = app;