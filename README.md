# garage-door

A garage door remote control system, that can open/close/freeze the door through a mobile app or physical wall (up & down) pushbuttons(NO or 'normally open').

Fritzing schematic:

![alt text](https://raw.githubusercontent.com/evzaboun/garage-door/master/fritzing/wiring.png)

Used the following tools:

Hardware:

- raspberry pi zero WH (1x)
- 2 channel relay module (with optocoupler isolation & snubber circuitry, compatible with raspberry pi) (1x)
- A 5v DC power supply in order to use the relay optocoupler isolation (for safety reasons!) (1x)
- Magnetic reed switches (future implementation) (2x)

Software stack & tools:
HTML/CSS/JS
NodeJS & expressJS
websocket

PS. Photos coming soon!

TODO:

- HTTPS (self singed cert & installable PWA)
- User auth
- Add laser beam switches with reflector (stops & reverses the door when interrupted, for safety reasons)
