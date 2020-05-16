# garage-door

Project under development.
READ DISCLAIMER ON THE BOTTOM

And safety concerns here:

https://news.ycombinator.com/item?id=23174493

A garage door remote control system, that can open / close / freeze the door through a mobile app or physical wall (up & down) pushbuttons (NO or 'normally open').

A breadboard prototype

![Garage door breadboard prototype](fritzing/prototype.gif)

## Features

- User accounts, authentication & authorization, email verification
- Role assignments & permissions
- Garage door & UI responsiveness via realtime communication & connection/signal status.
- Works locally only, via WLAN (it's a feature, not a bug!)

## Installation instructions

```bash
$ git clone https://github.com/evzaboun/garage-door.git

$ cd garage-door

$ npm install

$ cd client

$ npm install

$ cd ..

```

## Setting the environment variables

```bash
$ touch .env

$ nano .env
```

Add the following

```bash
NODE_ENV=development
PORT=5000
IP = "192.168.1.250"
HOSTNAME = `${os.hostname() + ".local"}`
JWT_KEY = "SetYourJWTKeyHere"  # Can be any string as your secret
SENDGRID_API_KEY = "YourSendgridAPIKey" # Used for user email verification
SENDGRID_FROM_EMAIL = "yourVerifiedSendgridSenderEmail@example.com"
REGISTER_LINK = "http://YourRaspberryPiIP:AndPort/activate"
```

Save the .env file, and run:

```bash
$ npm run dev
```

## Used the following tools

### Hardware

- Raspberry Pi Zero WH (1x)
- 2 channel relay module (with optocoupler isolation & snubber circuitry, compatible with raspberry pi, the one I use for the project is "active low") (1x)
- A 5v DC power supply in order to use the relay optocoupler isolation (for safety reasons!) (1x)
- Magnetic reed switches (future implementation) (2x)

### Software stack & tools

#### Server

Node.js, Express.js (REST API), socket.io, lowdb (JSON DB), Sendgrid API

#### Client

HTML/CSS/JS & React & Material UI, socket.io

## TODO

- Simplify wiring (utilizing built in raspberry pi's pull up resistors)
- HTTPS (self-signed cert)
- Add laser beam switches with reflector (stops & reverses the door when interrupted, for safety reasons)

# DISCLAIMER

## USE SOLELY ON YOUR OWN RISK. ELECTRICITY CAN BE FATAL, SO CONSULT A CERTIFIED PROFESSIONAL.

I am not a certified electrician, and this project does not meet any [CPSC or any other security / safety regulations & standards](https://www.cpsc.gov/Regulations-Laws--Standards/Voluntary-S).
This project is experimental.

# Licence

MIT
