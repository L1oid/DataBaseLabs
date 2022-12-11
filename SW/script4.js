db.Supplies.aggregate([
    {
        $unwind: "$products"
    },
    {
        $group:
        {
            _id: "$supplier.name",
            "avg_price":
            {
                $avg: "$products.price"
            }
        }
    },
    {
        $sort:
        {
            avg_price: 1
        }
    },
    {
        $limit: 10
    }
])

db.Ords.aggregate([
    {
        $unwind: "$products"
    },
    {
        $group:
        {
            _id: "$products.product.name",
            sales:
            {
                $sum: "$products.quantity"
            }
        }
    },
    {
        $sort:
        {
            sales: -1
        }
    },
    {
        $limit: 10
    },
    {
        $sort:
        {
            sales: 1
        }
    },
])