const express = require('express');
const router = express();

router.use("/auth", require('./auth'));

router.use("/posts", require('./posts'));

module.exports = router;