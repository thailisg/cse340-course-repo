import express from 'express';

import { showProjectDetailsPage } from './projects.js';
import { showOrganizationDetailsPage } from './organizations.js';
import { organizationsPage } from './organizations.js';
import { projectsPage } from './projects.js';
import { categoriesPage } from './categories.js';
import { homePage } from './index.js';
import { testError } from './errors.js';
import { showCategoryDetails } from './categories.js';
import { showNewOrganizationForm } from './organizations.js';
import { processNewOrganizationForm } from './organizations.js';
import { organizationValidation } from './organizations.js';
import { showEditOrganizationForm } from './organizations.js';
import { processEditOrganizationForm } from './organizations.js';
import { showNewProjectForm } from './projects.js';
import { processNewProjectForm } from './projects.js';
import { projectValidation } from './projects.js';
import { showAssignCategoriesForm } from './categories.js';
import { processAssignCategoriesForm } from './categories.js';
import { showEditProjectForm, processEditProjectForm } from './projects.js';
import { showNewCategoryForm, processNewCategoryForm } from './categories.js';
import { categoryValidation } from './categories.js';
import { showEditCategoryForm, processEditCategoryForm } from './categories.js';
import { showUserRegistrationForm } from './users.js';
import { processUserRegistrationForm } from './users.js';
import { showLoginForm } from './users.js';
import { processLoginForm } from './users.js';
import { processLogout } from './users.js';
import { requireLogin } from './users.js';
import { showDashboard } from './users.js';
const router = express.Router();

router.get('/',homePage)
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage)
router.get('/categories', categoriesPage)
router.get('/testError', testError);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetails);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', processEditCategoryForm)
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);


export default router;