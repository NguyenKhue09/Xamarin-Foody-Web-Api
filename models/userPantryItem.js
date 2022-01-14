const mongoose = require("mongoose");
const PantryBuilerItem = require("./pantryBuilderItem")

const userPantryItemSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    itemId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: PantryBuilerItem
    }]
})

const UserPantryItem = mongoose.model("userPantryItem", userPantryItemSchema);

module.exports = UserPantryItem;