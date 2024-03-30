const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      const projectData = await Project.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const projects = projectData.map((project) => project.get({ plain: true }));
      console.log(projects);
      res.render('homepage', { projects });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/projects/:id', async (req, res) => {
    try {
      const projectData = await Project.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const project = projectData.get({ plain: true });
  
      res.render('project', { project });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/profile', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  
      const user = userData.get({ plain: true });
      console.log("HEREE", user);
  
      res.render('profile', {
        user,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});


  router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect('/profile');
    //   return;
    // }
  
    res.render('login');
  });

  module.exports = router;