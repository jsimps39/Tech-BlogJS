const { Blog } = require('../models');

const blogdata = [
  {
    name: 'Blog 1',
    description: 'There  was a cool tech thing that happened',
    user_id: 1,
  },
  {
    name: 'Blog 2',
    description: ' Chat Gpt is really cool!',
    user_id: 2,
  },
  {
    name: 'Blog 3',
    description: 'Text here ',
    user_id: 3,
  },
  
];

const seedBlog = () => Blog.bulkCreate(blogdata, { individualHooks: true, returning: true });

module.exports = seedBlog;