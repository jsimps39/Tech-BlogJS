const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const blogRoutes= require('./blog-routes.js');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;
