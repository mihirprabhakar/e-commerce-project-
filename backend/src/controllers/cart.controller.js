exports.getCart=(req,res)=>{
    res.json({
        success:true,
        message:"Get cart route working successfully"
    });
};

exports.addToCart=(req,res)=>{
    res.json({
        success:true,
        message:"Add to cart route working successfully"
    });
};

exports.updateCartItem=(req,res)=>{
    res.json({
        success:true,
        message:"Update cart item route working successfully"
    });
};

exports.removeFromCart=(req,res)=>{
    res.json({
        success:true,
        message:"Remove from cart route working successfully"
    });
};