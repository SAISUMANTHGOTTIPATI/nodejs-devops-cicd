# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dotenv for managing environment variables locally
# This step is optional if you are setting environment variables directly in the container
COPY package*.json ./

RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

RUN npm install

RUN npm install express mysql axios dotenv 

COPY wait-for-mysql.sh /usr/wait-for-mysql.sh
RUN chmod +x /usr/wait-for-mysql.sh

# Copy the rest of the application code to the working directory
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define the command to run the app
CMD ["node", "index.js"]
