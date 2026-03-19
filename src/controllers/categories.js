import { getAllCategories } from "../models/categories.js";

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Our categories!';

    res.render('categories', { title, categories });
};

export {categoriesPage};


    