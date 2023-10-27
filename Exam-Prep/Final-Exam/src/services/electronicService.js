const Electronic = require("../models/Electronic");

exports.create = async (electronicData) =>
  await Electronic.create(electronicData);

exports.getAll = async (searchName, searchType) => {
  let electronicFilter = await Electronic.find().lean();
  if (searchName && searchType) {
    return await Electronic.find({
      name: new RegExp(searchName, "i"),
      type: new RegExp(searchType, "i"),
    }).lean();
  }
  if (searchName) {
    return await Electronic.find({ name: new RegExp(searchName, "i") }).lean();
  }
  if (searchType) {
    return await Electronic.find({ type: new RegExp(searchType, "i") }).lean();
  }

  return electronicFilter;
};

exports.getSingleElectronic = async (electronicId) => {
  try {
    return await Electronic.findById(electronicId).lean();
  } catch (err) {
    console.log(err);
  }
};

exports.update = (id, electronicData) => {
  return Electronic.findByIdAndUpdate(id, electronicData, {
    runValidators: true,
  });
};

exports.delete = (id) => {
  return Electronic.findByIdAndDelete(id);
};

exports.buy = async (id, buyer) => {
  return await Electronic.findOneAndUpdate(
    { _id: id },
    { $push: { buyingList: { _id: buyer } } }
  );
};
