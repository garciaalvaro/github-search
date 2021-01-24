FROM node:13-alpine

# Create app directory that will be the root directory of our project
RUN mkdir -p /app

# Change working directory, any command from now will run in this directory
WORKDIR /app

# Copy package.json
COPY ./package.json .

# Install only production packages
RUN npm install --only=prod

# Copy the other files and folders
COPY . .

# Expose port
EXPOSE 3000

# Run the npm script which will start the pm2 server (Docker version)
# @see https://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/
CMD [ "npm", "run", "serve:docker" ]
