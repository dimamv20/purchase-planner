import type { Request, Response } from "express";
import {getPrices, createPrice, getPricesById, updatePrice, deletePrice} from "../services/price.service.js";


export async function getPriceController(req: Request, res: Response) {
    const prices = await getPrices();
    return res.json(prices);
}

export async function createPriceController(req: Request, res: Response) {
    const price = await createPrice(req.body);
    return res.status(201).json(price);
}

export async function getPriceByIdController(req: Request<{ id: string }>, res: Response) {
    const priceId = req.params.id;
    const price = await getPricesById(priceId);
    return res.json(price);

}

export async function updatePriceController(req: Request<{ id: string }>, res: Response) {
    const priceId = req.params.id;
    const updatedPrice = await updatePrice(priceId, req.body);
    return res.json(updatedPrice);
}

export async function deletePriceController(req: Request<{ id: string }>, res: Response) {
    const priceId = req.params.id;
    const deletedPrice = await deletePrice(priceId);
    return res.json(deletedPrice);
}
