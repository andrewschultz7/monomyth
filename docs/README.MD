**Team 9** | Andrew, Patrick, Nate, Sean and Brian <br />

# Monomyth
The app for larping. For game masters, Monomyth streamlines the creation and management of campaigns and events. For game players, it allows for fast and easy character creation and event registration. <br />


## Table of Contents

Project services<br />
Users microservice<br />
Campaigns microservice<br />
React components<br />
Deployment<br />
Application diagram<br />
API documentation<br />
<br />


## Project Services
- **React** binds to port "3000:3000"<br />
Open [http://localhost:3000] to view the React frontend.<br />
- **Users-API** binds to port "8000:8000"<br />
Open [http://localhost:8000] to access the Users backend.<br />
- **Campaigns-API** binds to port "8001:8000"<br />
Open [http://localhost:8001] to access the Campaign backend.<br />
- **pgAdmin** binds to port "8082:80"<br />
pgAdmin is the project's management tool for the database.<br />
- The database is **postgres**, which binds to port "15432:5432".<br />


## Users microservice

**User model**<br />
This model represents a user of the project. It tracks their user id number, email, and password.<br />


## Campaigns microservice

**Campaign model**<br />
This model represents a larp. It tracks the larp's id number, title, genre, description, a url for the rulebook, an email for the gamemaster, and the user id number of the gamemaster.<br />

**Event model**<br />
This model represents an event of a larp. Larp campaigns are composed of their events. The model tracks the event's id number, name, venue, address, date, and the associated larp's campaign id number.<br />

**Participant model**<br />
This model represents a user's character at the larp. Participants can sign up for events. The model tracks their participant id number, the user's id number, their character's name, the id number of the campaign, and the event id of the event they are registered to attend (if any).<br />


## React components

**SignUpForm**<br />
Form | User enters their email and password. On submit the field data is posted to User API and a token is created for the current User, logging them in. <br />

**Login**<br />
Form | User enters their email and password. On submit, a token is created for the current User, logging them in.  <br />

**Logout**<br />
Deletes token for the current User. <br />

**UserDetail**<br />
Displays the email of the currently logged in user. <br />

**CampaignForm**<br />
Form | User enters title, genre, description, campaign_email, and rulebook. On submit, the field data is posted to Campaign API and gamemaster_id is set to user_id for the current User. <br />

**CampaignEdit**<br />
Form | Only accessible if logged in user's user_id equals Campaign.gamemaster_id. User can update title, genre, description, campaign email, and/or rulebook. On submit, the field data is put to Campaign API. <br />

**CampaignList**<br />
Gets all Campaigns and displays each one's title, genre, description, campaign email, and rulebook.<br />

!!! **CampaignDetail**<br />
Description of component.<br />

**EventForm**<br />
Form | Only accessible if logged in user's user_id equals Campaign.gamemaster_id. User enters eventname, venuename, address, participants, and date. On submit, the field data is posted to Campaign API and campaign_id is set to the campaign_id of the associated Campaign.<br />

**EventEdit**<br />
Form | Only accessible if logged in user's user_id equals Campaign.gamemaster_id. User can update eventname, venuename, address, participants, and/or date. On submit, the field data is put to Campaign API. <br />

**EventList**<br />
Gets all Events and displays each one's eventname, venuename, address, participants, date, and campaign_id.<br />

!!! **EventDetail**<br />
Description of component.<br />

**ParticipantForm**<br />
Form | User enters a character name. On submit, that name, event_id, campaign_id, and user_id is posted to Campaign API.<br />

**ParticipantList**<br />
Gets all Participants for an Event and displays each one's participant_id and character.<br />


## How to run this application

1. Fork or clone the project from https://gitlab.com/monomyth1/monomyth <br />
2. Build volumes in docker:
    ```
    docker volume create postgres-data
    docker volume create pg-admin
    ```
3. Build services based on the docker-compose.yml:
    ```
    docker-compose build
    ```
4. Bring up all services:
    ```
    docker-compose up
    ```
<br />

## How to rebuild the database <br />

1. Stop and remove all running containers:
    ```
    docker-compose down
    ```
2. Remove the images:
    ```
    docker image prune -a
    ```
3. Remove the volumes:
    ```
    docker volume rm postgres-data
    docker volume rm pg-admin
    ```
4. Rebuild the volumes:
    ```
    docker volume create postgres-data
    docker volume create pg-admin
    ```
5. Bring up services again:
    ```
    docker-compose up
    ```
<br />

## Application Diagram
<br />
![Diagram](monomyth_diagram.png)
<br />

## API Call Documentation

**SYNTAX**<br />
name | method | url endpoint
    description<br />


**USERS API**<br />

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
