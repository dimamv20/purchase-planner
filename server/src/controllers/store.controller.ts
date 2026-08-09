import { Request, Response } from "express";
import { getStores } from "../services/store.service.js";
import {createStore} from "../services/store.service.js";
import { getStoreById } from "../services/store.service.js";
import {updateStore} from "../services/store.service.js";
import {deleteStore} from "../services/store.service.js";

export async function getStoresController( req: Request, res: Response) {
    const stores = await getStores();
    return res.json(stores);
}

export async function createStoreController(req: Request, res: Response) {
     const store = await createStore(req.body);
   
       return res.status(201).json(store);
}

export async function getStoreByIdController(req: Request<{ id: string }>, res: Response) {
    const storeId = req.params.id;
    const store = await getStoreById(storeId);
    return res.json(store);
}

export async function updateStoreController(req: Request<{ id: string }>, res: Response) {
    const storeId = req.params.id;
    const updatestore = await updateStore(storeId,req.body);
    return res.json(updatestore);
}

export async function deleteStoreController(req: Request<{ id: string }>, res: Response) {
    const storeId = req.params.id;
    const deletedStore = await deleteStore(storeId);
    return res.json(deletedStore);
}