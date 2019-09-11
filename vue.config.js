const mockLoginData = require("./mock/login.json");

module.exports = {
    publicPath: './',
    devServer: {
        port: 8080,
        before(app) {
            app.post("/my-manager-api/user/login", (req, res) => {
                res.json(mockLoginData);
            });
        }
    }
};