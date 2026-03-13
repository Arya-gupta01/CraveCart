import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import foodModel from "./models/foodModel.js";
import "dotenv/config";

const foodData = [
  {
    name: "Clover Salad",
    price: 16,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    image: "food_3.png"
  },
  {
    name: "Chicken Salad",
    price: 24,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    image: "food_4.png"
  },
  {
    name: "Lasagna Rolls",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    image: "food_5.png"
  },
  {
    name: "Peri Peri Rolls",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    image: "food_6.png"
  },
  {
    name: "Chicken Rolls",
    price: 20,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    image: "food_7.png"
  },
  {
    name: "Veg Rolls",
    price: 15,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    image: "food_8.png"
  },
  {
    name: "Ripple Ice Cream",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    image: "food_9.png"
  },
  {
    name: "Fruit Ice Cream",
    price: 22,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    image: "food_10.png"
  },
  {
    name: "Jar Ice Cream",
    price: 10,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    image: "food_11.png"
  },
  {
    name: "Vanilla Ice Cream",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    image: "food_12.png"
  },
  {
    name: "Chicken Sandwich",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    image: "food_13.png"
  },
  {
    name: "Vegan Sandwich",
    price: 18,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    image: "food_14.png"
  },
  {
    name: "Grilled Sandwich",
    price: 16,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    image: "food_15.png"
  },
  {
    name: "Bread Sandwich",
    price: 24,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    image: "food_16.png"
  },
  {
    name: "Cup Cake",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    image: "food_17.png"
  },
  {
    name: "Vegan Cake",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    image: "food_18.png"
  },
  {
    name: "Butterscotch Cake",
    price: 20,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    image: "food_19.png"
  },
  {
    name: "Sliced Cake",
    price: 15,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    image: "food_20.png"
  },
  {
    name: "Garlic Mushroom",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    image: "food_21.png"
  },
  {
    name: "Fried Cauliflower",
    price: 22,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    image: "food_22.png"
  },
  {
    name: "Mix Veg Pulao",
    price: 10,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    image: "food_23.png"
  },
  {
    name: "Rice Zucchini",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    image: "food_24.png"
  },
  {
    name: "Cheese Pasta",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    image: "food_25.png"
  },
  {
    name: "Tomato Pasta",
    price: 18,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    image: "food_26.png"
  },
  {
    name: "Creamy Pasta",
    price: 16,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    image: "food_27.png"
  },
  {
    name: "Chicken Pasta",
    price: 24,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    image: "food_28.png"
  },
  {
    name: "Buttter Noodles",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    image: "food_29.png"
  },
  {
    name: "Veg Noodles",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    image: "food_30.png"
  },
  {
    name: "Somen Noodles",
    price: 20,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    image: "food_31.png"
  },
  {
    name: "Cooked Noodles",
    price: 15,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    image: "food_32.png"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("✓ Connected to MongoDB");

    // Clear existing foods (optional - remove if you want to keep existing items)
    // await foodModel.deleteMany({});
    // console.log("Cleared existing foods");

    // Insert all foods
    const result = await foodModel.insertMany(foodData);
    console.log(`✓ Successfully seeded ${result.length} food items into the database`);
    console.log("✓ Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
