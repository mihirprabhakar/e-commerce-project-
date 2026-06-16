
    exports.register = (req, res) => {
    res.status(201).json({
      success: true,
      message: "Register route is working",
    //   body: req.body
    });
  };
  
  exports.login = (req, res) => {
    res.json({
      success: true,
      message: "Login route is working",
    //   body: req.body
    });
  };
  
  exports.profile = (req, res) => {
    res.json({
      success: true,
      message: "Profile route is working"
    });
  };