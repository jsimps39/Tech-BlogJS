const router = require('express').Router();
const { Blog, User } = require('../../models');
// const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  const blogData = await Blog.findAll({
    include: {
      model: User,
      attributes: ['id', 'username']
    }
  }).catch((err) => {
    res.json(err);
  });
  console.log(blogData);
  res.json(blogData);
})

router.get('/', async (req, res) => {
  try {
    const blogData = Blog.findAll({
      where: { user_id: req.session.userId }
    });
    const blogs = blogData.map((blog) =>
      blog.get({ plain: true })
    );
    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});


router.post('/', async (req, res) => {  //took out withAuth
  try {
    const newBlog = await Blog.create({
      name: req.body.name,
      description: req.body.description,
      //  ...req.body,
      user_id: req.session.userId,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const blogData = await Blog.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!blogData) {
//       res.status(404).json({ message: 'No Blog found with this id!' });
//       return;
//     }

//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
