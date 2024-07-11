const home = async (req, res) => {
    req.flash('success', 'Welcome');

    res.render('home');
};
module.exports = { home };