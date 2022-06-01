const register = async(req, res) => {
    res.render('auth/register');
};

const login = async(req, res) => {
    res.render('auth/login');
}

module.exports = {
    register,
    login
}