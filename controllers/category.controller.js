const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
      console.log(req.body); // Ma'lumot kelayotganini tekshirish uchun

      if (!req.body.name) {
          return res.status(400).json({ message: "Category name is required" });
      }

      const newCategory = new Category({
          name: req.body.name,
          description: req.body.description
      });

      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
  } catch (error) {
      res.status(500).json({ message: "Error creating category", error });
  }
};


exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
