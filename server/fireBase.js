const path = require("path");
const admin = require("firebase-admin");
const serviceAccount = require("../firstname-surname-firebase-adminsdk-c5ozy-04c91fe21b.json");
const { generateError } = require("./errors");
const { duplicateKeyError } = require("./errors");
const { applicationDefault } = require("firebase-admin/app");

admin.initializeApp({
  // credential: applicationDefault(),
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "firstname-surname.appspot.com",
});
const bucket = admin.storage().bucket();

const fireBase = async (req, res, next, manageData, register, id, subfolder) => {
  try {
    const { originalname } = req.file;
    const filename = `${path.basename(
      originalname,
      path.extname(originalname)
    )}_${Date.now()}${path.extname(originalname)}`;
    const data = bucket.file((subfolder ?? "") + filename);
    const exists = await data.exists();
    if (exists[0]) {
      const newError = generateError("L'arxiu ja existeix", 400);
      throw newError;
    }
    const fireBaseFile = data.createWriteStream({ resumable: false });
    fireBaseFile.end(req.file.buffer);
    fireBaseFile.on("error", (error) => {
      throw error;
    });
    fireBaseFile.on("finish", async () => {
      try {
        const photoUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${subfolder.replace("/", "%2F")}${filename}?alt=media`;
        if (id) {
          const newData = await manageData(id, { ...register, photoUrl });
          res.status(201).json(newData);
        }
        const newData = await manageData({ ...register, photoUrl });
        res.status(201).json(newData);
      } catch (error) {
        duplicateKeyError(req, res, next, error);
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = fireBase;
