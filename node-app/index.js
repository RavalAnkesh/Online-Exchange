

const express = require('express')
const cors = require('cors')
const path = require('path');
var jwt = require('jsonwebtoken');
const multer = require('multer')
const http = require('http');

const { Server } = require("socket.io");
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
const bodyParser = require('body-parser')
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017')

app.get('/', (req, res) => {
    res.send('hello...')
})

app.get('/search', productController.search)
app.post('/like-product', userController.likeProducts)
app.post('/dislike-product', userController.dislikeProducts)
app.post('/add-product', upload.fields([{ name: 'pimage' }, { name: 'pimage2' }]), productController.addProduct)
app.post('/edit-product', upload.fields([{ name: 'pimage' }, { name: 'pimage2' }]), productController.editProduct)
app.get('/get-products', productController.getProducts)
app.post('/delete-product', productController.deleteProduct)

app.post('/delete-producta', productController.handledelete)
app.get('/get-product/:pId', productController.getProductsById)
app.post('/liked-products', userController.likedProducts)
app.post('/my-products', productController.myProducts)
app.post('/delete-product', productController.deleteProduct)
app.post('/signup', userController.signup)
app.get('/my-profile/:userId', userController.myProfileById)
app.get('/get-user/:uId', userController.getUserById)
app.post('/login', userController.login)


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // Add more fields as needed
});


const User = mongoose.model('User', userSchema);
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Server error' });
  }
});





httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

