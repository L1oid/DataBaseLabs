db.SupplierTypes.aggregate([
    {
        $lookup:
        {
            from: "Suppliers",
            localField: "name",
            foreignField: "type.name",
            as: "supliers_info"
        }
    },
    {
        $match:
        {
            "supliers_info.products.product.type.name": "Стартер"
        }
    },
    {
        $project:
        {
            _id: 0,
            name: 1,
            supliers_info:
            {
                name: 1
            },
            suppliers_count:
            {
                $size: "$supliers_info"
            }
        }
    }
])