import Item from "../models/itemModel.js";

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const getItems = async (req, res) => {
  const items = await Item.find();

  res.status(200).json(items);
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id; // Assuming item id is passed as a route parameter
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const filterItems = async (req, res) => {
  const { filterName, lowerPrice, upperPrice } = req.body;
console.log("hi");
  try {
    const query = {};
    
    // Check if a filterName is provided and it's not the default value "--ทั้งหมด--"
    if (filterName && filterName !== "ทั้งหมด") {
      query.name = { $regex: filterName, $options: 'i' };

    }
    
    if (lowerPrice !== undefined && upperPrice !== undefined) {
      query.price = { $gte: lowerPrice, $lte: upperPrice };
    }
    
 
    const filteredItems = await ItemModel.find(query);

    res.json(filteredItems);
  } catch (error) {
    console.error("Error filtering items:", error);
    res.status(500).send("Internal Server Error");
  }
};