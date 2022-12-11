db.Stats.aggregate([
    {
        $project:
        {
            _id: 0,
            v: { $divide: [ { $add: ["$sells.total", "$supplies.total"] }, "$supplies.total" ] }
        }
    }
])