# Use the base image with Node.js
FROM node:15.5.0

ARG APPMODE
ARG APPENV

ENV APPMODE=$APPMODE
ENV APPENV=$APPENV

# Copy the current directory into the Docker image
COPY . /micro-frontends-submission-review-app

# Set working directory for future use
WORKDIR /micro-frontends-submission-review-app

# Install the dependencies from package.json
RUN npm install

RUN npm run build

CMD npm start
