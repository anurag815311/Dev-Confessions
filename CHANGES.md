
## Section 1 - Variable Renames

| Old Name | New Name | Why |
|---|---|---|
| x (global) | confessionIdCounter | Describes the counter used to generate confession IDs |
| d | confessionData | Clearly identifies incoming confession request data |
| r | requestParams | Describes route parameters |
| t | operationType | Identifies the operation being handled |
| tmp | newConfession | Describes the newly created confession |
| arr | sortedConfessions | Describes the collection sorted by creation date |
| result | responsePayload | Describes the response object |
| i | confessionId | Identifies the parsed confession ID |
| info | confession | Describes the retrieved confession |
| cat | category | Replaces an abbreviated category name |
| cats / categories | validCategories | Describes the accepted category values |
| stuff | filteredConfessions | Describes category-filtered results |
| x (filter callback) | confessionItem | Describes each confession being checked |
| fn | existingConfession | Describes the confession being searched |
| handler | confessionIndex | Identifies the array index of the confession |
| res2 | apiResponse | Describes the result returned by the deletion operation |
| startStr | startupMessage | Describes the server startup message |

Note: The original `arr` variable was sorted, not filtered. Therefore, its new name is `sortedConfessions`.



## Section 2 - Function Splits

### Original function: handleAll()

The original function handled five different operations through nested conditional statements.

It has been refactored into:

- createConfession() - validates confession input and creates a new confession.
- getAllConfessions() - retrieves all confessions and prepares the response.
- getConfessionById() - finds and returns an individual confession.
- getConfessionsByCategory() - validates the requested category and filters confessions.
- deleteConfession() - validates deletion authorization and removes a confession.
- handleAll() - acts as a lightweight dispatcher that delegates requests to the appropriate function.

**Why:**

The original handleAll() function had five responsibilities mixed together. This made the application difficult to read, maintain, and test.

Splitting the operations into dedicated functions improves separation of concerns and makes each operation easier to understand and test independently.

The existing API routes and response formats are retained.


## Move 4 - MVC Folder Structure

### Files Created

- config/config.js - centralises valid confession categories.
- routes/confessionRoutes.js - defines API routes and delegates requests to controllers.
- controllers/confessionController.js - extracts request data, calls services, and sends HTTP responses.
- services/confessionService.js - contains confession creation, retrieval, filtering, and deletion logic.
- server.js - handles Express server startup.

### Files Modified

- app.js - now configures Express middleware and registers confession routes.
- package.json - updates application startup scripts to use server.js.

### Architectural Decisions

1. Routes contain no business logic.
2. Controllers do not directly manipulate the confession collection.
3. Services contain the business logic and in-memory storage operations.
4. Server startup is separated from Express application configuration.
5. Existing API endpoint paths and response formats are retained.

**Why:** The original application combined all responsibilities in app.js. Introducing MVC separation improves maintainability, readability, testability, and code organisation.


## Move 5: Externalise Configuration and Secrets

### Changes made
- Added dotenv to load environment variables.
- Moved the server port into the PORT environment variable.
- Moved the delete API token into the DELETE_TOKEN environment variable.
- Updated the configuration module to centralise environment settings.
- Added .env.example as a configuration template.
- Updated .gitignore to exclude .env and node_modules.
- Ensured package.json and package-lock.json remain tracked.

### Why?
Hardcoded secrets and configuration make applications difficult to configure
across different environments and can expose sensitive information.

### Behaviour preservation
The default port remains 3000, and the local delete token remains unchanged.
The API routes and response formats should remain unchanged.

## Move 6: Centralised Error Handling and Logging

### Changes made
- Added reusable logging utility.
- Added centralised Express error-handling middleware.
- Registered error middleware after application routes.
- Replaced scattered console.log statements with structured logging.
- Added error logging for unexpected application failures.
- Fixed the DELETE_TOKEN variable reference in the delete controller.

### Why?
Centralised error handling improves maintainability and ensures unexpected
errors are handled consistently. Logging helps developers debug issues.

### Behaviour preservation
Existing successful API responses and known validation responses are preserved.
Unexpected errors now receive a consistent JSON response.

## Move 7: Dedicated Validation Layer

### Changes made
- Created a dedicated confessionValidator.js module.
- Moved confession creation validation out of the service.
- Centralised category validation.
- Improved validation of confession text types.
- Replaced direct console logging with the reusable logger.
- Prevented getAllConfessions from mutating the original array during sorting.
- Cleaned up duplicate route definitions.

### Why?
Separating validation from business logic improves maintainability,
readability, and code reusability.

### Behaviour preservation
Existing API routes and standard successful responses remain unchanged.
Invalid non-string confession text is now rejected.