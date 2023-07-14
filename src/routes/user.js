const router = require('express').Router();
const {
    user
} = require('../controllers/user-controller');

// GET localhost:8080/karyawan => Ambil data semua karyawan
router.get('/users', user.getUser);

router.stack.forEach((route) => {
    if (route.route && route.route.path) {
        console.log(`${route.route.stack[0].method.toUpperCase()} ${route.route.path}`);
    }
});


module.exports = router;