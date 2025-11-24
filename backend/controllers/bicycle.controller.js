const db = require("../models");
const Bicycle = db.bicycles;
const fs = require("fs");
const path = require("path");
// const Op = db.Sequelize.Op;

// Create and Save a new Bicycle
exports.create = (req, res) => {
  // Validate request
  if (!req.body.brand || !req.body.model) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }
  console.log(req.body)
  // Create a Bicycle
  const bicycle = {
    brand: req.body.brand,
    model: req.body.model,
    // DECOMMENT: 
    filename: req.file ? req.file.filename : ""
  }

  // Save Bicycle in the database
  Bicycle.create(bicycle).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Bicycle."
    })
  });
};

// Update a Bicycle by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id || req.body.id;
  
  try {
    const bicycle = await Bicycle.findByPk(id);
    if (!bicycle) {
      return res.status(404).send({ message: "Bicycle not found." });
    }

    // armamos el objeto con los campos que sí se envían
    let updatedData = {
      brand: req.body.brand,
      model: req.body.model
    };

    // si llega archivo, actualizar filename
    if (req.file) {
      // si hay nueva imagen, eliminar la anterior
      if (bicycle.filename) {
        const oldImagePath = path.join(__dirname, '..', 'public', 'images', bicycle.filename);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
          else console.log("Old image deleted:", bicycle.filename);
        });
      }
      updatedData.filename = req.file.filename;
    }

    await Bicycle.update(updatedData, { where: { id } });
    res.send({ message: "Bicycle updated successfully." });

  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error updating Bicycle with id=" + id
    });
  }
  
};
  
  // Retrieve all Bicycles from the database.
  exports.findAll = (req, res) => {
    Bicycle.findAll().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving all Bicycles."
      })
    })
  };
  
  // Find a single Bicycle with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Bicycle.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Can't find Bicycle with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error retrieving Bicycle with id=${id}.`,
        });
      });
  }

// Delete a Bicycle with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    // 1. Buscar la bicicleta
    const bicycle = await Bicycle.findByPk(id);

    if (!bicycle) {
      return res.status(404).send({
        message: `Bicycle with id=${id} not found.`
      });
    }

    // 2. Si tiene imagen, borrarla del sistema de archivos
    if (bicycle.filename) {
      const imagePath = path.join(__dirname, "../public/images", bicycle.filename);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log("⚠️ No se pudo borrar imagen:", err);
        } else {
          console.log("🗑 Imagen eliminada:", bicycle.filename);
        }
      });
    }

    // 3. Eliminar el registro de la base de datos
    await Bicycle.destroy({
      where: { id }
    });

    res.send({
      message: "Bicycle deleted successfully."
    });

  } catch (err) {
    res.status(500).send({
      message: "Error deleting Bicycle with id=" + id
    });
  }
};

exports.deleteAll = (req, res) => {
  Bicycle.destroy({
    where: {}
  })
    .then((nums) => {
        res.send({
          message: `${nums} Bicycles were deleted successfully!`
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while removing all Bicycles.`,
      });
    });
};
