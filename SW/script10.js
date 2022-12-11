db.Ords.aggregate([
    {
        $unwind: "$products"
    },
    {
        $match:
        {
            "products.product.name": "Стартер для автомобилей Лада 2110 2112 1,4кВт STARTVOLT LSt 0110"
        }
    },
    {
        $group:
        {
            _id: null,
            ords: { $push: "$$ROOT" },
            total: { $sum: { $multiply: ["$products.price", "$products.quantity"] } }
        }
    },
    {
        $project:
        {
            _id: 0,
            "ords._id": 1,
            ords_count:
            {
                $size: "$ords"
            },
            total: 1
        }
    }
])