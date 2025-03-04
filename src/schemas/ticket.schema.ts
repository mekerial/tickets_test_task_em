import mongoose from "mongoose";

export const ticketSchema = new mongoose.Schema({
    topic: String,
    message: String,
    status: {
        type: String,
        enum: ['Новое', 'В работе', 'Завершено', 'Отменено'],
        default: 'Новое',
    },
    resolution: String,
    cancellationReason: String,
    createdAt: { type: Date, default: Date.now },
});

export const Ticket = mongoose.model('Ticket', ticketSchema);