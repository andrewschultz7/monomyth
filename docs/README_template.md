# CarCar
[TOC]
Carcar is an application for running a car dealership / auto service business. The project has three backend microservices: **Inventory**, **Service**, and **Sales**.<br />

-The Inventory models are Manufacturer, Vehicle Model, and Automobile.<br />
-The Service models are Technician and Appointment.<br />
-The Sales models are Sale, SalesPerson, and SalesCustomer.<br />
<br />

**Team**<br />
* Chengyun - Services<br />
* Brian - Sales<br />

## Project Services
- **React** binds to port "3000:3000"<br />
Open [http://localhost:3000] to view the React frontend.<br />
- **Inventory-API** binds to port "8100:8000"<br />
Open [http://localhost:8100] to access Inventory: Manufacturer, Vehicles Models, and Automobiles.<br />
- **Services-API** binds to port "8080:8000"<br />
Open [http://localhost:8080] to access Services.<br />
- **Sales-API** binds to port "8090:8000"<br />
Open [http://localhost:8090] to access Sales.<br />
- The **Database** is **postgres**, which binds to port "15432:5432".<br />


## Value Objects

**SERVICE**<br />
AutomobileVO: Polling data from Inverntory, using update_or_create function.<br />
Model fields are: color, year, vin, sold, and import_href.<br />

**SALES**<br />
AutomobileVO: Polling data from Inverntory, using update_or_create function.<br />
Model fields are: color, year, vin, sold, model, and import_href.<br />
<br />

## Service microservice
Service-API is built on port 8080. It talks with the Inventory-API and the databse.<br />

To clarify, we build a poller to gather the info from the Inventory-API and make the corresponsing AutomobileVO model. <br />

**AutomobileVO**<br />
AutomobileVO as described will collect five major inputs through the poller:<br />
- color<br />
Input type: string (max length: 50 digits)<br />
- year<br />
Input type: positive integer<br />
- vin<br />
Input type: string (max length: 17 digits); unique<br />
- sold<br />
Input type: boolean value(default setting : False)<br />
- import_href<br />
Input type: string (max length: 200 digits); unique<br />

Also, we built Technican and Appointment model.<br />

**Technician**<br />
To create a new item (technician) need two major inputs:<br />
- tech_name<br />
Input type: string<br />
- tech_id<br />
Input type: positive integer<br />

**Appointment**<br />
To create a new item (Appointment) need five major inputs:<br />
- vin<br />
Input type: string (max length: 17 digits)<br />
- customer_name<br />
Input type: string (max length: 100 digits)<br />
- date<br />
Input type: date iso-format (YYYY-MM-DD)<br />
- time<br />
Input type: time iso-format (18:50:00)<br />
- reason<br />
Input type: string (max length: 300 digits)<br />
- technician<br />
Input type: positive interger<br />
<br />
(Optional) Appointment also takes following two optional inputs<br />
<br />
- vip<br />
Input type: boolean value(default setting: False)<br />
- finished<br />
Input type: boolean value(default setting: False)<br />
<br />

## Sales microservice

This microservice also uses a poller to generate an AutomobileVO from a call to the Inventory microservice. The Sales AutomobileVO is nearly identical to that found in the Service microservice, adding a model field.<br />

**SalesPerson**<br />
This model tracks a salesperson's name and employee number.<br />

**SalesCustomer**<br />
This model tracks a potential customer's name, address, and phone number.<br />

**Sale**<br />
This model tracks a sale's price, the sold car's VIN, the sales person, and the customer. When a car is sold, it is no longer displayed in the list of Automobiles in Inventory and it cannot be sold again.<br />
<br />

## How to Run this Application

1. Fork or clone the project form https://gitlab.com/Jalaketu01/project-beta.git:
    ```
    git clone https://gitlab.com/Jalaketu01/project-beta.git
    ```
2. Build the database in docker:
    ```
    docker volume create beta-data
    ```
3. Build services based on the docker-compose.yml:
    ```
    docker-compose build
    ```
4. Bring up all services:
    ```
    docker-compose up
    ```
It takes longer to build the images and estabilsh the React service the first time. After all services are built and connections estabilshed, you should have 7/7 containers running for the project.<br />
<br />

## How to rebuild the database
**Make sure you have backed up important information before performing following steps.**<br />

1. Stop all running containers.<br />
2. Remove un-used container(s):
    ```
    docker container prune -f
    ```
3. Remove the associated database:
    ```
    docker volume rm beta-data
    ```
4. Rebuild the database:
    ```
    docker volume create beta-data
    ```
5. Bring up services again:
    ```
    docker-compose up
    ```
After performing above steps, you will need to create a superuser again.<br />
<br />

## Application Diagram
<br />
![Diagram](project-beta-diagram.png)
<br />

## API Call Documentation

**SYNTAX**<br />
name | method | url endpoint
    description<br />


**INVENTORY API**<br />

**List Manufacturers** | GET | http://localhost:8100/api/manufacturers/<br />
```
{
	"manufacturers": [
		{
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "BMW"
		},
		{
			"href": "/api/manufacturers/2/",
			"id": 2,
			"name": "Acura"
		}
	]
}
```
<br />

**Create Manufacturer** | POST | http://localhost:8100/api/manufacturers/<br />
    Creating and updating a manufacturer requires only the manufacturer's name:<br />
```
        {
            "name": "Chrysler"
        }
```
<br />

The return value of creating, getting, and updating a single manufacturer is its name, href, and id:<br />
```
        {
            "href": "/api/manufacturers/1/",
            "id": 1,
            "name": "Chrysler"
        }
```
<br />

**List Models** | GET | http://localhost:8100/api/models/<br />
```
        {
         	"models": [
         		{
         			"href": "/api/models/1/",
         			"id": 1,
         			"name": "X1",
         			"picture_url": "https://cdn.jdpower.com/JDPA_2020%20BMW%20X1%20Gray%20Front%20View.jpg",
         			"manufacturer": {
         				"href": "/api/manufacturers/1/",
         				"id": 1,
         				"name": "BMW"
         			}
         		},
         		{
         			"href": "/api/models/2/",
         			"id": 2,
         			"name": "2022 TLX",
         			"picture_url": "https://hips.hearstapps.com/hmg-prod/images/2021-acura-tlx-type-s-105-1621460910.jpg",
         			"manufacturer": {
         				"href": "/api/manufacturers/2/",
         				"id": 2,
         				"name": "Acura"
         			}
         		}
         	]
        }
```
<br />

**Show Model Detail** | GET | http://localhost:8100/api/models/:id/<br />
    Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information:<br />
```
        {
            "href": "/api/models/1/",
            "id": 1,
            "name": "Sebring",
            "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
            "manufacturer": {
                "href": "/api/manufacturers/1/",
                "id": 1,
                "name": "Daimler-Chrysler"
            }
        }
```
<br />

**Create Model** | POST | http://localhost:8100/api/models/<br />
    Creating and updating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer:<br />
```
        {
            "name": "Sebring",
            "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
            "manufacturer_id": 1
        }
```
<br />

**List Automobiles** | GET | http://localhost:8100/api/automobiles/<br />
```
        {
         	"autos": [
         		{
         			"href": "/api/automobiles/1C3CC5FB2AN120174/",
         			"id": 1,
         			"color": "red",
         			"year": 2012,
         			"vin": "1C3CC5FB2AN120174",
         			"model": {
         				"href": "/api/models/1/",
         				"id": 1,
         				"name": "X1",
         				"picture_url": "https://cdn.jdpower.com/JDPA_2020%20BMW%20X1%20Gray%20Front%20View.jpg",
         				"manufacturer": {
         					"href": "/api/manufacturers/1/",
         					"id": 1,
         					"name": "BMW"
         				}
         			},
         			"sold": false
         		}
             ]
        }
```
<br />

**Show Automobile Detail** | GET | http://localhost:8100/api/automobiles/:vin/<br />
    You can query an automobile by its VIN. The details for an automobile include its model and manufacturer:<br />
```
        {
            "href": "/api/automobiles/1C3CC5FB2AN120174/",
            "id": 1,
            "color": "yellow",
            "year": 2013,
            "vin": "1C3CC5FB2AN120174",
            "model": {
                "href": "/api/models/1/",
                "id": 1,
                "name": "Sebring",
                "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                "manufacturer": {
                "href": "/api/manufacturers/1/",
                "id": 1,
                "name": "Daimler-Chrysler"
                }
            "sold": False
            }
        }
```
<br />

**Update Automobile** | PUT | http://localhost:8100/api/automobiles/:vin/<br />
    You can update the color, sold, and/or year of an automobile:<br />
```
        {
            "sold: True
        }
```
<br />

**Create Automobile** | POST | http://localhost:8100/api/automobiles/<br />
    You can create an automobile with its color, year, VIN, and the id of the vehicle model:<br />
```
        {
            "color": "red",
            "year": 2012,
            "vin": "1C3CC5FB2AN120174",
            "model_id": 1
        }
```
<br />

**SERVICE API**<br />

**List Technicians** | GET | http://localhost:8080/api/technicians/<br />
-Get info of all technicians<br />
<br />
```
{
	"technicians": [
		{
			"tech_name": "Chengyun",
			"tech_id": 1
		},
		{
			"tech_name": "Gia",
			"tech_id": 2
		}
	]
}
```
<br />

**Show Technician Detail** | GET | http://localhost:8080/api/technicians/:id/<br />
-Get info of one specific technicians<br />

**Create Technician** | POST | http://localhost:8080/api/technicians/<br />
-Add a new technicians<br />
Example of input:<br />

```
{
  "tech_name": "Gia",
  "tech_id":1
}
```

**List Appointments** | GET | http://localhost:8080/api/appointments/<br />
-Get info of all appointments<br />
<br />
Example:
```
{
	"appointments": [
		{
			"customer_name": "Fista",
			"date": "2022-12-30",
			"time": "15:20:00",
			"technician": "Gia",
			"reason": "30K Tune up",
			"vip": true,
			"finished": false,
			"id": 4,
			"vin": "2T1KU4EE0EC130768"
		},
		{
			"customer_name": "King",
			"date": "2022-12-25",
			"time": "12:00:00",
			"technician": "Chengyun",
			"reason": "VIP Tune-Up Services",
			"vip": true,
			"finished": false,
			"id": 3,
			"vin": "1N6ED29X03C442198"
		}
	]
}
```
<br />

**Show Appointment Detail** | GET | http://localhost:8080/api/appointments/:id/<br />
-Get info of one specific appointment<br />
```
{
	"customer_name": "Karen",
	"date": "2022-12-10",
	"time": "18:50:00",
	"reason": "Fix the door and window",
	"vip": true,
	"finished": false,
	"id": 1,
	"technician": {
		"tech_name": "Chengyun",
		"tech_id": 1
	}
}
```
<br />

**Delete Appointment** | DELETE | http://localhost:8080/api/appointments/:id/<br />
-Delete one specific appointment<br />

**Update Appointment** | PUT | http://localhost:8080/api/appointments/:id/<br />
-Update one specific appointment<br />
```
{
		"reason": "Fix the door and window",
		"vip": true,
		"finished": false,
		"id": 1
}
```
<br />

**Create Appointment** | POST | http://localhost:8080/api/appointments/<br />
-Create a new appointment<br />
Example input to create a new appointment:<br />

```
{
  "vin": "1C3CC5FB2AN120174",
  "customer_name": "Roger",
  "date": "2022-12-07",
  "time": "10",
  "reason": "windows",
  "technician":1
}
```
<br />

**SALES API**

**List SalesPersons** | GET | http://localhost:8090/api/salesperson/<br />
    Returns a dictionary with the key "salespersons" set to a list of salespersons:<br />
```
        {
            "salespersons": [
                {
                    "href": "/api/salesperson/1/",
                    "id": 1
                    "name": "Sarah",
                    "employee_number": 01
                },
                {
                    "href": "/api/salesperson/7/",
                    "id": 7
                    "name": "Lucy",
                    "employee_number": 666
                }
            ]
        }
```
<br />

**Create SalesPerson** | POST | http://localhost:8090/api/salesperson/<br />
    You can create a salesperson with their name and employee number. Both name and employee number must be unique:<br />
```
        {
            "name": "Fred",
            "employee_number": 85523492
        }
```
<br />

The return value from creating a salesperson is the salesperson's information:<br />
```
        {
            "href": "/api/salesperson/1/",
            "id": 1
            "name": "Sarah",
            "employee_number": 01
        }
```
<br />

**List SalesCustomers** | GET | http://localhost:8090/api/salescustomer/<br />
    Returns a dictionary with the key "salescustomers" set to a list of salescustomers:<br />
```
        {
            "salescustomers": [
                {
                    "href": "/api/salescustomer/1/",
                    "id": 1,
                    "name": "Tim Dillon",
                    "address": "15 Jefferys Ln, East Hampton, NY 11937",
                    "phone": 5166767023
                },
                {
                    "href": "/api/salescustomer/2/",
                    "id": 2,
                    "name": "Whitney Cummings",
                    "address": "15 Jefferys Ln, East Hampton, NY 11937",
                    "phone": 8886907722
                }
            ]
        }
```
<br />

**Create SalesCustomer** | POST | http://localhost:8090/api/salescustomer/<br />
    You can create a dealership customer with their name, address, and a phone number:<br />
```
        {
            "name": "Seth Romatelli",
            "address": "4031 W 3rd St, Los Angeles, CA 90020",
            "phone": 8888422357
        }
```
<br />

The return value from creating a customer is the customer's information:<br />
```
        {
            "href": "/api/salescustomer/1/",
            "id": 1,
            "name": "Tim Dillon",
            "address": "15 Jefferys Ln, East Hampton, NY 11937",
            "phone": 5166767023
        }
```
<br />

**List Sales** | GET | http://localhost:8090/api/sale/<br />
    Returns a dictionary with the key "sales" set to a list of sales:<br />
```
        {
            "sales": [
                {
                    "href": "/api/sale/1/",
                    "id": 1,
                    "price": 15000,
                    "automobile": {
                            "vin": "1NXBR32EX6Z642067"
                        }
                    "salesperson": {
                            "href": "/api/salesperson/15/",
                            "id": 15,
                            "name": "Lauren"
                        }
                    "salescustomer": {
                            "href": "/api/salescustomer/1000/",
                            "id": 1000,
                            "name": "Seth Romatelli"
                        }
                    }
                },
                {
                    "href": "/api/sale/2/",
                    "id": 2,
                    "price": 42069,
                    "automobile": {
                            "vin": "1D7HA18DX4J256410"
                        }
                    "salesperson": {
                            "href": "/api/salesperson/1/",
                            "id": 1,
                            "name": "Sarah"
                        }
                    "salescustomer": {
                            "href": "/api/salescustomer/33/",
                            "id": 33,
                            "name": "Steven Kenneth Bonnell II"
                        }
                    }
                }
            ]
        }
```
<br />

**Create Sale** | POST | http://localhost:8090/api/sale/<br />
You can create a sale with its price, automobile vin, salesperson's name and salescustomer's name:<br />
```
        {
            "price": 54321
            "vin": "1GNFG65R121111791"
            "salesperson": "Lucy"
            "salescustomer": "Jonathan Larroquette"
        }
```
<br />

The return value from creating a sale is the sale's information:<br />
```
        {
            "href": "/api/sale/2/",
            "id": 2,
            "price": 42069,
            "automobile": {
                    "vin": "1D7HA18DX4J256410"
                }
            "salesperson": {
                    "href": "/api/salesperson/1/",
                    "id": 1,
                    "name": "Sarah"
                }
            "salescustomer": {
                    "href": "/api/salescustomer/33/",
                    "id": 33,
                    "name": "Steven Kenneth Bonnell II"
                }
        }
```
<br />
