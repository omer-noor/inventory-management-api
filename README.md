# Readme

You will need node installed on your computer for this application
### If packages are not configured properly when you clone
>npm install express mysql cors --save
### Overview
This is a CRUD API built using Node+Express and mySQL running on port 8080 on Localhost.

The database itself is an external mySQL database hosted on Azure, no setup needed

I  have implemented the functionality to **filter inventory** items by name, description, price, and count.

# Endpoints

## Post
>localhost:8080/api/inventory/

## Get

### To get all items: 

>localhost:8080/api/inventory/

### Can also get by item ID:

>localhost:8080/api/inventory/:id

### Filter by name:

>localhost:8080/api/inventory/filter?name=

### Filter by description matching string:

>localhost:8080/api/inventory/filter?description=

### Filter by cost or price

>localhost:8080/api/inventory/filter?cost=

>localhost:8080/api/inventory/filter?price=


## Put

Update a inventory item by ID

>localhost:8080/api/inventory/:id

## Delete

>localhost:8080/api/inventory/:id






