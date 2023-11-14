# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Clone the Git repository
RUN git clone https://github.com/deepanshu-yadav/devopsprojects23.git .

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable for MongoDB connection string
ENV MONGO_DB_CONNECTION_STRING=mongodb://mongo:27017/your_database_name

# Wait for MongoDB to be ready before starting the app
CMD ["./wait-for-mongo.sh", "mongod", "--fork", "--logpath", "/var/log/mongodb.log", "&&", "npm", "start"]