# FIRST STAGE: build the client.
FROM node:23-bookworm-slim AS client-app
WORKDIR /build/app

COPY example-site/ example-site/

ENV NODE_OPTIONS=--openssl-legacy-provider
RUN cd example-site && npm ci && npm run build

# SECOND STAGE:  build the server.
FROM golang:1.23 AS server-app
WORKDIR /build/app

# We want to populate the module cache based on the go.{mod,sum} files.
COPY go.mod .
# COPY go.sum .

# Dependencies are downloaded only when go.mod or go.sum changes.
RUN go mod download

# Copy the rest of the source files.
COPY cmd/ cmd/
COPY internal/ internal/

# Copy client app for embedding in the go client.
COPY --from=client-app /build/app/example-site/build/ ./internal/client/build/

RUN go build -o metwf-example ./cmd/metwf-example

# THIRD STAGE: create the app runtime image.
FROM ubuntu:noble

COPY --from=server-app /build/app/metwf-example /app/

WORKDIR /app
USER nobody:nogroup

ENTRYPOINT ["/app/metwf-example"]
