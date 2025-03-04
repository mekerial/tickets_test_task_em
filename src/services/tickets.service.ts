import {Ticket} from "../schemas/ticket.schema";

export class TicketsService {
    static async getTickets(startDate?: string, endDate?: string) {
        let filter: any = {};
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate as string);
            if (endDate) filter.createdAt.$lte = new Date(endDate as string);
        }
        const tickets = await Ticket.find(filter);
        if (!tickets) {
            return null;
        }
        return tickets;
    }
    static async createTicket(topic: string, message: string) {
        const ticket = new Ticket({ topic, message });
        const createTicket = await ticket.save();
        if (!createTicket) {
            return null;
        }
        return ticket;
    }
    static async updateTicketStatus(id: string, status: string, resolution?: string, cancellationReason?: string) {
        const ticket = await Ticket.findByIdAndUpdate(
            id,
            {
                status: status,
                resolution: resolution,
                cancellationReason: cancellationReason
            },
            { new: true }
        );
        if (!ticket) {
            return null;
        }
        return ticket;
    }

    static async revokeTicketsInWork() {
        const revokeTickets = await Ticket.updateMany({ status: 'В работе' }, { status: 'Отменено', cancellationReason: 'Массовая отмена' });
        if (!revokeTickets) {
            return null;
        }
        return revokeTickets;
    }
}