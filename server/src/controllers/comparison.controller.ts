import { Request, Response } from "express";
import { compareShoppingList, getComparisonResults, getComparisonResultById  } from "../services/comparison.service.js";

export async function compareShoppingListController(
    req: Request<{ id: string }>,
    res: Response
) {
    const shoppingListId = req.params.id;
    const userId = res.locals.user.userId;

    const result = await compareShoppingList(
        shoppingListId,
        userId
    );

    return res.json(result);
}

export async function getComparisonResultsController(
    req: Request,
    res: Response
) {
    const userId = res.locals.user.userId;

    const results = await getComparisonResults(userId);

    return res.json(results);
}

export async function getComparisonResultByIdController(
    req: Request<{ id: string }>,
    res: Response
) {
    const comparisonId = req.params.id;
    const userId = res.locals.user.userId;

    const result = await getComparisonResultById(
        comparisonId,
        userId
    );

    return res.json(result);
}