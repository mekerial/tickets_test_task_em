import {Router} from "express";
import {Request, Response} from "express";
import {TicketsService} from "../services/tickets.service";

export const ticketsRoute = Router({})

ticketsRoute.get('/', async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;
    const tickets = await TicketsService.getTickets(startDate?.toString(), endDate?.toString());
    if (!tickets) {
        res.sendStatus(404);
        return;
    }
    res.json(tickets);
    return;
});

ticketsRoute.post('/',  async (req: Request, res: Response) => {
    const { topic, message } = req.body;

    const createTicket = await TicketsService.createTicket(topic, message)

    res.status(201).json(createTicket);
});

ticketsRoute.put('/:id/work', async (req: Request, res: Response) => {
    const updateTicket = await TicketsService.updateTicketStatus(req.params.id, 'В работе');
    if (!updateTicket) {
        res.sendStatus(404);
        return;
    }
    res.json(updateTicket);
});

ticketsRoute.put('/:id/complete', async (req: Request, res: Response) => {
    const { resolution } = req.body;

    const updateTicket = await TicketsService.updateTicketStatus(req.params.id, 'Завершено', resolution);

    if (!updateTicket) {
        res.sendStatus(404);
        return;
    }
    res.json(updateTicket);
});

ticketsRoute.put('/:id/cancel', async (req: Request, res: Response) => {
    const { cancellationReason } = req.body;

    const updateTicket = await TicketsService.updateTicketStatus(req.params.id, 'Отменено', undefined, cancellationReason);

    if (!updateTicket) {
        res.sendStatus(404);
        return;
    }

    res.json(updateTicket);
});



ticketsRoute.delete('/cancel-in-work', async (req: Request, res: Response) => {
    const revokeTickets = await TicketsService.revokeTicketsInWork();

    if (!revokeTickets) {
        res.sendStatus(404);
        return;
    }

    res.json({ message: 'All revoked' });
});