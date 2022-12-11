db.Stats.aggregate([
    {
        $lookup:
        {
            from: "Supplies",
            localField: "supplies.supplies_id",
            foreignField: "_id",
            as: "supplies_info"
        }
    },
    {
        $unwind: "$supplies_info"
    },
    {
        $match:
        {
            "supplies_info.supplier.name": "Автоспутник"
        }
    },
    {
        $unwind: "$supplies_info.products"
    },
    {
        $group:
        {
            _id: "$supplies_info.supplier.name",
            "total_quantity":
            {
                $sum: "$supplies_info.products.quantity"
            },
            "total":
            {
                $sum: "$supplies_info.total"
            }
        }
    }
])


db.Supplies.aggregate([
    {
        $unwind: "$products"
    },
    {
        $group:
        {
            _id: "$supplier.name",
            "total_quantity":
            {
                $sum: "$products.quantity"
            }
        }
    },
    {
        $group:
        {
            _id: null,
            suppliers: { $push: "$$ROOT" },
            total_magazine_quantity: {$sum: "$total_quantity"}
        }
    },
    {
        $unwind: "$suppliers"
    },
    {
        $match:
        {
            "suppliers._id": "Ruval"
        }
    },
    {
        $project:
        {
            _id: 0,
            percentage:
            {
                $multiply: [ {$divide: ["$suppliers.total_quantity", "$total_magazine_quantity"]}, 100]
            }
        }
    }
])

db.Stats.aggregate([
    {
        $project:
        {
            total:
            {
                $subtract: ["$sells.total", "$supplies.total"]
            }
        }
    }
])