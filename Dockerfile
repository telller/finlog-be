###################
# BUILD FOR PRODUCTION
###################

FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node ./envs/.env.prod ./envs.env.prod
COPY --chown=node:node ./envs/.env.prod .env

RUN npm ci

COPY --chown=node:node . .

# Set NODE_ENV environment variable
ENV NODE_ENV prod

# Run the build command which creates the production bundle
RUN npm run build

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible
# RUN npm ci --only=production && npm run prisma-migrate-one && npm run prisma-migrate && npm cache clean --force
RUN npm ci --only=production && npm run db-schema-generate && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:22-alpine AS prod

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/src/database/main-db/ ./dist/src/database/main-db/
COPY --chown=node:node --from=build /usr/src/app/prisma.config.ts ./dist/prisma.config.ts

#copy envs
COPY --chown=node:node ./envs/.env.prod ./envs/.env.prod
COPY --chown=node:node ./envs/.env.prod .env

USER node

# Start the server using the production build
ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy --config dist/prisma.config.ts && node dist/src/main.js"]
