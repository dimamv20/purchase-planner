import prisma from "../src/lib/prisma.js";

async function main() {
    const categories = [
        {
            name: "Dairy",
            slug: "dairy",
        },
        {
            name: "Bakery",
            slug: "bakery",
        },
        {
            name: "Meat",
            slug: "meat",
        },
        {
            name: "Drinks",
            slug: "drinks",
        },
        {
            name: "Snacks",
            slug: "snacks",
        },
    ];

    for (const category of categories) {
        await prisma.category.upsert({
            where: {
                slug: category.slug,
            },
            update: {},
            create: category,
        });
    }

    const stores = [
        {
            name: "Walmart",
            address: "1 Kingsway NW",
            city: "Edmonton",
        },
        {
            name: "SuperStore",
            address: "17303 Stony Plain Rd",
            city: "Edmonton",
        },
        {
            name: "Safeway",
            address: "12210 Jasper Ave",
            city: "Edmonton",
        },
        {
            name: "Save-On-Foods",
            address: "360 Mayfield Common Northwest",
            city: "Edmonton",
        },
    ];


    for (const store of stores) {
        const existingStore = await prisma.store.findFirst({
            where: {
                name: store.name,
                city: store.city,
            },
        });

        if (!existingStore) {
            await prisma.store.create({
                data: store,
            });
        }
    }
    const dairy = await prisma.category.findUnique({
        where: {
            slug: "dairy",
        },
    });

    const bakery = await prisma.category.findUnique({
        where: {
            slug: "bakery",
        },
    });

    const drinks = await prisma.category.findUnique({
        where: {
            slug: "drinks",
        },
    });
    const meat = await prisma.category.findUnique({
        where: { slug: "meat" },
    });

    const snacks = await prisma.category.findUnique({
        where: { slug: "snacks" },
    });

    if (!dairy || !bakery || !meat || !drinks || !snacks) {
        throw new Error("Categories were not created");
    }

    const products = [
        //Dairy
        {
            name: "Milk",
            brand: "DairyLand",
            packageQuantity: 2,
            unit: "LITRE" as const,
            categoryId: dairy.id,
        },  
        {
            name: "Greek Yogurt",
            brand: "KirkaLand", 
            packageQuantity: 700, 
            unit: "GRAM" as const,
            categoryId: dairy.id ,

        },
        {
            name: "Cheddar Cheese",
            brand: "Great value", 
            packageQuantity: 1000, 
            unit: "GRAM" as const,
            categoryId: dairy.id,

        },
        {
            name: "Butter" ,
            brand: "KirkaLand", 
            packageQuantity: 500, 
            unit: "GRAM" as const,
            categoryId: dairy.id,

        },
        //Bakery
        {
            name: "Sourdough Bread" ,
            brand: "Alberta Bakery" , 
            packageQuantity: 1, 
            unit: "PACK"as const,
            categoryId: bakery.id,

        },

        {
            name: "Bagels" ,
            brand: "Alberta Bakery", 
            packageQuantity: 4, 
            unit: "PACK" as const,
            categoryId: bakery.id,

        },
    
        {
            name:  "Plain Croissants" ,
            brand: "Dushes", 
            packageQuantity: 6 , 
            unit: "PACK" as const,
            categoryId: bakery.id,

        },
        {
            name: "Tortillas" ,
            brand: "Alberta Bakery", 
            packageQuantity: 5, 
            unit: "PACK" as const,
            categoryId: bakery.id,

        },
        //Meat
        {
            name: "Chicken Breast" ,
            brand: "Freson" , 
            packageQuantity: 1 , 
            unit: "KILOGRAM" as const,
            categoryId: meat.id,

        },
        {
            name: "Chicken Breast" ,
            brand: "Freson" , 
            packageQuantity: 1 , 
            unit: "KILOGRAM" as const,
            categoryId: meat.id,

        },
        {
            name: "Ground Beef" ,
            brand: "Alberta Chop" , 
            packageQuantity: 750 , 
            unit: "GRAM" as const,
            categoryId: meat.id,

        },
        {
            name: "Bacon" ,
            brand: "Farm" , 
            packageQuantity: 450 , 
            unit: "GRAM" as const,
            categoryId: meat.id,

        },
        {
            name: "Sausages" ,
            brand: "Freson" , 
            packageQuantity: 1 , 
            unit: "KILOGRAM" as const,
            categoryId: meat.id,

        },
        //Drinks
        {
            name: "Coca-Cola" ,
            brand: "Coca-Cola" , 
            packageQuantity: 550 , 
            unit: "MILLILITRE" as const,
            categoryId: drinks.id,

        },
        {
            name: "Apple Juice" ,
            brand: "complimat" , 
            packageQuantity: 1 , 
            unit: "LITRE" as const,
            categoryId: drinks.id,

        },
        {
            name: "Sparkling Water" ,
            brand: "Oasis" , 
            packageQuantity: 750 , 
            unit: "MILLILITRE" as const,
            categoryId: drinks.id,

        },
        {
            name: "Red bull" ,
            brand: "Red bull" , 
            packageQuantity: 450 , 
            unit: "MILLILITRE" as const,
            categoryId: drinks.id,

        },
        //Snacks
        {
            name: "Chips" ,
            brand: "Lay's" , 
            packageQuantity: 450 , 
            unit: "GRAM" as const,
            categoryId: snacks.id,
        },

        {
            name: "Chocolate Bar" ,
            brand: "Milka" , 
            packageQuantity: 150 , 
            unit: "GRAM" as const,
            categoryId: snacks.id,

        },
        {
            name: "Crackers" ,
            brand: "complimant" , 
            packageQuantity: 350 , 
            unit: "GRAM" as const,
            categoryId: snacks.id,

        },
        {
            name: "Popcorn" ,
            brand: "Alberta" , 
            packageQuantity: 150, 
            unit: "GRAM" as const,
            categoryId: snacks.id,

        },

    ];
    

    for (const product of products) {
        const existingProduct = await prisma.product.findFirst({
            where: {
                name: product.name,
                brand: product.brand,
            },
        });

        if (!existingProduct) {
            await prisma.product.create({
                data: product,
            });
        }
    }
    const walmart = await prisma.store.findFirst({
        where: {
            name: "Walmart",
            city: "Edmonton",
        },
    });

    const superStore = await prisma.store.findFirst({
        where: {
            name: "SuperStore",
            city: "Edmonton",
        },
    });

    const safeway = await prisma.store.findFirst({
        where: {
            name: "Safeway",
            city: "Edmonton",
        },
    });

    const saveOnFoods = await prisma.store.findFirst({
        where: {
            name: "Save-On-Foods",
            city: "Edmonton",
        },
    });

    if (!walmart || !superStore || !safeway || !saveOnFoods) {
        throw new Error("Stores were not created");
    }

    const milk = await prisma.product.findFirst({
        where: {
            name: "Milk",
            brand: "DairyLand",
        },
    });

    const bread = await prisma.product.findFirst({
        where: {
            name: "Sourdough Bread",
            brand: "Alberta Bakery",
        },
    });

    const orangeJuice = await prisma.product.findFirst({
        where: {
            name: "Orange Juice",
            brand: "Tropicana",
        },
    });

    if (!milk || !bread || !orangeJuice) {
        throw new Error("Products were not created");
    }
    const productPrices = [
        // Dairy
        {
            name: "Milk",
            brand: "DairyLand",
            prices: {
                Walmart: 5.49,
                SuperStore: 4.79,
                Safeway: 5.69,
                "Save-On-Foods": 5.29,
            },
        },
        {
            name: "Greek Yogurt",
            brand: "KirkaLand",
            prices: {
                Walmart: 6.49,
                SuperStore: 5.99,
                Safeway: 6.99,
                "Save-On-Foods": 6.29,
            },
        },
        {
            name: "Cheddar Cheese",
            brand: "Great value",
            prices: {
                Walmart: 10.99,
                SuperStore: 11.49,
                Safeway: 12.99,
                "Save-On-Foods": 11.99,
            },
        },
        {
            name: "Butter",
            brand: "KirkaLand",
            prices: {
                Walmart: 6.99,
                SuperStore: 6.49,
                Safeway: 7.49,
                "Save-On-Foods": 6.79,
            },
        },

        // Bakery
        {
            name: "Sourdough Bread",
            brand: "Alberta Bakery",
            prices: {
                Walmart: 3.49,
                SuperStore: 3.99,
                Safeway: 4.49,
                "Save-On-Foods": 3.79,
            },
        },
        {
            name: "Bagels",
            brand: "Alberta Bakery",
            prices: {
                Walmart: 4.49,
                SuperStore: 4.29,
                Safeway: 4.99,
                "Save-On-Foods": 4.69,
            },
        },
        {
            name: "Plain Croissants",
            brand: "Dushes",
            prices: {
                Walmart: 5.99,
                SuperStore: 6.49,
                Safeway: 6.99,
                "Save-On-Foods": 6.29,
            },
        },
        {
            name: "Tortillas",
            brand: "Alberta Bakery",
            prices: {
                Walmart: 3.29,
                SuperStore: 2.99,
                Safeway: 3.79,
                "Save-On-Foods": 3.49,
            },
        },

        // Meat
        {
            name: "Chicken Breast",
            brand: "Freson",
            prices: {
                Walmart: 14.99,
                SuperStore: 13.99,
                Safeway: 15.49,
                "Save-On-Foods": 14.49,
            },
        },
        {
            name: "Ground Beef",
            brand: "Alberta Chop",
            prices: {
                Walmart: 10.99,
                SuperStore: 9.99,
                Safeway: 11.49,
                "Save-On-Foods": 10.49,
            },
        },
        {
            name: "Bacon",
            brand: "Farm",
            prices: {
                Walmart: 7.49,
                SuperStore: 6.99,
                Safeway: 7.99,
                "Save-On-Foods": 7.29,
            },
        },
        {
            name: "Sausages",
            brand: "Freson",
            prices: {
                Walmart: 11.99,
                SuperStore: 10.99,
                Safeway: 12.49,
                "Save-On-Foods": 11.49,
            },
        },

        // Drinks
        {
            name: "Coca-Cola",
            brand: "Coca-Cola",
            prices: {
                Walmart: 2.79,
                SuperStore: 2.49,
                Safeway: 2.99,
                "Save-On-Foods": 2.69,
            },
        },
        {
            name: "Apple Juice",
            brand: "complimat",
            prices: {
                Walmart: 3.49,
                SuperStore: 3.29,
                Safeway: 3.99,
                "Save-On-Foods": 3.59,
            },
        },
        {
            name: "Sparkling Water",
            brand: "Oasis",
            prices: {
                Walmart: 2.99,
                SuperStore: 2.79,
                Safeway: 3.29,
                "Save-On-Foods": 3.09,
            },
        },
        {
            name: "Red bull",
            brand: "Red bull",
            prices: {
                Walmart: 4.49,
                SuperStore: 4.29,
                Safeway: 4.79,
                "Save-On-Foods": 4.59,
            },
        },

        // Snacks
        {
            name: "Chips",
            brand: "Lay's",
            prices: {
                Walmart: 4.49,
                SuperStore: 4.29,
                Safeway: 4.99,
                "Save-On-Foods": 4.59,
            },
        },
        {
            name: "Chocolate Bar",
            brand: "Milka",
            prices: {
                Walmart: 3.99,
                SuperStore: 3.79,
                Safeway: 4.29,
                "Save-On-Foods": 4.09,
            },
        },
        {
            name: "Crackers",
            brand: "complimant",
            prices: {
                Walmart: 4.29,
                SuperStore: 3.99,
                Safeway: 4.49,
                "Save-On-Foods": 4.19,
            },
        },
        {
            name: "Popcorn",
            brand: "Alberta",
            prices: {
                Walmart: 3.49,
                SuperStore: 3.29,
                Safeway: 3.99,
                "Save-On-Foods": 3.59,
            },
        },
    ];
    for (const productPrice of productPrices) {
        const product = await prisma.product.findFirst({
            where: {
                name: productPrice.name,
                brand: productPrice.brand,
            },
        });

        if (!product) {
            continue;
        }

        const storePrices = [
            {
                store: walmart,
                price: productPrice.prices.Walmart,
            },
            {
                store: superStore,
                price: productPrice.prices.SuperStore,
            },
            {
                store: safeway,
                price: productPrice.prices.Safeway,
            },
            {
                store: saveOnFoods,
                price: productPrice.prices["Save-On-Foods"],
            },
        ];

        for (const storePrice of storePrices) {
            await prisma.price.upsert({
                where: {
                    productId_storeId: {
                        productId: product.id,
                        storeId: storePrice.store.id,
                    },
                },
                update: {
                    regularPrice: storePrice.price,
                },
                create: {
                    productId: product.id,
                    storeId: storePrice.store.id,
                    regularPrice: storePrice.price,
                },
            });
        }
    }
    
    console.log("Seed completed");

}
main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });