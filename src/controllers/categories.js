import { 
    getAllCategories,
    getCategoryByID,
    getProjectsByCategories } from "../models/categories.js";

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Our categories!';

    res.render('categories', { title, categories });
};

const showCategoryDetails = async (req, res) =>{
    const id = req.params.id;

    const category = await getCategoryByID(id);
    const projects = await getProjectsByCategories(id);
    
    const title = 'Category Details'

    res.render('category', {title, category, projects});
};

export {
    categoriesPage,
    showCategoryDetails
};


    