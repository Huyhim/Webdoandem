# fast-food-api v0.0.0



- [SanPham](#sanpham)
	- [Create san pham](#create-san-pham)
	- [Delete san pham](#delete-san-pham)
	- [Retrieve san pham](#retrieve-san-pham)
	- [Retrieve san phams](#retrieve-san-phams)
	- [Update san pham](#update-san-pham)
	


# SanPham

## Create san pham



	POST /san-phams


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>San pham's name.</p>							|
| hot			| 			|  <p>San pham's hot.</p>							|
| image			| 			|  <p>San pham's image.</p>							|
| price			| 			|  <p>San pham's price.</p>							|
| status			| 			|  <p>San pham's status.</p>							|
| description			| 			|  <p>San pham's description.</p>							|
| type			| 			|  <p>San pham's type.</p>							|
| size			| 			|  <p>San pham's size.</p>							|

## Delete san pham



	DELETE /san-phams/:id


## Retrieve san pham



	GET /san-phams/:id


## Retrieve san phams



	GET /san-phams


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update san pham



	PUT /san-phams/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>San pham's name.</p>							|
| hot			| 			|  <p>San pham's hot.</p>							|
| image			| 			|  <p>San pham's image.</p>							|
| price			| 			|  <p>San pham's price.</p>							|
| status			| 			|  <p>San pham's status.</p>							|
| description			| 			|  <p>San pham's description.</p>							|
| type			| 			|  <p>San pham's type.</p>							|
| size			| 			|  <p>San pham's size.</p>							|


