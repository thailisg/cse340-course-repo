import {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails
} from '../models/projects.js';

import { getCategoriesOfProjects } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectsPage = async (req, res) => {
    const serviceProjects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, serviceProjects });
};

const showProjectDetailsPage = async (req, res) => {
  const id = req.params.id;

  const project = await getProjectDetails(id);
  const categories = await getCategoriesOfProjects(id);

  res.render('project', {
    title: project.title,
    project: project,
    categories: categories
  });
};

export { 
    projectsPage,
    showProjectDetailsPage
 };
