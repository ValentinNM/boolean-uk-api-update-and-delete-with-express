const db = require("../../utils/database");

const Pet = require("./model")

function createOne(req, res) {
  const createOne = `
    INSERT INTO pets
      (name, age, type, microchip)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *;
  `;

  db.query(createOne, Object.values(req.body))
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAll = `
    SELECT *
    FROM pets;
  `;

  db.query(getAll)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneById = `
    SELECT *
    FROM pets
    WHERE id = $1;
  `;

  db.query(getOneById, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updatePetById(req, res) { 
  console.log("inisde updatePetById: ", req.body)
  // res.json({data : "works"})

  const petToUpdate = { 
    id: req.params.id, 
    ...req.body
  }

  const updatedPet = `
    UPDATE pets
    SET
      name = $1,
      age = $2,
      breed = $3,
      microchip = $4,
      type = $5
    WHERE
      id = $6
    RETURNING *;
  `;

  const { name, age, breed, microchip, type, id} = petToUpdate;

  db.query(updatedPet, [name, age, breed, microchip, type, id])
  .then((result) => res.json({ updatedPet : result.rows[0]}))
  .catch(console.error);
  }
  
function updateOneByName(req, res) { 
  // console.log("inisde updateOneByName", req.body)
  // res.json({ someData : true});

  const petToUpdate = { 
    name: req.params.name, 
    ...req.body
  }

  const updatedPet = `
    UPDATE pets
    SET
      age = $1,
      breed = $2,
      microchip = $3,
      type = $4,
      id = $5
    WHERE name = $6
    RETURNING *;
  `;

  const { age, breed, microchip, type, id, name} = petToUpdate;

  db.query(updatedPet, [age, breed, microchip, type, id, name])
  .then((petHasLegallyChangedHisName) => res.json({ newName : petHasLegallyChangedHisName.rows[0]}))
  .catch(console.error);
}

function deleteOneById(req, res) { 
  
  const petToRemove = {
    id: req.params.id,
    ...req.body
  }

  console.log("petToRemove: ", petToRemove);

  petToRemoveSQL = `
  DELETE FROM pets
  WHERE id = $1;
  `;

  db.query(petToRemoveSQL, [petToRemove.id])
  .then(res.json({ petRemoved: true}))
  .catch(console.error)
}

module.exports = {
  createOne,
  getAll,
  getOneById,
  updatePetById,
  updateOneByName,
  deleteOneById
};
