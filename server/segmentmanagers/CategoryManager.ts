import CategoryController from "../controllers/CategoryController";
import { createRecord } from "../lib/mongo-helper";
import ServerSegmentManager from "./ServerSegmentManager";


const initCategories = [

    {name:"observation"},
    {name:"theory"},
    {name:"philosophy"},
    {name:"conspiracy"}

]



export default class CategoryManager extends ServerSegmentManager  {
 

    async init() {  
        await Promise.all(initCategories.map(x => CategoryController.insertNewCategory( x  , this.mongoDB)))
    }


}