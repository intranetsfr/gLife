module.exports = app => {
    const sphere_controller = require("../controllers/sphere.controller");
    const router = require("express").Router();
  

    /* Structure*/
    router.get('/', sphere_controller.get);
    router.post('/create', sphere_controller.create);
    app.use('/api', router);
}