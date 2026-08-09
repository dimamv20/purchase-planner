import {Request, Response} from "express";
import {getShoppingLists, createShoppingList, getShoppingListsById, updateShoppingList, deleteShoppingList} from "../services/shoppingList.service.js";
import { addShoppingListItem } from "../services/shoppingListItem.service.js";

export async function getShoppingListsController(req: Request, res: Response) {
    const userId = res.locals.user.userId;

    const shoppingLists = await getShoppingLists(userId);

    return res.json(shoppingLists);
}

export async function createShoppingListController(
    req: Request,
    res: Response
) {
    const userId = res.locals.user.userId;

    const shoppingList = await createShoppingList(
        userId,
        req.body
    );

    return res.status(201).json(shoppingList);
}

export async function getShoppingListsByIdController(req: Request<{ id: string }>, res: Response) {
    const shoppingListId = req.params.id;
    const userId = res.locals.user.userId;
    const shoppingList = await getShoppingListsById(shoppingListId, userId);

    return res.json(shoppingList);
}

export async function  updateShoppingListController(req: Request<{ id: string }>, res: Response ){
    const ShoppingListId = req.params.id;
    const userId = res.locals.user.userId;
    const updatedShoppingList = await updateShoppingList(ShoppingListId,userId, req.body);

    return res.json(updatedShoppingList); 
}


export async function deleteShoppingListController (req: Request<{ id: string }>, res: Response){
    const shoppingListId = req.params.id;
    const userId = res.locals.user.userId;
    const deletedShoppingList = await deleteShoppingList(shoppingListId,userId)
    return res.json(deletedShoppingList);
}



export async function addShoppingListItemController(
    req: Request<{ id: string }>,
    res: Response
) {
    const shoppingListId = req.params.id;
    const userId = res.locals.user.userId;

    const item = await addShoppingListItem(
        shoppingListId,
        userId,
        req.body
    );

    return res.status(201).json(item);
}