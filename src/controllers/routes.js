import express from 'express';

import { showProjectDetailsPage } from './projects.js';
import { showOrganizationDetailsPage } from './organizations.js';
import { organizationsPage } from './organizations.js';
import { projectsPage } from './projects.js';
import { categoriesPage } from './categories.js';
import { homePage } from './index.js';
import { testError } from './errors.js';
import { showCategoryDetails } from './categories.js';

const router = express.Router();

router.get('/',homePage)
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage)
router.get('/categories', categoriesPage)
router.get('/testError', testError);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetails)

export default router;