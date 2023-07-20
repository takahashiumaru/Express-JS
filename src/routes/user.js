const router = require('express').Router();
const {
    user
} = require('../controllers/user-controller');

router.get('/users', user.FindAll);
router.get('/users/:id', user.FindByID);
router.post('/users', user.Create);
router.put('/users/:id', user.Update);
router.delete('/users/:id', user.Delete);

router.stack.forEach((route) => {
    if (route.route && route.route.path) {
        console.log(`${route.route.stack[0].method.toUpperCase()} ${route.route.path}`);
    }
});

module.exports = router;