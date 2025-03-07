function notFound(req, res, next) {
    res.status(404);
    res.json({
        error: "Not found"
    });
};

module.exports= notFound;