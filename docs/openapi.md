
EasyCollect API
===============

This is a simple API to manage EasyCollect

Access
------

Methods
-------

\[ Jump to [Models](#__Models) \]

### Table of Contents

#### [Categories](#Categories)

*   [`get /categories`](#categoriesGet)

#### [Shops](#Shops)

*   [`post /shops`](#addShop)
*   [`get /shops`](#getShops)
*   [`get /shops/{id}`](#shopsIdGet)

Categories
==========

[Up](#__Methods)

    get /categories

retrieve all categories (categoriesGet)

### Return type

array\[[Category](#Category)\]

### Example data

Content-Type: application/json

    [ {
      "natural_key" : "1234_4345",
      "name" : "Macelleria",
      "id" : 12334
    }, {
      "natural_key" : "1234_4345",
      "name" : "Macelleria",
      "id" : 12334
    } ]

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 200

search results ordered ASC

* * *

Shops
=====

[Up](#__Methods)

    post /shops

adds a Shop (addShop)

Adds a Shop to the system

### Consumes

This API call consumes the following media types via the Content-Type request header:

*   `application/json`

### Request body

body [Shop](#Shop) (optional)

Body Parameter — Shop item to add

### Return type

[Shop](#Shop)

### Example data

Content-Type: application/json

    {
      "lng" : 133,
      "natural_key" : "Macelleria del Corso_100_100",
      "facebook" : "https://www.facebook.com/macelleriaMarioRossi",
      "telegram" : "https://www.telegram.com/macelleriaMarioRossi",
      "description" : "Piccola bottega dal 1920",
      "created_at" : "2000-01-23",
      "addess" : "Via Roma 133",
      "is_deleted" : false,
      "updated_at" : "2000-01-23",
      "phone" : "333-5607123",
      "name" : "Macelleria del Corso",
      "id" : 12334,
      "categories" : [ 0, 1, 4 ],
      "lat" : 122
    }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 200

item created [Shop](#Shop)

#### 400

invalid input, object invalid[](#)

#### 409

an existing item already exists[](#)

* * *

[Up](#__Methods)

    get /shops

retrieve all shops (getShops)

Retrieve all available shops

### Query parameters

filter (optional)

Query Parameter — pass an optional search string for looking up name or description Shop

categories\_id (optional)

Query Parameter — pass an optional search string for looking up Shop name or description

### Return type

array\[[Shop](#Shop)\]

### Example data

Content-Type: application/json

    [ {
      "lng" : 133,
      "natural_key" : "Macelleria del Corso_100_100",
      "facebook" : "https://www.facebook.com/macelleriaMarioRossi",
      "telegram" : "https://www.telegram.com/macelleriaMarioRossi",
      "description" : "Piccola bottega dal 1920",
      "created_at" : "2000-01-23",
      "addess" : "Via Roma 133",
      "is_deleted" : false,
      "updated_at" : "2000-01-23",
      "phone" : "333-5607123",
      "name" : "Macelleria del Corso",
      "id" : 12334,
      "categories" : [ 0, 1, 4 ],
      "lat" : 122
    }, {
      "lng" : 133,
      "natural_key" : "Macelleria del Corso_100_100",
      "facebook" : "https://www.facebook.com/macelleriaMarioRossi",
      "telegram" : "https://www.telegram.com/macelleriaMarioRossi",
      "description" : "Piccola bottega dal 1920",
      "created_at" : "2000-01-23",
      "addess" : "Via Roma 133",
      "is_deleted" : false,
      "updated_at" : "2000-01-23",
      "phone" : "333-5607123",
      "name" : "Macelleria del Corso",
      "id" : 12334,
      "categories" : [ 0, 1, 4 ],
      "lat" : 122
    } ]

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 200

search results matching criteria

#### 400

bad input parameter[](#)

* * *

[Up](#__Methods)

    get /shops/{id}

retrieve information of a single Shop (shopsIdGet)

### Path parameters

id (required)

Path Parameter — Numeric ID of the Shop to get

### Return type

[Shop](#Shop)

### Example data

Content-Type: application/json

    {
      "lng" : 133,
      "natural_key" : "Macelleria del Corso_100_100",
      "facebook" : "https://www.facebook.com/macelleriaMarioRossi",
      "telegram" : "https://www.telegram.com/macelleriaMarioRossi",
      "description" : "Piccola bottega dal 1920",
      "created_at" : "2000-01-23",
      "addess" : "Via Roma 133",
      "is_deleted" : false,
      "updated_at" : "2000-01-23",
      "phone" : "333-5607123",
      "name" : "Macelleria del Corso",
      "id" : 12334,
      "categories" : [ 0, 1, 4 ],
      "lat" : 122
    }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

### Responses

#### 200

Item retrieved successfully [Shop](#Shop)

#### 404

Shop not found[](#)

* * *

Models
------

\[ Jump to [Methods](#__Methods) \]

### Table of Contents

1.  [`Category`](#Category)
2.  [`Shop`](#Shop)

### `Category` [Up](#__Models)

id (optional)

[BigDecimal](#BigDecimal)

example: 12334

natural\_key

[String](#string)

example: 1234\_4345

name

[String](#string)

example: Macelleria

### `Shop` [Up](#__Models)

id (optional)

[BigDecimal](#BigDecimal)

example: 12334

natural\_key (optional)

[String](#string)

example: Macelleria del Corso\_100\_100

name

[String](#string)

example: Macelleria del Corso

addess (optional)

[String](#string)

example: Via Roma 133

lat (optional)

[BigDecimal](#BigDecimal)

example: 122

lng (optional)

[BigDecimal](#BigDecimal)

example: 133

phone (optional)

[String](#string)

example: 333-5607123

telegram (optional)

[String](#string)

example: https://www.telegram.com/macelleriaMarioRossi

facebook (optional)

[String](#string)

example: https://www.facebook.com/macelleriaMarioRossi

description

[String](#string)

example: Piccola bottega dal 1920

is\_deleted (optional)

[Boolean](#boolean)

example: false

created\_at (optional)

[date](#date) format: date

updated\_at (optional)

[date](#date) format: date

categories (optional)

[array\[BigDecimal\]](#BigDecimal)

example: \[0,1,4\]