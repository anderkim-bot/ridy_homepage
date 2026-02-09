import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const BIKES_PATH = path.join(__dirname, 'database', 'bikes.json');
const SUCCESSIONS_PATH = path.join(__dirname, 'database', 'successions.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Storage configuration for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Helper to read DBs
const readBikes = () => {
    try {
        if (!fs.existsSync(BIKES_PATH)) return [];
        return JSON.parse(fs.readFileSync(BIKES_PATH, 'utf8'));
    } catch (err) {
        console.error('Error reading Bikes:', err);
        return [];
    }
};

const readSuccessions = () => {
    try {
        if (!fs.existsSync(SUCCESSIONS_PATH)) return [];
        return JSON.parse(fs.readFileSync(SUCCESSIONS_PATH, 'utf8'));
    } catch (err) {
        console.error('Error reading Successions:', err);
        return [];
    }
};

const readAll = () => {
    return [...readBikes(), ...readSuccessions()];
};

// Helper to write DBs
const writeBikes = (data) => {
    try {
        fs.writeFileSync(BIKES_PATH, JSON.stringify(data, null, 4), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing Bikes:', err);
        return false;
    }
};

const writeSuccessions = (data) => {
    try {
        fs.writeFileSync(SUCCESSIONS_PATH, JSON.stringify(data, null, 4), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing Successions:', err);
        return false;
    }
};

// --- API Endpoints ---

// Get all bikes (Combined)
app.get('/api/bikes', (req, res) => {
    res.json(readAll());
});

// Get bike by slug
app.get('/api/bikes/:slug', (req, res) => {
    const all = readAll();
    const bike = all.find(b => b.slug === req.params.slug);
    if (bike) res.json(bike);
    else res.status(404).json({ message: 'Bike not found' });
});

// Save bike (Create or Update)
app.post('/api/bikes', (req, res) => {
    const newBike = req.body;
    const isSuccession = newBike.brand === 'SUCCESSION';
    const targetPath = isSuccession ? SUCCESSIONS_PATH : BIKES_PATH;
    const items = isSuccession ? readSuccessions() : readBikes();
    const writeFn = isSuccession ? writeSuccessions : writeBikes;

    const now = new Date().toISOString();

    if (newBike.id && items.find(b => String(b.id) === String(newBike.id))) {
        // Update
        const index = items.findIndex(b => String(b.id) === String(newBike.id));
        items[index] = { ...items[index], ...newBike, updated_at: now };
        writeFn(items);
        res.json(items[index]);
    } else {
        // Create
        const bikeToAdd = {
            ...newBike,
            id: newBike.id || Date.now(),
            created_at: now,
            updated_at: now
        };
        items.unshift(bikeToAdd);
        writeFn(items);
        res.status(201).json(bikeToAdd);
    }
});

// Delete bike
app.delete('/api/bikes/:id', (req, res) => {
    const bikes = readBikes();
    const successions = readSuccessions();

    const bikesFiltered = bikes.filter(b => String(b.id) !== String(req.params.id));
    const successionsFiltered = successions.filter(b => String(b.id) !== String(req.params.id));

    if (bikes.length !== bikesFiltered.length) {
        writeBikes(bikesFiltered);
    } else {
        writeSuccessions(successionsFiltered);
    }
    res.status(204).send();
});

// Image Upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // Return the URL that the frontend can use to access the image
    const publicUrl = `/uploads/${req.file.filename}`;
    res.json({ url: publicUrl });
});

// Airtable Proxy for Inquiries
app.post('/api/inquiry', async (req, res) => {
    try {
        const data = req.body;

        // Credentials from environment variables
        const AIRTABLE_PAT = process.env.AIRTABLE_PAT || 'your_personal_access_token';
        const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'your_base_id';
        const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Inquiries'; // Your Table Name

        const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

        const airtableData = {
            records: [
                {
                    fields: {
                        "Name": data.name,
                        "Birthdate": data.birthdate,
                        "Phone": data.phone,
                        "CustomerType": data.customerType,
                        "Address": data.address,
                        "InquiryType": data.inquiryType || "리스 승계",
                        "Model": data.model || "-",
                        "Insurance": data.insurance || data.insuranceType || "-",
                        "DeliveryMethod": data.deliveryMethod || "-",
                        "DeliveryAddress": data.deliveryAddress || "-",
                        "PlateNumber": data.plateNumber || "-"
                    }
                }
            ]
        };

        const response = await fetch(airtableUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_PAT}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(airtableData)
        });

        if (response.ok) {
            res.json({ success: true });
        } else {
            const errorText = await response.text();
            console.error('Airtable Error:', errorText);
            res.status(500).json({ success: false, message: 'Airtable sync failed' });
        }
    } catch (error) {
        console.error('Inquiry Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Local persistence server running at http://localhost:${PORT}`);
    console.log(`📂 Bikes path: ${BIKES_PATH}`);
    console.log(`📂 Successions path: ${SUCCESSIONS_PATH}`);
    console.log(`🖼️ Uploads directory: ${UPLOADS_DIR}`);
});
