const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");
const { httpError } = require("../../utils");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

exports.updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, fileName);

    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250);
    await image.writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", fileName);

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );

    if (!updatedUser) throw httpError(404, "Not found");

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
