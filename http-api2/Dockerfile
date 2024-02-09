# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

COPY wait-for-mysql.sh /usr/wait-for-mysql.sh

RUN chmod +x /usr/wait-for-mysql.sh

# Install any dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run the app
CMD ["node", "index.js"]
