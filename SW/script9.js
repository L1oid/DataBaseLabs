db.Cells.aggregate([
    {
        $group:
        {
            _id: null,
            total_cells: { $sum: 1 },
            empty_cells: 
            { 
                $sum:
                {
                    "$cond":
                    {
                        "if":
                        {
                            "$eq":
                            [
                                "$quantity",
                                null
                            ]
                        },
                        "then": 1,
                        "else": 0
                    }
                }
            },
            occupied_cells_quantity: { $sum: "$quantity" }
        }
    },
    {
        $project:
        {
            _id: 0,
            total_cells: 1,
            empty_cells: 1,
            "cells_left":
            {
                $subtract: ["$total_cells", "$empty_cells"]
            },
            occupied_cells_quantity: 1,
            "total_cells_quantity":
            {
                $multiply: ["$total_cells", 1000]
            },
            "empty_cells_quantity":
            {
                $subtract: [{$multiply: ["$total_cells", 1000]}, "$occupied_cells_quantity"]
            }
        }
    }
])