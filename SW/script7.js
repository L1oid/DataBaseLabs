db.Defective.aggregate([
    {
        $match:
        {
            $and:
            [
                {
                    "supply.date":
                    {
                        $gte: new Date("2022-03-02T16:00:00.000Z")
                    }
                },
                {
                    "supply.date":
                    {
                        $lte: new Date("2022-03-03T16:00:00.000Z")
                    }
                }
            ]
        }
    },
    {
        $group:
        {
            _id: null,
            defective_products: { $push: "$$ROOT" },
            defective_quantity: { $sum: "$quantity" }
        }
    },
    {
        $project:
        {
            _id: 0,
            "defective_products.product.name": 1,
            "defective_products.supply.supplier.name": 1,
            "defective_products.quantity": 1,
            defective_quantity: 1,
            defective_count:
            {
                $size: "$defective_products"
            }
        }
    }
])