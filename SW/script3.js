db.Ords.aggregate([
    {
        $match:
        {
            "products.product.type.name": "Стартер",
            $and:
            [
                {
                    "date":
                    {
                        $gte: new Date("2022-10-18T16:00:00.000Z")
                    }
                },
                {
                    "date":
                    {
                        $lte: new Date("2022-10-22T16:00:00.000Z")
                    }
                }
            ]
        }
    },
    {
        $group:
        {
            _id: "$customer"
        }
    },
    {
        $group:
        {
            _id: null,
            customers: { $push: "$$ROOT" }
        }
    },
    {
        $project:
        {
            _id: 0,
            customers: "$customers._id.last_name",
            customers_count:
            {
                $size: "$customers"
            }
        }
    }
])

db.Ords.aggregate([
    {
        $unwind: "$products"
    },
    {
        $match:
        {
            "products.product.type.name": "Стартер",
        }
    },
    {
        $group:
        {
            _id: "$customer",
            "total_quantity":
            {
                $sum: "$products.quantity"
            }
        }
    },
    {
        $match:
        {
            "total_quantity":
            {
                $gte: 1
            }
        }
    },
    {
        $group:
        {
            _id: null,
            customers: { $push: "$$ROOT" }
        }
    },
    {
        $project:
        {
            _id: 0,
            customers: "$customers._id.last_name",
            customers_count:
            {
                $size: "$customers"
            }
        }
    }
])