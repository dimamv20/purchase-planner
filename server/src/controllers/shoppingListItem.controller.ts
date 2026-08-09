import { Request, Response } from "express";

import { updateShoppingListItem, getShoppingListItemById, deleteShoppingListItem, addShoppingListItem } from "../services/shoppingListItem.service.js";
export async function updateShoppingListItemController(req: Request <{ id: string }>, res: Response){
    
    const  shoppingListItemId = req.params.id;

    const userId = res.locals.user.userId;
    const updatedItem = await updateShoppingListItem(shoppingListItemId,userId,req.body);

    return res.status(200).json(updatedItem);
}

export async function getShoppingListItemByIdController (req: Request<{ id: string }>, res: Response){
    const shoppingListItemsId = req.params.id;
    const userId = res.locals.user.userId;
    if (typeof shoppingListItemsId !== "string"){
        return res.status(400).json({ message: "Shopping list item id is required"});
    }

    const item = await getShoppingListItemById(shoppingListItemsId, userId);
    return res.json(item);
}

export async function addShoppingListItemController(
    req: Request<{ id: string }>,
    res: Response
) {
    const shoppingListId = req.params.id;
    const userId = res.locals.user.userId;

    if (typeof shoppingListId !== "string") {
        return res.status(400).json({ message: "Shopping list id is required" });
    }

    const item = await addShoppingListItem(
        shoppingListId,
        userId,
        req.body
    );

    return res.status(201).json(item);
}

export async function deleteShoppingListItemController(
    req: Request<{ id: string }>,
    res: Response
) {
    const itemId = req.params.id;

    await deleteShoppingListItem(itemId);

    return res.status(204).send();
}

