exports.getAllUsers=(req,res)=>{
    res.json({
        success: true,
        message:"User list Route is working"
    });
    };

exports.getUserById=(req,res)=>{
    res.json({
        success: true,
        message:"User by id Route is working",
        userId: req.params.id
    });
};

exports.updateUser=(req,res)=>{
    res.json({
        success: true,
        message:"Update User Route is working",
        userId: req.params.id
    });
};
