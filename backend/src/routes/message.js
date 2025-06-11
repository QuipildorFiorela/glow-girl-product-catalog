//ROUTES: EXPLICA AL SERVIDOR QUÉ FUNCIÓN SE ENCUENTRA EN CADA RUTA
const express = require("express");
const messageController = require("../controllers/message.controller");

const router = express.Router()


router.get("/", messageController.getTable)

module.exports = router;