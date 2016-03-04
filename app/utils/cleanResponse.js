module.exports = cleanResponse;

function cleanResponse(res) {
    res = res.toObject();
    delete res['_id'];
    delete res['__v'];
    return res;
}
