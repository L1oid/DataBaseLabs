let date=(date)=>{
    let year=date.split(".")[2]
    let month=date.split(".")[1]
    let day=date.split(".")[0]
    return new Date(year+"-"+month+"-" + day+ "T16:00:00Z");
}

db.Countries.drop()
db.ProductTypes.drop()
db.SupplierTypes.drop()
db.Products.drop()
db.Suppliers.drop()
db.Supplies.drop()
db.Defective.drop()
db.Employees.drop()
db.Ords.drop()
db.Cells.drop()
db.Customers.drop()
//----------------------------------------1.COUNTRIES----------------------------------------
let USA_Country = db.Countries.insertOne({ "name": "США" })
let Russia_Country = db.Countries.insertOne({ "name": "Россия" })
let Spain_Country = db.Countries.insertOne({"name": "Испания" })
let France_Country = db.Countries.insertOne({"name": "Франция" })
let Germany_Country = db.Countries.insertOne({"name": "Германия" })
//----------------------------------------2.PRODUCT_TYPES----------------------------------------
let product_type_01 = db.ProductTypes.insertOne({ "name": "Шины" })
let product_type_02 = db.ProductTypes.insertOne({ "name": "Карданный вал" })
let product_type_03 = db.ProductTypes.insertOne({ "name": "Стартер" })
let product_type_04 = db.ProductTypes.insertOne({ "name": "Лобовое стекло" })
let product_type_05 = db.ProductTypes.insertOne({ "name": "Блок управления ABS" })
//----------------------------------------3.SUPPLIER_TYPES----------------------------------------
let supplier_type_01 = db.SupplierTypes.insertOne({ "name": "Фирма", "discount": "Есть", "guarantee": "Есть"})
let supplier_type_02 = db.SupplierTypes.insertOne({ "name": "Диллер", "discount": "Есть", "guarantee": "Есть"})
let supplier_type_03 = db.SupplierTypes.insertOne({ "name": "Небольшое производство", "discount": "Нет", "guarantee": "Нет"})
let supplier_type_04 = db.SupplierTypes.insertOne({ "name": "Мелкий поставщик", "discount": "Нет", "guarantee": "Нет" })
let supplier_type_05 = db.SupplierTypes.insertOne({ "name": "Магазин", "discount": "Нет", "guarantee": "Нет"})
//----------------------------------------4.PRODUCTS----------------------------------------
let product_01 = db.Products.insertOne({
    name: "Легковая шина Yokohama BluEarth-ES ES32 195/65 R15 91V",
    type: db.ProductTypes.findOne({_id: product_type_01.insertedId}),
})
let product_02 = db.Products.insertOne({
    name: "Карданный вал Honda CR-V RD# 95-01",
    type: db.ProductTypes.findOne({_id: product_type_02.insertedId}),
})
let product_03 = db.Products.insertOne({
    name: "Стартер для автомобилей Лада 2110 2112 1,4кВт STARTVOLT LSt 0110",
    type: db.ProductTypes.findOne({_id: product_type_03.insertedId}),
})
let product_04 = db.Products.insertOne({
    name: "Стекло лобовое на Volkswagen Tiguan",
    type: db.ProductTypes.findOne({_id: product_type_04.insertedId}),
})
let product_05 = db.Products.insertOne({
    name: "Блок управления ABS Isuzu Forward FRR 6HL1",
    type: db.ProductTypes.findOne({_id: product_type_05.insertedId}),
})
//----------------------------------------5.SUPPLIERS----------------------------------------
let supplier_01 = db.Suppliers.insertOne({
    name: "Автоспутник",
    type: db.SupplierTypes.findOne({_id: supplier_type_02.insertedId}),
    country: db.Countries.findOne({_id: Russia_Country.insertedId}),
    products: [
        {
            product: db.Products.findOne({_id: product_03.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_05.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_02.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_04.insertedId})
        }
    ]
})
let supplier_02 = db.Suppliers.insertOne({
    name: "Ruval",
    type: db.SupplierTypes.findOne({_id: supplier_type_01.insertedId}),
    country: db.Countries.findOne({_id: Germany_Country.insertedId}),
    products: [
        {
            product: db.Products.findOne({_id: product_03.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_05.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_02.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_04.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_01.insertedId})
        }
    ]
})
let supplier_03 = db.Suppliers.insertOne({
    name: "Motex",
    type: db.SupplierTypes.findOne({_id: supplier_type_03.insertedId}),
    country: db.Countries.findOne({_id: Spain_Country.insertedId}),
    products: [
        {
            product: db.Products.findOne({_id: product_03.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_04.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_01.insertedId})
        }
    ]
})
let supplier_04 = db.Suppliers.insertOne({
    name: "Oilcity",
    type: db.SupplierTypes.findOne({_id: supplier_type_05.insertedId}),
    country: db.Countries.findOne({_id: France_Country.insertedId}),
    products: [
        {
            product: db.Products.findOne({_id: product_01.insertedId})
        }
    ]
})
let supplier_05 = db.Suppliers.insertOne({
    name: "Next-auto",
    type: db.SupplierTypes.findOne({_id: supplier_type_04.insertedId}),
    country: db.Countries.findOne({_id: USA_Country.insertedId}),
    products: [
        {
            product: db.Products.findOne({_id: product_01.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_04.insertedId})
        }
    ]
})
let supplier_06 = db.Suppliers.insertOne({
    name: "Best-auto",
    type: db.SupplierTypes.findOne({_id: supplier_type_01.insertedId}),
    country: db.Countries.findOne({_id: Russia_Country.insertedId}),
    products: [
        {
            product: db.Products.findOne({_id: product_03.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_05.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_02.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_04.insertedId})
        },
        {
            product: db.Products.findOne({_id: product_01.insertedId})
        }
    ]
})
//----------------------------------------6.EMPLOYEES----------------------------------------
let employee_01 = db.Employees.insertOne({
    last_name: "Velasquez",
    first_name: "Carmen",
    start_date: new Date("1990-03-03T16:00:00Z"),
    salary: 25500
})
let employee_02 = db.Employees.insertOne({
    last_name: "Ngao",
    first_name: "LaDoris",
    start_date: new Date("1990-03-08T16:00:00Z"),
    salary: 22500
})
let employee_03 = db.Employees.insertOne({
    last_name: "Nagayamn",
    first_name: "Midori",
    start_date: new Date("1991-06-17T16:00:00Z"),
    salary: 23000
})
let employee_04 = db.Employees.insertOne({
    last_name: "Quick-To-See",
    first_name: "Mark",
    start_date: new Date("1990-04-07T16:00:00Z"),
    salary: 21500
})
let employee_05 = db.Employees.insertOne({
    last_name: "Ropeburn",
    first_name: "Audry",
    start_date: new Date("1990-04-07T16:00:00Z"),
    salary: 24500
})
//----------------------------------------7.SUPPLIES----------------------------------------
let supply_01 = db.Supplies.insertOne({
    supplier: db.Suppliers.findOne({_id: supplier_01.insertedId}),
    employee: db.Employees.findOne({_id: employee_01.insertedId}),
    date: date("06.12.2022"),
    total: 1550000,
    products: [
        {
            product: db.Products.findOne({_id: product_03.insertedId}),
            price: 3100,
            quantity: 500
        }
    ]
})
let supply_02 = db.Supplies.insertOne({
    supplier: db.Suppliers.findOne({_id: supplier_05.insertedId}),
    employee: db.Employees.findOne({_id: employee_02.insertedId}),
    date: date("01.12.2022"),
    total: 460000,
    products: [
        {
            product: db.Products.findOne({_id: product_01.insertedId}),
            price: 4600,
            quantity: 100
        }
    ]
})
let supply_03 = db.Supplies.insertOne({
    supplier: db.Suppliers.findOne({_id: supplier_02.insertedId}),
    employee: db.Employees.findOne({_id: employee_03.insertedId}),
    date: date("02.03.2022"),
    total: 15000000,
    products: [
        {
            product: db.Products.findOne({_id: product_05.insertedId}),
            price: 20000,
            quantity: 750
        }
    ]
})
let supply_04 = db.Supplies.insertOne({
    supplier: db.Suppliers.findOne({_id: supplier_03.insertedId}),
    employee: db.Employees.findOne({_id: employee_04.insertedId}),
    date: date("02.03.2022"),
    total: 4950000,
    products: [
        {
            product: db.Products.findOne({_id: product_02.insertedId}),
            price: 16500,
            quantity: 300
        }
    ]
})
let supply_05 = db.Supplies.insertOne({
    supplier: db.Suppliers.findOne({_id: supplier_04.insertedId}),
    employee: db.Employees.findOne({_id: employee_05.insertedId}),
    date: date("02.03.2022"),
    total: 6675000,
    products: [
        {
            product: db.Products.findOne({_id: product_04.insertedId}),
            price: 44500,
            quantity: 150
        }
    ]
})
let supply_06 = db.Supplies.insertOne({
    supplier: db.Suppliers.findOne({_id: supplier_01.insertedId}),
    employee: db.Employees.findOne({_id: employee_05.insertedId}),
    date: date("02.03.2022"),
    total: 480000,
    products: [
        {
            product: db.Products.findOne({_id: product_03.insertedId}),
            price: 3200,
            quantity: 150
        }
    ]
})
let supply_07 = db.Supplies.insertOne({
    supplier: db.Suppliers.findOne({_id: supplier_02.insertedId}),
    employee: db.Employees.findOne({_id: employee_04.insertedId}),
    date: date("01.03.2022"),
    total: 900000,
    products: [
        {
            product: db.Products.findOne({_id: product_03.insertedId}),
            price: 3000,
            quantity: 300
        }
    ]
})
//----------------------------------------8.DEFECTIVE----------------------------------------
let defective_01 = db.Defective.insertOne({
    product: db.Products.findOne({_id: product_03.insertedId}),
    supply: db.Supplies.findOne({_id: supply_01.insertedId}),
    quantity: 5
})
let defective_02 = db.Defective.insertOne({
    product: db.Products.findOne({_id: product_01.insertedId}),
    supply: db.Supplies.findOne({_id: supply_02.insertedId}),
    quantity: 15
})
let defective_03 = db.Defective.insertOne({
    product: db.Products.findOne({_id: product_05.insertedId}),
    supply: db.Supplies.findOne({_id: supply_03.insertedId}),
    quantity: 5
})
let defective_04 = db.Defective.insertOne({
    product: db.Products.findOne({_id: product_02.insertedId}),
    supply: db.Supplies.findOne({_id: supply_04.insertedId}),
    quantity: 7
})
let defective_05 = db.Defective.insertOne({
    product: db.Products.findOne({_id: product_04.insertedId}),
    supply: db.Supplies.findOne({_id: supply_05.insertedId}),
    quantity: 20
})
//----------------------------------------9.CELLS----------------------------------------
let cell_01 = db.Cells.insertOne({
    product: db.Products.findOne({_id: product_01.insertedId}),
    price: 5000,
    quantity: 300
})
let cell_02 = db.Cells.insertOne({
    product: db.Products.findOne({_id: product_02.insertedId}),
    price: 18000,
    quantity: 600
})
let cell_03 = db.Cells.insertOne({
    product: db.Products.findOne({_id: product_03.insertedId}),
    price: 4000,
    quantity: 900
})
let cell_04 = db.Cells.insertOne({
    product: db.Products.findOne({_id: product_04.insertedId}),
    price: 50000,
    quantity: 200
})
let cell_05 = db.Cells.insertOne({
    product: db.Products.findOne({_id: product_05.insertedId}),
    price: 23000,
    quantity: 1000
})
let cell_06 = db.Cells.insertOne({
    product: null,
    price: null,
    quantity: null
})
let cell_07 = db.Cells.insertOne({
    product: null,
    price: null,
    quantity: null
})
let cell_08 = db.Cells.insertOne({
    product: null,
    price: null,
    quantity: null
})
let cell_09 = db.Cells.insertOne({
    product: null,
    price: null,
    quantity: null
})
let cell_10 = db.Cells.insertOne({
    product: null,
    price: null,
    quantity: null
})
//----------------------------------------10.CUSTOMERS----------------------------------------
let customer_01 = db.Customers.insertOne({
    last_name: "Romero",
    first_name: "Antonio",
    phone: "55-2066101",
    country: db.Countries.findOne({_id: Spain_Country.insertedId})
})
let customer_02 = db.Customers.insertOne({
    last_name: "Kvadratnikov",
    first_name: "Lloid",
    phone: "8 1-20101",
    country: db.Countries.findOne({_id: Russia_Country.insertedId})
})
let customer_03 = db.Customers.insertOne({
    last_name: "Bebrehin",
    first_name: "Sanya",
    phone: "91-10351",
    country: db.Countries.findOne({_id: Russia_Country.insertedId})
})
let customer_04 = db.Customers.insertOne({
    last_name: "Pryamouhov",
    first_name: "Iluha",
    phone: "1-206-104-0103",
    country: db.Countries.findOne({_id: Russia_Country.insertedId})
})
let customer_05 = db.Customers.insertOne({
    last_name: "Vladislavov",
    first_name: "Sergey",
    phone: "852-3692888",
    country: db.Countries.findOne({_id: Russia_Country.insertedId})
})
//----------------------------------------11.ORDS----------------------------------------
let ord_01 = db.Ords.insertOne({
    customer: db.Customers.findOne({_id: customer_01.insertedId}),
    date: date("07.12.2022"),
    products: [
        {
            product: db.Products.findOne({_id: product_01.insertedId}),
            quantity: 3
        }
    ]
})
let ord_02 = db.Ords.insertOne({
    customer: db.Customers.findOne({_id: customer_02.insertedId}),
    date: date("01.12.2022"),
    products: [
        {
            product: db.Products.findOne({_id: product_02.insertedId}),
            quantity: 5
        }
    ]
})
let ord_03 = db.Ords.insertOne({
    customer: db.Customers.findOne({_id: customer_03.insertedId}),
    date: date("26.11.2019"),
    products: [
        {
            product: db.Products.findOne({_id: product_03.insertedId}),
            quantity: 4
        }
    ]
})
let ord_04 = db.Ords.insertOne({
    customer: db.Customers.findOne({_id: customer_04.insertedId}),
    date: date("11.09.2022"),
    products: [
        {
            product: db.Products.findOne({_id: product_04.insertedId}),
            quantity: 6
        }
    ]
})
let ord_05 = db.Ords.insertOne({
    customer: db.Customers.findOne({_id: customer_05.insertedId}),
    date: date("13.08.2022"),
    products: [
        {
            product: db.Products.findOne({_id: product_05.insertedId}),
            quantity: 2
        }
    ]
})
let ord_06 = db.Ords.insertOne({
    customer: db.Customers.findOne({_id: customer_04.insertedId}),
    date: date("21.10.2022"),
    products: [
        {
            product: db.Products.findOne({_id: product_03.insertedId}),
            quantity: 3
        }
    ]
})
let ord_07 = db.Ords.insertOne({
    customer: db.Customers.findOne({_id: customer_04.insertedId}),
    date: date("19.10.2022"),
    products: [
        {
            product: db.Products.findOne({_id: product_03.insertedId}),
            quantity: 2
        }
    ]
})