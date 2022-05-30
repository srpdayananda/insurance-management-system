import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['Not-approved', 'Approved', 'Completed'], default: 'Not-approved' }
})

export default mongoose.model('', policySchema)