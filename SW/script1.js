db.SupplierTypes.aggregate([
    {
        $lookup:
        {
            from: "Suppliers",
            localField: "name",
            foreignField: "type.name",
            as: "suppliers_info"
        }
    },
    {
        $match:
        {
            "suppliers_info.products.product.type.name": "Стартер"
        }
    },
    {
        $project:
        {
            _id: 0,
            name: 1,
            suppliers_info:
            {
                name: 1
            },
            suppliers_count:
            {
                $size: "$suppliers_info"
            }
        }
    }
])