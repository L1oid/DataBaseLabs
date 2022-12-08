db.ProductTypes.aggregate([
    {
        $match:
        {
            "name": "Стартер"
        }
    },
    {
        $lookup:
        {
            from: "Supplies",
            localField: "name",
            foreignField: "products.product.type.name",
            as: "supplies_info"
        }
    },
    {
        $project:
        {
            _id: 0,
            name: 1,
            supplies_info:
            {
                "supplier.name": 1,
                "products.price": 1,
                date: 1
            }
        }
    }
])