const Animal = require("../models/Animal");

exports.create = async (animalData) => await Animal.create(animalData);

exports.getAll = async (search) => {
  let animalFilter = await Animal.find().lean();

  if (search) {
    animalFilter = animalFilter.filter((animal) =>
      animal.location.includes(search)
    );
    return animalFilter;
  }

  return animalFilter;
};

exports.getSingleAnimal = async (animalId) => {
  try {
    return await Animal.findById(animalId).lean();
  } catch (err) {
    console.log(err);
  }
};

exports.update = (id, animalData) => {
  return Animal.findByIdAndUpdate(id, animalData);
};

exports.delete = (id) => {
  return Animal.findByIdAndDelete(id);
};

exports.donate = async (id, donator) => {
  return await Animal.findOneAndUpdate(
    { _id: id },
    { $push: { donations: { _id: donator } } }
  );
};
