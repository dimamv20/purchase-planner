import { Request, Response } from "express";

import { updateShoppingListItem, getShoppingListItemById, deleteShoppingListItem, addShoppingListItem } from "../services/shoppingListItem.service.js";

import {addShoppingListItemSchema,updateShoppingListItemSchema,} from "../validators/shoppingListItem.validator.js";

export async function updateShoppingListItemController(req: Request <{ id: string }>, res: Response){
    
    const  shoppingListItemId = req.params.id;

    const userId = res.locals.user.userId;

    const data = updateShoppingListItemSchema.parse(req.body);

    const updatedItem = await updateShoppingListItem(shoppingListItemId,userId,data);

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
    
    const data = addShoppingListItemSchema.parse(req.body);

    const item = await addShoppingListItem(
        shoppingListId,
        userId,
        data
    );
    return res.status(201).json(item);
}

export async function deleteShoppingListItemController(
    req: Request<{ id: string }>,
    res: Response
) {
    const itemId = req.params.id;
    const userId = res.locals.user.userId;

    if (typeof itemId !== "string") {
        return res.status(400).json({
            message: "Shopping list item id is required",
        });
    }

    await deleteShoppingListItem(itemId, userId);

    return res.status(204).send();
}


