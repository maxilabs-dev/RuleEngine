# user alpine light linux model with latest stable node version
FROM node:16.5-alpine3.12

WORKDIR /server

# Copy the package.json and all application files file into our server directory
COPY / /

# Install any needed packages specified in package.json
RUN yarn
RUN echo '>>>>> Finished install yarn <<<<<<'
CMD ["npm", "start"]