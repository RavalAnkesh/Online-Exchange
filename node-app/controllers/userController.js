const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt.js for password hashing
var jwt = require('jsonwebtoken');

const Users = mongoose.model('Users', {
    username: String,
    mobile: String,
    email: String,
    password: String,
    role:{ 
            type : String,
            enum :['USER','ADMIN'],
            default: 'USER'
        },
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

module.exports.likeProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'liked success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

}

module.exports.dislikeProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $pull: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'Disliked success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

}

// module.exports.signup = (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const email = req.body.email;
//     const mobile = req.body.mobile;
//     const role = req.body.role;
//     const user = new Users({ username: username, password: password, email, mobile , role:role});
//     user.save()
//         .then(() => {
//             res.send({ message: 'saved success.' })
//         })
//         .catch(() => {
//             res.send({ message: 'server err' })
//         })

// }

module.exports.signup = (req, res) => {
    const { username, password, email, mobile, role } = req.body;

    // Hash password before saving it
    bcrypt.hash(password, 10, function(err, hashedPassword) {
        if (err) {
            return res.status(500).send({ message: 'Error hashing password.' });
        }

        const user = new Users({ username, email, mobile, password: hashedPassword, role });
        user.save()
            .then(() => {
                res.send({ message: 'saved success.' });
            })
            .catch((err) => {
                res.status(500).send({ message: 'Server error', error: err });
            });
    });
};





module.exports.myProfileById = (req, res) => {
    let uid = req.params.userId

    Users.findOne({ _id: uid })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

    return;

}

module.exports.getUserById = (req, res) => {
    const _userId = req.params.uId;
    Users.findOne({ _id: _userId })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}



// module.exports.login = (req, res) => {
//     const identifier = req.body.identifier; // Can be either username or email
//     const password = req.body.password;

//     // Check either username or email exists
//     Users.findOne({ $or: [{ email: identifier }] })
//         .then((result) => {
//             if (!result) {
//                 res.send({ message: 'User not found.' });
//             } else {
//                 if (result.password === password) {
//                     const token = jwt.sign({
//                         data: result
//                     }, 'MYKEY', { expiresIn: '1h' });

//                     // Send back user role along with other data
//                     res.send({ message: 'Login success.', token: token, userId: result._id, username: result.username, role: result.role });
//                 } else {
//                     res.send({ message: 'Password incorrect.' });
//                 }
//             }
//         })
//         .catch((err) => {
//             console.error('Error:', err);
//             res.send({ message: 'Server error' });
//         });
// };



module.exports.login = (req, res) => {
    const identifier = req.body.identifier; // Can be either username or email
    const password = req.body.password;

    // Check either username or email exists
    Users.findOne({ $or: [{ email: identifier }] })
        .then((result) => {
            if (!result) {
                res.status(401).send({ message: 'User not found.' });
            } else {
                // Compare hashed password with provided password
                bcrypt.compare(password, result.password, function(err, passwordMatch) {
                    if (err) {
                        return res.status(500).send({ message: 'Error comparing passwords.' });
                    }
                    if (passwordMatch) {
                        // Passwords match, proceed with generating token
                        const token = jwt.sign({
                            data: result
                        }, 'MYKEY', { expiresIn: '1h' });
                        res.send({ message: 'Login success.', token, userId: result._id, username: result.username, role: result.role });
                    } else {
                        // Passwords don't match
                        res.status(401).send({ message: 'Password incorrect.' });
                    }
                });
            }
        })
        .catch((err) => {
            console.error('Error:', err);
            res.status(500).send({ message: 'Server error' });
        });
};





module.exports.likedProducts = (req, res) => {

    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.likedProducts })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

}





