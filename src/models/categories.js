import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, name
      FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryByID = async(id) =>{
  const query = `
    SELECT 
      category_id, name AS category_name
    FROM
      categories
    WHERE category_id = $1;
  `
  const result = await db.query(query, [id]);
  return result.rows[0];
}

const getCategoriesOfProjects = async(projectId) => {
  const query = `
    SELECT 
      c.category_id, c.name AS category_name
    FROM
      categories c
    JOIN 
      project_categories pc
    ON
      c.category_id = pc.category_id
    WHERE pc.project_id = $1;
  `
  const result = await db.query(query, [projectId]);
  return result.rows;
}

const getProjectsByCategories = async(categoryId) =>{
  const query = `
    SELECT 
      sp.project_id, sp.title AS project_name
    FROM 
      service_projects sp
    JOIN
      project_categories pc
    ON 
      sp.project_id = pc.project_id
    WHERE
      pc.category_id = $1;
  `
  const result = await db.query(query, [categoryId]);
  return result.rows;
}

export {
  getAllCategories,
  getCategoryByID,
  getCategoriesOfProjects,
  getProjectsByCategories};