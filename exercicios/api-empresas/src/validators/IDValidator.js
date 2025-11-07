const mongoose = require("mongoose");

function validateId(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  next();
}

module.exports = validateId;
