import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['NOT_APPROVED', 'APPROVED', 'COMPLETED'], default: 'NOT_APPROVED' },
    userId: { type: mongoose.Types.ObjectId, required: true ,ref:'user'}
})

export default mongoose.model('policy', policySchema)