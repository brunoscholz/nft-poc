FROM node:16

WORKDIR /app

RUN npm install -g yarn
# Install Truffle
# RUN npm install -g truffle
RUN npm config set bin-links false


# Move Contract Files
# COPY contracts ./contracts
# COPY migrations ./migrations
# COPY test ./test

# Move React Files
COPY src ./
COPY public ./
COPY patches ./
COPY test ./
COPY package.json ./
COPY yarn.lock ./
COPY truffle-config.js ./

# Clean Install NPM Dependencies
RUN yarn install
EXPOSE 3000
