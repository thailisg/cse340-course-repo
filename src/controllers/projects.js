import { getAllProjects } from "../models/projects.js";

const projectsPage = async (req, res) => {
    const serviceProjects = await getAllProjects();
    const title = 'Service Projects';

    res.render('projects', { title, serviceProjects });
};

export { projectsPage };