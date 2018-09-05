const db = require('../../models');


exports.list_all = function (req, res) {
    db.comment.findAndCountAll({
            where: {
                blog_id: req.params.id
            }
        })
        .then((data) => {
            res.json(["data", data]);
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
};

exports.New_comment = function (req, res) {
    db.comment.findAndCountAll({
        where: {
            user_id: req.body.user_id,
            blog_id: req.body.blog_id,
        }
    }).then(results => {
        if (results.count == 0) {
            db.comment
                .create({
                    user_id: req.body.user_id,
                    blog_id: req.body.blog_id,
                    comments: req.body.comments,
                    name: req.body.name,
                })
                .then(data => {
                    res.json(data);
                })
                .catch(error => {
                    res.json(error.errors);
                });
        } else {
            res.status(422).json(["only one comment per person"]);
        }

    })
};

exports.Delete_comment = function (req, res) {
    /** TODO add the a way to make update available only for the user who
     *  blogged the article     * 
     */
    db.comment
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(500).send('Internal Server Error');
        });
};