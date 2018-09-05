/* this get the index from model and later is used
 *  to find the blog model   
 */
const db = require('../../models');


// this is the controller to list all

exports.list_all = function (req, res) {
    db.blog.findAndCountAll()
        .then((data) => {
            res.json(["data", data, ]);
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
 on a specific  category and the amount of those blogs
*/
exports.list_Category = function (req, res) {
    db.blog
        .findAndCountAll({
            where: {
                category: req.params.category
            }
        }).then(result => {
            res.json(["data", result]);
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
        .then(result => {
            res.json(["data", result]);
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
        }).then(result => {
            res.json(["data", result]);
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
};

/**Update a blog by finding thr blog by idif it went well the created blog 
 * data is send back if there are error like there being empty
 * data being send it shows an error
 */

exports.Update_blog = function (req, res) {
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
};

/**Delete a blog by finding thr blog by idif it went well the created blog 
 * data is send back if there are error like there being empty
 * data being send it shows an error
 */

exports.Delete_blog = function (req, res) {
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
};