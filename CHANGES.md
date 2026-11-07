
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

