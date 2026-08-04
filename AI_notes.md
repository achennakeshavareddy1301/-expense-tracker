# AI_NOTES.md

## AI Tools Used

I used ChatGPT during the development of this project to accelerate implementation, understand best practices, and improve the project structure.

---

## 1. AI-generated vs. self-written code

### AI-assisted
- Initial project structure
- Express route definitions
- Jest test suite
- some of the code like serices functions like getexpenses,delete are written
- Swagger/OpenAPI configuration
- README template

### Written or completed by me
- Integrated all generated files into the project
- Installed and configured project dependencies
- Fixed TypeScript compilation issues
- Fixed Express configuration and server startup issues
- Connected all modules together
- Configured Jest and verified tests
- Added and configured Swagger documentation
-handle expection 
- Verified API functionality using HTTP requests
- Final project organization and submission preparation

---

## 2. What I validated or changed

I reviewed all AI-generated code before using it.

Changes I made include:
- Fixed TypeScript type errors.
- Corrected import paths and module configuration.
- Updated the project configuration (`tsconfig.json`) to resolve compilation issues.
- Verified every API endpoint manually.
- Ensured the automated test suite passed successfully.
- Added Swagger documentation and confirmed it was accessible at `/api-docs`.
- Removed unused project files and folders to keep the repository clean.

---

## 3. AI suggestions I did not use

I chose not to implement additional optional features such as:
- Monthly summary endpoint
- Search endpoint
- Docker support

The assignment requested selecting at most one bonus feature, so I implemented **Swagger/OpenAPI documentation** only.

I also avoided unnecessary abstractions and kept the project simple to match the assignment requirements.
