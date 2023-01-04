### Log in
###
* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        "username": str,
        "password": str,
      },
      "token": string
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


### Sign up
###
* Endpoint path: /signup
* Endpoint method: POST

* Request shape (form):
    ```json
        {
        "account": [
            {
            "username": str,
            "password": str,
            }
        ]
        }
        ```
* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        "username": str,
        "password": str,
      }
    }
    ```


<!-- ### Register
###
* Endpoint path: /register
* Endpoint method: POST

* Request shape (form):
  * character: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        "username": str,
        "password": str,
      }
    }
    ``` -->


### GET LIST Campaigns
###
* Endpoint path: /campaigns
* Endpoint method: GET
* Table: users, campaigns

* Headers:
  * Authorization: Bearer token

*Request
username

* Response shape (JSON):
    ```json
    {
      "campaigns": [
        {
          "title": string,
        }
      ]
    }
    ```

### GET Campaign
* Endpoint path: /campaigns/{campaign_id}
* Endpoint method: GET
* Table: campaigns

* Headers:
  * Authorization: Bearer token

*Request
    ```json
    {
      "campaign":
        {
          "id": int,
        }
    }
    ```

* Response shape (JSON):
    ```json
    {
      "campaign":
        { "id": int,
          "title": string,
          "genre": string,
          "description": string,
          "rulebook": string,
          "contact": string,
          "cleanup_duties": string,
          "npc_shifts": string,
          "roles": string,
          "characters": string,
          "events": string
        }
    }
    ```

### CREATE Campaign
* Endpoint path: /campaigns/
* Endpoint method: POST
* Table: users, campaigns

* Headers:
  * Authorization: Bearer token

*Request
    ```json
    {
      "campaign":
        { "title": string,
          "genre": string,
          "description": string,
          "rulebook": string,
          "contact": string,
          "cleanup_duties": string,
          "npc_shifts": string,
          "roles": string,
          "characters": string,
          "events": string
        }
    }
    ```

* Response shape (JSON):
    ```json
    {
      "campaign":
        { "id": int,
          "title": string,
          "genre": string,
          "description": string,
          "rulebook": string,
          "contact": string,
          "cleanup_duties": string,
          "npc_shifts": string,
          "roles": string,
          "characters": string,
          "events": string
        }
    }
    ```

### UPDATE Campaign
* Endpoint path: /campaigns/{campaign_id}
* Endpoint method: PUT
* Table: campaigns

* Headers:
  * Authorization: Bearer token

*Request
    ```json
    {
      "campaigns": [
        { "title": string,
          "genre": string,
          "description": string,
          "rulebook": string,
          "contact": string,
          "cleanup_duties": string,
          "npc_shifts": string,
          "roles": string,
          "characters": string,
          "events": string
        }
      ]
    }
    ```

* Response shape (JSON):
    ```json
    {
      "campaign":
        { "id": int,
          "title": string,
          "genre": string,
          "description": string,
          "rulebook": string,
          "contact": string,
          "cleanup_duties": string,
          "npc_shifts": string,
          "roles": string,
          "characters": string,
          "events": string
        }
    }
    ```

### DELETE Campaign
* Endpoint path: /campaigns/{campaign_id}
* Endpoint method: DEL
* Table: campaigns

* Headers:
  * Authorization: Bearer token

*Request


* Response shape (JSON):
    True


### GET LIST Events
###
* Endpoint path: /events
* Endpoint method: GET
* Table: users, events

* Headers:
  * Authorization: Bearer token

*Request
username

* Response shape (JSON):
    ```json
    {
      "events": [
        {
          "title": string,
        }
      ]
    }
    ```

### GET Event
* Endpoint path: /events/{event_id}
* Endpoint method: GET
* Table: events

* Headers:
  * Authorization: Bearer token

*Request
    ```json
    {
      "event":
        {
          "id": int,
        }
    }
    ```

* Response shape (JSON):
    ```json
    {
      "event":
        { "id": int,
          "campaign": string,
          "eventname": string,
          "venuename": string,
          "address": string,
          "date": string,
          "participants": [],
        }
    }
    ```

### CREATE Event
* Endpoint path: /events/
* Endpoint method: POST
* Table: users, events

* Headers:
  * Authorization: Bearer token

*Request
    ```json
    {
      "event":
        { "campaign": string,
          "eventname": string,
          "venuename": string,
          "address": string,
          "date": string,
          "participants": [],
        }
    }
    ```

* Response shape (JSON):
    ```json
    {
      "event":
        { "id": int,
          "campaign": string,
          "eventname": string,
          "venuename": string,
          "address": string,
          "date": string,
          "participants": [],
        }
    }
    ```


### UPDATE Event
* Endpoint path: /events/{event_id}
* Endpoint method: PUT
* Table: events

* Headers:
  * Authorization: Bearer token

*Request
    ```json
    {
      "event":
        { "campaign": string,
          "eventname": string,
          "venuename": string,
          "address": string,
          "date": string,
          "participants": [],
        }
    }
    ```

* Response shape (JSON):
    ```json
    {
      "event":
        { "id": int,
          "campaign": string,
          "eventname": string,
          "venuename": string,
          "address": string,
          "date": string,
          "participants": [],
        }
    }
    ```

### DELETE Event
* Endpoint path: /events/{event_id}
* Endpoint method: DEL
* Table: events

* Headers:
  * Authorization: Bearer token

*Request


* Response shape (JSON):
    True

###
