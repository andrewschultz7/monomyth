## User microservice

USER | This represents the user of the application.
- user_id | int | unique, generated on POST | Primary key.
- username | str | unique | Business key.
- password | str | This is used to sign up and sign in.
- campaigns | dict | default is empty | This is used to track which Campaign titles (keys) and characters (values) the User is associated with. If the user is a gamemaster of a Campaign, the value will be "gamemaster", instead of a character.


## Campaign microservice

CAMPAIGN | This represents a whole storyline. Campaigns are composed of their Events - similar to how a tv show (Campaign) is composed of its episodes (Events).
- campaign_id | int | unique, generated on POST | Primary key.
- title | str | unique | Business key.
- genre | str | A short string.
- description | str | A long string.
- rulebook | str | URL link. (Use reminder in form)
- campaign_email | str | An email. (Use reminder in form)
- users | dict | default contains only gamemaster | This is used to track which Users (keys) and characters (values) the Campaign is associated with. The first entry's value is "gamemaster", instead of a character.


EVENT | This represents a block of time when the Campaign is played. Campaigns are composed of their Events - similar to how a tv show (Campaign) is composed of its episodes (Events).
- event_id | int | unique, generated on POST | Primary key.
- eventname | str | unique | Business key.
- venuename | str | A string.
- address | str | A string.
- date | datetime.time | A year, date, and time.
- participants | list | A list of Participant characters for the Event.
- campaign | int | ForeignKey to Campaign.


PARTICIPANT | This represents a person signing up their character to attend an Event.
- participant_id | int | unique, generated on POST | Primary key.
- character | str | unique | Business key.
- username | str | The username of the user for the character.
- event | int | ForeignKey to Event.
