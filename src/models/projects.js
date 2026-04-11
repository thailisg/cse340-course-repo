import db from './db.js'

const getAllProjects = async() => {
  const query = `
    SELECT 
      sp.project_id,
      sp.title,
      sp.date,
      o.name AS organization_name
      FROM service_projects sp
      JOIN organization o
        ON sp.organization_id = o.organization_id;`;

  const result = await db.query(query);

  return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      date
      FROM service_projects
      WHERE organization_id = $1
      ORDER BY date;
  `;
      
  const query_params = [organizationId];
  const result = await db.query(query, query_params);

  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM service_projects sp
    JOIN organization o on sp.organization_id = o.organization_id
    WHERE sp.date >= CURRENT_DATE
    ORDER BY sp.date ASC
    LIMIT $1
  `;

  const result = await db.query(query, [number_of_projects]);

  return result.rows;
};

const getProjectDetails = async (id) => {
  const query =  `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM service_projects sp
    JOIN organization o on sp.organization_id = o.organization_id
    WHERE sp.project_id = $1
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const createProject = async (title, description, location, date, organization_Id) => {
  const query = `
    INSERT INTO service_projects (title, description, location, date, organization_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id;
  `;

  const query_params = [title, description, location, date, organization_Id];
  const result = await db.query(query, query_params);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID:', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
}

const updateProject = async ( projectId, title, description, location, date, organization_id) => {
  const query = `
    UPDATE service_projects
    SET 
      title = $1,
      description = $2,
      location = $3,
      date = $4,
      organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const query_params = [title, description, location, date, organization_id, projectId];

  const result = await db.query(query, query_params);

  if (result.rows.length === 0) {
    throw new Error('Project not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated project with ID:', projectId);
  }

  return result.rows[0].project_id;
};

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id) DO NOTHING;
  `;

  const result = await db.query(query, [userId, projectId]);
  return result;
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM volunteers
    WHERE user_id = $1 AND project_id = $2;
  `;

  const result = await db.query(query, [userId, projectId]);
  return result;
};

const getUserVolunteers = async (userId) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.date,
      sp.location,
      sp.organization_id
    FROM service_projects sp
    JOIN volunteers v ON sp.project_id = v.project_id
    WHERE v.user_id = $1;
  `;

  const result = await db.query(query, [userId]);
  return result.rows;
};

const isUserVolunteer = async (userId, projectId) => {
  const query = `
    SELECT * FROM volunteers
    WHERE user_id = $1 AND project_id = $2;
  `;

  const result = await db.query(query, [userId, projectId]);
  return result.rows.length > 0;
};

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  createProject,
  updateProject,
  addVolunteer,
  removeVolunteer,
  getUserVolunteers,
  isUserVolunteer
};