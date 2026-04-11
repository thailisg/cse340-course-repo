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

  await db.query(query, [projectId, categoryId]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
  const deleteQuery = `
    DELETE FROM project_categories
    WHERE project_id = $1;
  `;
  await db.query(deleteQuery, [projectId]);

  for (const categoryId of categoryIds) {
    await assignCategoryToProject(projectId, categoryId);
  }
};

const createCategory = async (name) => {
  const query = `
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING category_id;
  `;

  const result = await db.query(query, [name]);

  if (result.rows.length === 0) {
    throw new Error('Failed to create category');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new category with ID:', result.rows[0].category_id);
  }

  return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
  const query = `
    UPDATE categories
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id;
  `;

  const query_params = [name, categoryId];
  const result = await db.query(query, query_params);

  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated category with ID:', categoryId);
  }

  return result.rows[0].category_id;
};


export {
  getAllCategories,
  getCategoryByID,
  getCategoriesOfProjects,
  getProjectsByCategories,
  updateCategoryAssignments,
  createCategory,
  updateCategory
};