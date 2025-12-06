// Load environment variables from server/.env when present
try { require('dotenv').config({ path: __dirname + '/.env' }); } catch (e) { /* ignore if dotenv not available */ }
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Ensure uploads and data directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Multer setup with memory storage so we can stream to Cloudinary.
// For local fallback we will write the buffer to disk manually.
const storage = multer.memoryStorage();

function fileFilter (req, file, cb) {
  // accept images only
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'));
  }
  cb(null, true);
}

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter });

// Cloudinary setup (will use env vars CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
let cloudinary;
try {
  cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (e) {
  console.warn('cloudinary package not available or failed to configure:', e && e.message ? e.message : e);
}
// Inform whether Cloudinary is active
if (cloudinary && process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  console.log('Cloudinary configured. Images will be uploaded to Cloudinary.');
} else {
  console.log('Cloudinary not configured. Server will use local uploads (server/uploads).');
}

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

const certsFile = path.join(dataDir, 'certifications.json');
if (!fs.existsSync(certsFile)) fs.writeFileSync(certsFile, '[]');

function readCerts() {
  try {
    const raw = fs.readFileSync(certsFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function writeCerts(data) {
  fs.writeFileSync(certsFile, JSON.stringify(data, null, 2));
}

// Upload endpoint
// Note: multer errors will be forwarded to the error handler below
app.post('/api/upload', upload.single('file'), (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  // If Cloudinary is configured, upload buffer to Cloudinary
  if (cloudinary && process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    const streamifier = require('streamifier');
    const folder = process.env.CLOUDINARY_FOLDER || 'portfolio_uploads';
    const uploadStream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return next(error);
      return res.status(201).json({ url: result.secure_url });
    });
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    return;
  }

  // Fallback: if Cloudinary not configured, write buffer to disk and return local upload URL
  try {
    const ext = path.extname(req.file.originalname) || '.png';
    const name = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
    const outPath = path.join(uploadsDir, name);
    fs.writeFileSync(outPath, req.file.buffer);
    const url = `/uploads/${name}`;
    return res.status(201).json({ url });
  } catch (err) {
    return next(err);
  }
});

// Centralized error handler to return JSON for multer and other errors
app.use((err, req, res, next) => {
  console.error('Server error:', err && err.message ? err.message : err);
  if (res.headersSent) return next(err);
  const status = err && err.statusCode ? err.statusCode : 400;
  res.status(status).json({ error: err && err.message ? err.message : 'Server error' });
});

// (blog and repost endpoints removed)

// Certifications endpoints
app.get('/api/certifications', (req, res) => {
  const certs = readCerts();
  // Normalize URLs before returning so frontend doesn't get malformed paths
  const API_BASE = (process.env.API_BASE || `http://localhost:${PORT}`);
  const normalized = certs.map(c => {
    const copy = { ...c };
    if (copy.imageUrl && typeof copy.imageUrl === 'string') {
      if (copy.imageUrl.startsWith('http')) {
        // ok
      } else if (copy.imageUrl.startsWith('/')) {
        // ensure full url when needed by frontend
        copy.imageUrl = copy.imageUrl; // keep as-is (frontend will prefix API_BASE)
      } else {
        // stored value looks like a bare filename - convert to /uploads/<filename>
        copy.imageUrl = `/uploads/${copy.imageUrl}`;
      }
    }
    if (copy.credentialUrl && typeof copy.credentialUrl === 'string') {
      if (copy.credentialUrl.startsWith('http')) {
        // ok
      } else if (copy.credentialUrl.startsWith('/')) {
        // keep
      } else {
        // make it a relative uploads path if it looks like a filename
        copy.credentialUrl = `/uploads/${copy.credentialUrl}`;
      }
    }
    return copy;
  });
  res.json(normalized);
});

app.post('/api/certifications', (req, res) => {
  const { title, issuer, date, description, imageUrl, credentialUrl } = req.body;
  if (!title || !issuer || !date) return res.status(400).json({ error: 'title, issuer and date are required' });
  const certs = readCerts();
  // Normalize incoming imageUrl / credentialUrl if they're plain filenames
  let normalizedImage = imageUrl || null;
  let normalizedCred = credentialUrl || null;
  if (normalizedImage && typeof normalizedImage === 'string' && !normalizedImage.startsWith('http') && !normalizedImage.startsWith('/')) {
    normalizedImage = `/uploads/${normalizedImage}`;
  }
  if (normalizedCred && typeof normalizedCred === 'string' && !normalizedCred.startsWith('http') && !normalizedCred.startsWith('/')) {
    normalizedCred = `/uploads/${normalizedCred}`;
  }

  const newCert = {
    id: Date.now().toString(),
    title,
    issuer,
    date,
    description: description || null,
    imageUrl: normalizedImage,
    credentialUrl: normalizedCred
  };
  certs.unshift(newCert);
  writeCerts(certs);
  res.status(201).json(newCert);
});

// Delete certification by id
app.delete('/api/certifications/:id', (req, res) => {
  const id = req.params.id;
  const certs = readCerts();
  const filtered = certs.filter(c => c.id !== id);
  if (filtered.length === certs.length) return res.status(404).json({ error: 'Not found' });
  writeCerts(filtered);
  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
