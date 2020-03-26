# EasyCollect API
This is a simple API to manage EasyCollect


## Version: 1.0.0

**Contact information:**  
you@your-company.com  

**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

### /shops

#### GET
##### Summary:

retrieve all shops

##### Description:

Retrieve all available shops


##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| filter | query | pass an optional search string to search shops by name or address | No | string |
| categories_id | query | pass an optional parameter to filter by category | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | search results matching criteria |
| 400 | bad input parameter |

#### POST
##### Summary:

adds a Shop

##### Description:

Adds a Shop to the system

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | item created |
| 400 | invalid input, object invalid |
| 409 | an existing item already exists |

### /shops/{id}

#### GET
##### Summary:

retrieve information of a single Shop

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Numeric ID of the Shop to get | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Item retrieved successfully |
| 404 | Item not found |
