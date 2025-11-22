const fs = require('fs');
const path = require('path');

exports.s3Upload = async image => {
  try {
    let imageUrl = '';
    let imageKey = '';

    if (image) {
      const uploadsDir = path.join(__dirname, '../public/uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = `${uniqueSuffix}-${image.originalname}`;
      const imagePath = path.join(uploadsDir, filename);
      fs.writeFileSync(imagePath, image.buffer);

      imageUrl = `/uploads/${filename}`;
      imageKey = filename;
    }

    return { imageUrl, imageKey };
  } catch (error) {
    console.error('Error saving image locally:', error);
    return { imageUrl: '', imageKey: '' };
  }
};
