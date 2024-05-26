// jobRoutes.js
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const assetController = require('../controllers/assets');

router.post('/adddata', upload.single(), assetController.createData);
router.get('/getBalance', assetController.balance)


module.exports = router;
