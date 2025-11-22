const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mongoose = require('mongoose');

// Bring in Models & Utils
const Banner = require('../../models/banner');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { ROLES } = require('../../constants');
const { s3Upload } = require('../../utils/storage');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Fetch all banners
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort('-created');
    res.status(200).json({
      banners
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// Add a new banner
router.post(
  '/add',
  auth,
  role.check(ROLES.Admin),
  upload.single('image'),
  async (req, res) => {
    try {
      const { title, link, content, isActive, position } = req.body;
      const image = req.file;

      if (!image) {
        return res.status(400).json({ error: 'You must enter an image.' });
      }

      const { imageUrl, imageKey } = await s3Upload(image);

      const banner = new Banner({
        title,
        link,
        content,
        isActive,
        imageUrl,
        imageKey,
        position
      });

      const savedBanner = await banner.save();

      res.status(200).json({
        success: true,
        message: 'Banner has been added successfully!',
        banner: savedBanner
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// Update a banner
router.put(
  '/:id',
  auth,
  role.check(ROLES.Admin),
  async (req, res) => {
    try {
      const bannerId = req.params.id;
      const update = req.body.banner;
      const query = { _id: bannerId };

      if (req.body.banner.position) {
        update.position = req.body.banner.position;
      }

      await Banner.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Banner has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// Delete a banner
router.delete(
  '/:id',
  auth,
  role.check(ROLES.Admin),
  async (req, res) => {
    try {
      const banner = await Banner.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: 'Banner has been deleted successfully!',
        banner
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

module.exports = router;
