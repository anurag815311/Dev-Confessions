## Section 1 - Variable Renames

| Old Name | New Name | Why |
|---|---|---|
| x | confessionIdCounter | Describes the counter used to generate confession IDs |
| d | confessionData | Clearly identifies the incoming confession request data |
| r | requestParams | Describes the route parameters extracted from the request |
| t | operationType | Identifies the operation selected by the handler |
| tmp | newConfession | Describes the newly created confession object |
| arr | sortedConfessions | Describes the collection sorted by creation date |
| result | responsePayload | Describes the response object sent to the client |
| i | confessionId | Identifies the parsed confession ID |
| info | confession | Clearly identifies the retrieved confession |
| cat | category | Replaces an abbreviated category variable |
| cats | validCategories | Describes the accepted category values |
| stuff | filteredConfessions | Describes the category-filtered results |
| handler | confessionIndex | Identifies the index of the confession being deleted |
| res2 | apiResponse | Describes the result returned by the deletion operation |
| fn | existingConfession | Describes the confession being searched |
| startStr | startupMessage | Describes the server startup message |