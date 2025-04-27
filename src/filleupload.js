//src/fileupload

const formidable = require('formidable');

function fileUploadMiddleware(req, res, next) {
    const contentType = req.headers['content-type'];

    if (req.method.toLowerCase() === 'post' && contentType && contentType.includes('multipart/form-data')) {
        const form = formidable({ multiples: true });

        form.parse(req, (err, fields, files) => {
            if (err) return res.send('Upload Error', 500);
            req.body = fields;
            req.files = files;
            next();
        });
    } else {
        next();
    }
}

module.exports = fileUploadMiddleware
