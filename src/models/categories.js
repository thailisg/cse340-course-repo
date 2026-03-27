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

const assignCategoryToProject = async(projectId, categoryId) => {
  const query = `
    INSERT INTO project_categories (project_id, category_id)
    VALUES ($1, $2);
  `;

  await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
  const deleteQuery = `
    DELETE FROM project_categories
    WHERE project_id = $1;
  `;
  await db.query(deleteQuery, [projectId]);

  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
};

export {
  getAllCategories,
  getCategoryByID,
  getCategoriesOfProjects,
  getProjectsByCategories,
  updateCategoryAssignments
};