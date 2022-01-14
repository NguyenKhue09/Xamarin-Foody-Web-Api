const mongoose = require("mongoose");

const analyzedInstructionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    steps: [
        {
            number: {
                type: Number,
                required: true
            },
            step: {
                type: String,
                required: true
            }
        }
    ]
})

const AnalyzedInstruction = mongoose.model("analyzedInstruction", analyzedInstructionSchema);

module.exports = AnalyzedInstruction;