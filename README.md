## Installing a Private NPM Package

This has a private npm package installed.

To install this package, you will need to point to the private registry.

Create a `.npmrc` file with this content:

```plaintext
//npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
@robotics-88:registry=https://npm.pkg.github.com
```

Replace `YOUR_PERSONAL_ACCESS_TOKEN` with a token generated through your GitHub account.

**Remember to add `.npmrc` to your `.gitignore` file.**

# Using Pacemaker

Make sure you follow the steps above to sucessfully install all the necessary deps

If you haven't added your user to the Docker group and still need 'sudo' to run Docker commands,
the automated creation of containers will be an issue

1. create the Docker group (if it doesn't already exist)

```bash
sudo groupadd docker
```

2. add your user to the Docker group

```bash
sudo usermod -aG docker $USER
```

3. apply the new group membership

```bash
newgrp docker
```

4. you can verify that it worked by running
```bash
docker run hello-world
```

Once permissions are established

First you need to build the Docker image for the necessary container template

run 
```bash
npm build-image
```

Then start the app:

run 
```bash
npm start
```

this will start the server at port 3000.  

Each time you start a virtual drone, it will start a container running mapversation and fake-heartbeat.  For now, ROS needs to be running on the local machine

The drone names are hard coded in, but you need a .env file for pacemaker that includes:

WEBSOCKET_URL

and then any drone passwords in the following format:

DRONE_PASSWORD_*name of the drone*
ex: DRONE_PASSWORD_rosy-maple


To shutdown send the shutdown signal in the terminal

```bash
^C
```

It may take a moment because it will automatically shutdown any running containers --

**Don't send multiple shutdown signals as it may cut this process short**


