const router = require('express').Router();
const { Blog, User } = require('../models/');
// const {} = require('../models/');

router.get('/', async (req, res) => {
  try {
    // Get all blogss and JOIN with user data
    const dbBlogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'], //changed from name to 'id' 'username'
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    console.log(blogs);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console(err);
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id'], //changed name to id
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
}});

router.get('/dashboard', async (req, res) => {  //withAuth
  try {
    // Find the logged in user based on the session ID
     const blogData = await Blog.findAll({where: {user_id:req.session.userId},
      include: {
        model: User,
        attributes: ['id', 'username']
    //  findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: User }],
    }});

    //const user = userData.get({ plain: true });
    const blogs = blogData.map(data => data.get({ plain: true }));
    res.render('dashboard', { blogs, loggedIn: req.session.loggedIn });  //blogs or blogposts?
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', (req, res) => {

  res.render('dashboard');
});

//get all posts for homepage
// router.get('/', async (req, res) => {
//   try {
//     res.render('homepage');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
