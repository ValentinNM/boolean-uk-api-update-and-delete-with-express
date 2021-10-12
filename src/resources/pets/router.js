const express = require("express");

const { createOne, getAll, getOneById, updatePetById, updateOneByName, deleteOneById } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

// router.patch("/:id", (req,res) => { 
//     console.log("router patch: ", req.body)
//     res.json({ something : "somthingelse"})
// })

router.put("/:id", updatePetById); 

router.put("/pet/:name", updateOneByName);

router.delete("/:id", deleteOneById)

module.exports = router;