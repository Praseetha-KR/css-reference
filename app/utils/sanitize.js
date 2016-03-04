module.exports = sanitize;

function sanitize(res) {
    res = res.toObject();
    delete res['_id'];
    delete res['__v'];
    return res;
}
