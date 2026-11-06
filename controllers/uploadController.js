const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "..", "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|txt|csv/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);
    if (ext || mime) {
      cb(null, true);
    } else {
      cb(new Error("Nieobsługiwany format pliku. Dozwolone: jpeg, jpg, png, gif, pdf, txt, csv."));
    }
  },
});


function uploadPage(req, res) {
  const error = req.query.error || null;
  const uploadedFile = req.query.file || null;

  const uploadsDir = path.join(__dirname, "..", "public", "uploads");
  let files = [];
  try {
    files = fs.readdirSync(uploadsDir).map((f) => ({
      name: f,
      size: fs.statSync(path.join(uploadsDir, f)).size,
      url: `/uploads/${f}`,
    }));
  } catch (e) {
    files = [];
  }

  res.render("upload", {
    title: "Przesyłanie Plików",
    error,
    uploadedFile,
    files,
  });
}

module.exports = { upload, uploadPage };