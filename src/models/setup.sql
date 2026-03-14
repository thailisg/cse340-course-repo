/*==============Organization Table===============*/

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
    'BrightFuture Builders', 
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 
    'info@brightfuturebuilders.org', 
    'brightfuture-logo.png'
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
    'GreenHarvest Growers', 
    'An urban farming collective promoting food sustainability and education in local neighborhoods.', 
    'contact@greenharvest.org', 
    'greenharvest-logo.png'
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
    'UnityServe Volunteers', 
    'A volunteer coordination group supporting local charities and service initiatives.', 
    'hello@unityserve.org', 
    'unityserve-logo.png'
);

SELECT * FROM organization;

/* ================= service_projects =================== */

SELECT * FROM organization;

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);

INSERT INTO service_projects (organization_id, title, description, location, date)
VALUES
(1, 'Community Center Renovation', 'Volunteers help renovate the local community center.', 'Downtown Community Center', '2026-04-10'),
(1, 'School Playground Construction', 'Building a safe playground for children at the local school.', 'Sunrise Elementary School', '2026-04-18'),
(1, 'Affordable Housing Build', 'Helping construct affordable housing for families in need.', 'Westside Housing Site', '2026-05-02'),
(1, 'Library Repair Initiative', 'Repairing furniture and shelves in the public library.', 'City Public Library', '2026-05-15'),
(1, 'Senior Home Maintenance Day', 'Providing home maintenance support for senior citizens.', 'Maple Street Neighborhood', '2026-06-01');

INSERT INTO service_projects (organization_id, title, description, location, date)
VALUES
(2, 'Community Garden Planting', 'Volunteers plant vegetables and herbs in the community garden.', 'Central Community Garden', '2026-04-12'),
(2, 'Urban Tree Planting', 'Planting trees around the city to increase green spaces.', 'Riverside Park', '2026-04-25'),
(2, 'Sustainable Farming Workshop', 'Teaching sustainable farming techniques to local residents.', 'GreenHarvest Farm', '2026-05-10'),
(2, 'School Garden Project', 'Creating a small garden for students to learn about plants.', 'Riverdale Middle School', '2026-05-22'),
(2, 'Farmers Market Setup', 'Setting up stalls and organizing the weekly farmers market.', 'Town Square', '2026-06-05');

INSERT INTO service_projects (organization_id, title, description, location, date)
VALUES
(3, 'City Park Cleanup', 'Volunteers clean trash and maintain park facilities.', 'Liberty City Park', '2026-04-08'),
(3, 'Food Bank Volunteer Day', 'Sorting and distributing food donations to families.', 'Hope Food Bank', '2026-04-20'),
(3, 'Homeless Outreach Support', 'Providing care packages and support to the homeless community.', 'Downtown Outreach Center', '2026-05-03'),
(3, 'Neighborhood Beautification', 'Painting fences and planting flowers in the neighborhood.', 'Oakwood District', '2026-05-18'),
(3, 'Youth Mentorship Program', 'Volunteers mentor and guide local youth.', 'Community Youth Center', '2026-06-10');

SELECT * FROM service_projects;

/* =================Categories===================== */

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES service_projects(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);

SELECT * FROM categories;
SELECT * FROM project_categories;

INSERT INTO categories (name) VALUES
('Community Service'),
('Environmental'),
('Education');

INSERT INTO categories (name) VALUES 
('Food Assitance'),
('Social Support');

INSERT INTO project_categories (project_id, category_id) VALUES
(1,1),
(2,3),
(3,1),
(4,1),
(5,5),
(6,2),
(7,2),
(8,3),
(9,3),
(10,2),
(11,2),
(12,4),
(13,5),
(14,1),
(15,3);