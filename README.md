# garage-door

A garage door remote control system, that can open/close/freeze the door through a mobile app or physical wall (up & down) pushbuttons(NO or 'normally open').

Used the following tools:

Hardware:

- raspberry pi zero WH (1x)
- 2 channel relay module (with optocoupler isolation) (1x)
- A 5v DC power supply in order to use the relay optocoupler isolation (for safety reasons!) (1x)
- Magnetic reed switches (future implementation) (2x)

Software stack & tools:
HTML/CSS/JS
NodeJS & express
websocket

PS. Photos coming soon!

TODO:

- Make the html page a browser installable PWA
- User auth & HTTPS
- Add laser beam switches with reflector (stops the door when interrupted, for safety reasons)
