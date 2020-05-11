# garage-door

(Project under development)

A garage door remote control system, that can open/close/freeze the door through a mobile app or physical wall (up & down) pushbuttons(NO or 'normally open').

Features:

- User accounts, authentication & authorization, email verification
- Role assignments & permissions
- Garage door & UI responsiveness via realtime communication & connection/signal status.
- Works locally only, via WLAN (it's a feature, not a bug!)

Fritzing schematic:

![Alt text](fritzing/wiring.png?raw=true "Fritzing Schematic")

Used the following tools:

Hardware:

- raspberry pi zero WH (1x)
- 2 channel relay module (with optocoupler isolation & snubber circuitry, compatible with raspberry pi, the one I use for the project is "active low") (1x)
- A 5v DC power supply in order to use the relay optocoupler isolation (for safety reasons!) (1x)
- Magnetic reed switches (future implementation) (2x)

Software stack & tools:

- HTML/CSS/JS & React, Node.js, Express.js (REST API), socket.io, lowdb (JSON DB), Sendgrid API

TODO:

- HTTPS (self-signed cert)
- Add laser beam switches with reflector (stops & reverses the door when interrupted, for safety reasons)

DISCLAIMER: This project is experimental. Use on your own risk. Electricity can be fatal, so consult a certified electrician.
