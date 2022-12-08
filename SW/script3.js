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
            from: "Ords",
            localField: "name",
            foreignField: "products.product.type.name",
            as: "ords_info"
        }
    },
    {
        "$addFields": 
        {
            "ords_info": 
            {
                "$arrayElemAt": 
                [
                    {
                        "$filter": {
                            "input": "$ords_info",
                            "as": "ords_inf",
                            "cond": { $gte: [ "$$ords_inf.date", new Date("2022-10-18T16:00:00.000Z")] }
                        }
                    }, 0
                ]
            }
        }
    }
])



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
                        $gte: new Date("2011-10-18T16:00:00.000Z")
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
            _id: "$customer",
        }
    },
    {
        $project:
        {
            _id: 0,
            "last_name": "$_id.last_name",
        }
    }
])