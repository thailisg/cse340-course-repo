import express from 'express';

import { organizationsPage } from './organizations.js';
import { projectsPage } from './projects.js';
import { categoriesPage } from './categories.js';
import { homePage } from './index.js';
import { testError } from './errors.js';

const router = express.Router();

router.get('/',homePage)
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage)
router.get('/categories', categoriesPage)
router.get('/testError', testError);

export default router;