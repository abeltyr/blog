/* this get the index from model and later is used
 *  to find the blog model   
 */
const db = require('../../models');


// this is the controller to list all

exports.list_all = function (req, res) {
    db.blog.findAndCountAll()
        .then((data) => {
            res.json(["data", data]);
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
};

exports.blog_detail = function (req, res) {
    db.blog.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((data) => {
            res.json(["data", data]);
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
};




/* this is the controller to list all blog
 on a specific  categoric and the amount of those blogs
*/
exports.list_Category = function (req, res) {
    db.blog
        .findAndCountAll({
            where: {
                category: req.params.category
            },
        }, ).then(data => {
            res.json(["data", data]);
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
};

/* this is the controller to list all blog
 based on title and the amount of those blogs
*/
exports.list_Title = function (req, res) {
    db.blog
        .findAndCountAll({
            where: {
                title: req.params.title
            }
        })
        .then(data => {
            res.json(["data", data]);
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
};

/* this is the controller to list all blog based on 
 *  specific  user and the amount of those blogs
 */

exports.blog_User = function (req, res) {
    db.blog.findAndCountAll({
            where: {
                user_id: req.params.user
            }
        }).then(data => {
            res.json(["data", data]);
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
};

/**create a new blog if it went well the created blog 
 * data is send back if there are error like there being empty
 * data being send it shows an error
 */

exports.New_blog = function (req, res) {
    var CRepeat = 0;
    var TRepeat = 0;
    db.blog.count({
        where: {
            content: req.body.content
        }
    }).then(data => {
        CRepeat = data;
        db.blog.count({
            where: {
                title: req.body.title,
            }
        }).then(data => {
            TRepeat = data;
            /**
             * the if prevent from duplicating a blog that already exist
             */
            if ((CRepeat == 0) || (TRepeat == 0)) {
                db.blog
                    .create({
                        user_id: req.body.user_id,
                        title: req.body.title,
                        category: req.body.category,
                        content: req.body.content
                    })
                    .then(data => {
                        res.json(data);
                    })
                    .catch(error => {
                        res.json(error.errors);
                    });
            } else {
                res.status(422).json(["Duplicate entry"]);
            }
        })
    })

};

/**Update a blog by finding thr blog by idif it went well the created blog 
 * data is send back if there are error like there being empty
 * data being send it shows an error
 */

exports.Update_blog = function (req, res) {
    let CTitle = "";
    let CCategory = "";
    let CContent = "";


    /** TODO add the a way to make update available only for the user who
     *  blogged the article     * 
     */
    db.blog.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((data) => {
            CTitle = data.title;
            CCategory = data.category;
            CContent = data.content;

            /**
             * here we check if the there data being sent has changed or not
             */

            if ((CTitle == req.body.title) && (CCategory == req.body.category) && (CContent == req.body.content)) {
                res.status(400).json(["there seems to be no change to your blog titled " + req.body.title]);
            } else {
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
                    .then(data => {
                        res.json(data);
                    })
                    .catch(error => {
                        res.json(error);
                    });
            }

        })
        .catch((error) => {
            res.status(404).json(['this blog not found']);
        });

};

/**Delete a blog by finding thr blog by idif it went well the created blog 
 * data is send back if there are error like there being empty
 * data being send it shows an error
 */

exports.Delete_blog = function (req, res) {
    /** TODO add the a way to make update available only for the user who
     *  blogged the article     * 
     */
    db.blog
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error);
        });
};
/**
 * Add selected blog to favorite
 */

exports.Add_favorite = function (req, res) {
    /** TODO add the a way to make update available only for the user who
     *  blogged the article     * 
     */
    db.favorites

    var URepeat = 0;
    var BRepeat = 0;
    db.favorites.count({
        where: {
            user_id: req.body.user_id,
        }
    }).then(data => {
        URepeat = data;
        db.favorites.count({
            where: {
                blog_id: req.body.blog_id,
            }
        }).then(data => {
            BRepeat = data;
            /**
             * the if prevent from duplicating a blog that already exist
             */
            if ((URepeat == 0) || (BRepeat == 0)) {
                db.favorites
                    .create({
                        user_id: req.body.user_id,
                        blog_id: req.body.blog_id,
                        title: req.body.title
                    })
                    .then(data => {
                        res.json(data);
                    })
                    .catch(error => {
                        res.json(error.errors);
                    });
            } else {
                res.status(422).json(["Duplicate entry"]);
            }
        })
    })
};

exports.get_favorite = function (req, res) {
    db.favorites.findAndCountAll({
            where: {
                user_id: req.params.id,
            }
        })
        .then((data) => {
            res.json(["data", data]);
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
};