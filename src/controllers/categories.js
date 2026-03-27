import { 
    getAllCategories,
    getCategoryByID,
    getProjectsByCategories,
    updateCategoryAssignments,
    getCategoriesOfProjects
} from "../models/categories.js";

import { getProjectDetails } from "../models/projects.js";


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

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesOfProjects(projectId);

  const title = 'Assign Categories to Project';

  res.render('assign-categories', {
    title,
    projectId,
    projectDetails,
    categories,
    assignedCategories
  });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const selectedCategoryIds = req.body.categoryIds || [];

  const categoryIdsArray = Array.isArray(selectedCategoryIds)
    ? selectedCategoryIds
    : [selectedCategoryIds];

  await updateCategoryAssignments(projectId, categoryIdsArray);

  req.flash('success', 'Categories updated successfully.');
  res.redirect(`/project/${projectId}`);
};

export {
    categoriesPage,
    showCategoryDetails,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};


    