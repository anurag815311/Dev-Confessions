
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
