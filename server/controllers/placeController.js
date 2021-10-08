import Place from "../models/place.js";

export const createPlace = async (req, res) => {
  let { name, albumNumber, description } = req.body;
  let pictures = [];
  if (req.files !== null && req.files.pictures) {
    if (!Array.isArray(req.files.pictures)) {
      const imgId = uuidv4();
      const filePath = `${path.resolve("./public/uploads/")}/${imgId}.${
        req.files.pictures.name.split(".")[1]
      }`;
      req.files.pictures.mv(filePath, (err) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: err.message,
          });
        }
      });
      pictures.push(
        `/uploads/${imgId}.${req.files.pictures.name.split(".")[1]}`
      );
    } else {
      pictures = req.files.pictures.map((picture) => {
        const imgId = uuidv4();
        const filePath = `${path.resolve("./public/uploads/")}/${imgId}.${
          picture.name.split(".")[1]
        }`;
        picture.mv(filePath, (err) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              error: err.message,
            });
          }
        });
        return `/uploads/${imgId}.${picture.name.split(".")[1]}`;
      });
    }
  }
  const newPlace = new Place({
    name: name,
    albumNumber: albumNumber,
    description: description,
    images: pictures,
  });
  const place = await newPlace.save();
  return res.status(201).json({
    status: 201,
    message: "Place created successfully",
    results: place,
  });
};
