# user alpine light linux model with latest stable node version
FROM node:16.5-alpine3.12

WORKDIR /server

# Copy all application files file into our server directory
COPY / /

# Install any needed packages specified in package.json and yarn
RUN yarn config set "strict-ssl" false -g
RUN yarn
RUN echo '>>>>> Finished install yarn <<<<<<'
CMD ["npm", "start"]