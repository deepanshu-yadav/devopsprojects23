# Use an official Node.js runtime as a parent image
FROM node:14
ARG STATE
# Set the working directory in the container
WORKDIR /usr/src/app

# Clone the Git repository
RUN git clone https://github.com/deepanshu-yadav/devopsprojects23.git .

RUN sed -i "s/DEVELOPMENT/${STATE}/g" ./configure.js

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Wait for MongoDB to be ready before starting the app
CMD [ "npm", "start"]