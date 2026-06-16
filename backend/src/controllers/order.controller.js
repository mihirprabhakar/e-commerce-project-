exports.createOrder=(req,res)=>{
    res.json({
        success:true,
        message:"Create order route working successfully"
    });
};

exports.getMyOrders=(req,res)=>{
    res.json({
        success:true,
        message:"Get my orders route working successfully"
    });
};

exports.getAllOrders=(req,res)=>{
    res.json({
        success:true,
        message:"Get all orders route working successfully"
    });
};

exports.updateOrderStatus=(req,res)=>{
    res.json({
        success:true,
        message:"Update order status route working successfully"
    });
};