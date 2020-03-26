# EasyCollect API
This is a simple API to manage EasyCollect

## Version: 0.1.0

**Contact information:**  
you@your-company.com  

**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

### /shops

#### GET
##### Summary:

retrieve all shops

##### Description:

Retrieve all available shops

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
| 200 | Item deleted successfully |

#### PUT
##### Summary:

Update a Shop

##### Description:

Add new Event in Event db

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Numeric ID of the Shop to get | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Entry inserted correctly |

#### DELETE
##### Summary:

Delete shop from ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Numeric ID of the user to get | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Item deleted successfully |
