module.exports = app => {
    const sphere_controller = require("../controllers/sphere.controller");
    const router = require("express").Router();
  
    
    /* Structure*/
    router.get('/', sphere_controller.get);
    app.use('/api', router);
}