const db = require("../../utils/database");

const Book = require("./model")

function createOne(req, res) {
  const createOne = `
    INSERT INTO books
      (name, type, author, topic, publicationDate)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  db.query(createOne, Object.values(req.body))
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAll = `
    SELECT *
    FROM books;
  `;

  db.query(getAll)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneById = `
    SELECT *
    FROM books
    WHERE id = $1;
  `;

  db.query(getOneById, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updateOneById(req, res) { 
//  console.log("inside updateOneById: ", req.body);
// res.json({ dummydata: "works"});

const idToUpdate = req.params.id;
console.log("updateOneById idToUpdate: ", req.params.id);

const bookToUpdate = { 
  id: req.params.id,
  ...req.body
}

const updatedOne = `
  UPDATE books
  SET
    title = $1, 
    type = $2,
    author = $3,
    topic = $4,
    publicationDate = $5
  WHERE
    id = $6
  RETURNING *;
  `;

    const {title,type, author, topic, publicationDate, id} = bookToUpdate;
  db.query(updatedOne, [
    title,
    type,
    author,
    topic,
    publicationDate,
    id
  ])
  .then((result) => res.json({response : result.rows[0]}))
  .catch(console.error);
}

function updateOneByTitle(req, res) {
  console.log("inside getOneByTitle: ", req.body);
  
  const bookToUpdate = { 
    title: req.params.title, 
    ...req.body
  }

  const updateBookByTitleSQL = `
  UPDATE books
  SET
    type = $1,
    author = $2,
    topic = $3,
    publicationDate = $4,
    id = $5
  WHERE
    title = $6
  RETURNING *;
  `;
  
  
  const {type, author, topic, publicationDate, id, title } =bookToUpdate;

  db.query(updateBookByTitleSQL, [type, author, topic, publicationDate, id, title])
  .then((result)=> res.json({data : result.rows[0]}))
  .catch(console.error);
}

function deleteOneById(req, res) { 
  // console.log("inside delete: ", req.body)
  // res.json({smth : true});

  const idToDelete = {
    id: req.params.id, 
    ...req.body
  }

  const bookeToDelete = `
    DELETE FROM books
    WHERE id = $1;
  `;

  db.query(bookeToDelete, [idToDelete.id])
  .then((result) => res.json({ delete : "successfull"}))
  // .then((result) => res.json({ delete : result.rows[{ delete : true}]}))
  .catch(console.error);

}

module.exports = {
  createOne,
  getAll,
  getOneById,
  updateOneById,
  updateOneByTitle,
  deleteOneById
};
