const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.set("port", 3030);

module.exports = app;

