const authenticationMiddleware = () => {
    return (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.send({
                success: req.isAuthenticated(),
                error:"user not authenticated"
            });
        }
    }
}

module.exports =authenticationMiddleware