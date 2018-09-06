const db = require('../../models');


exports.Following_user = function (req, res) {
    db.follow_user.findAndCountAll({
            where: {
                follower_id: req.params.id
            }
        })
        .then((data) => {
            res.json(["data", data]);
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
};
exports.Following_category = function (req, res) {
    db.follow_category.findAndCountAll({
            where: {
                user_id: req.params.id
            }
        })
        .then((data) => {
            res.json(["data", data]);
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
};

exports.Follow_category = function (req, res) {
    db.follow_category
        .findOrCreate({
            where: {
                user_id: req.body.user_id,
                category: req.body.category,
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error.errors);
        });
};
exports.Follow_user = function (req, res) {
    db.follow_user
        .findOrCreate({
            where: {
                follower_id: req.body.follower_id,
                followed_id: req.body.followed_id,
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error.errors);
        });
};
exports.Unfollow_user = function (req, res) {
    db.follow_user
        .destroy({
            where: {
                follower_id: req.body.follower_id,
                followed_id: req.body.followed_id,
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error.errors);
        });
};
exports.unfollow_category = function (req, res) {
    db.follow_category
        .destroy({
            where: {
                user_id: req.body.user_id,
                category: req.body.category,
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error.errors);
        });
};