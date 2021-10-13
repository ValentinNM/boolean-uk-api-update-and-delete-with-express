const { json } = require("body-parser");
const express = require("express");

const {
    createOne,
    getAll,
    getOneById,
    updateOneById,
    updateOneByTitle,
    deleteOneById,
    patchOneById
    } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:id", updateOneById);

router.patch("/:id",patchOneById);

router.put("/book/:name", updateOneByTitle);
// router.put("/:id", (req, res) => { 
//     console.log("PUT method req body: ", req.body)
//     res.json({ output : "data"})
// });

router.delete("/:id", deleteOneById);

module.exports = router;
