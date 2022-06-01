FROM node:16.13

WORKDIR /app

# Install Truffle
RUN npm install -g truffle@5.4.3 --force
# RUN npm config set bin-links false


# Move Contract Files
# COPY contracts ./contracts
# COPY migrations ./migrations
# COPY test ./test

# Move React Files
COPY patches ./patches
COPY public ./public
COPY src ./src
COPY test ./test
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY truffle-config.js ./truffle-config.js

# Copy entrypoint file
COPY ./docker-entrypoint.sh /tmp/entrypoint.sh
RUN chmod 0777 /tmp/entrypoint.sh

# Clean Install NPM Dependencies
RUN yarn install
EXPOSE 3000
# VOLUME /app
ENTRYPOINT ["/tmp/entrypoint.sh"]
