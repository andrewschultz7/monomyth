USER | This represents the user of the application.
- user_id | int | unique, generated on POST | Primary key.
- username | str | unique | Business key.
- password | str | This is used to sign up and sign in.
- campaigns | dict | default is empty | This is used to track which Campaigns (keys) and roles (values) the User is associated with.


CAMPAIGN | This represents a whole storyline. Campaigns are composed of their Events - similar to how a tv show (Campaign) is composed of its episodes (Events).
- campaign_id | int | unique, generated on POST | Primary key.
- title | str | unique | Business key.
- genre | str | A short string.
- description | str | A long string.
- rulebook | str | URL link. (Use reminder text in form)
- campaign_email | str | An email. (Use reminder text in form)
- roles | dict | default contains only gamemaster | This is used to track which Users (keys) and roles (values) the Campaign is associated with.
- characters | dict | default is empty | This is used to track which Users (keys) and characters (values) the Campaign is associated with.
- events | dict | default is empty | This is used to track which Events (keys) and dates (values) the Campaign is associated with.


PARTICIPANT | This represents a person signing up their character to attend an Event.
- participant_id | int | unique, generated on POST | Primary key.
- character | str | unique | Business key.
- username | str | The username of the user for the character.


EVENT | This represents a block of time when the Campaign is played. Campaigns are composed of their Events - similar to how a tv show (Campaign) is composed of its episodes (Events).
- event_id | int | unique, generated on POST | Primary key.
- eventname | str | unique | Business key.
- campaign | The title of the Campaign the Event is associated with.
- venuename | str | A string.
- address | str | A string.
- date | datetime.time | A year, date, and time.
- participants | list | A list of Participant characters for the Event.
