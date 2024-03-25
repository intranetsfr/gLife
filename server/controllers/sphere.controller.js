require("dotenv").config();

exports.get = async (req, res) => {
    let data = {
        test: "ok"
    }
    res.send(data);
};
