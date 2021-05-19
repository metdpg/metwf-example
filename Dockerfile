# FIRST STAGE: build the client.
FROM node:14-buster-slim AS client-app
WORKDIR /build/app

COPY map-client/ map-client/
RUN cd map-client && npm ci && npm run build

# SECOND STAGE:  build the server.
FROM golang:1.16 AS server-app
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
COPY --from=client-app /build/app/map-client/build/ ./internal/client/build/

RUN go build -o metwf-example ./cmd/metwf-example

# THIRD STAGE: create the app runtime image.
FROM ubuntu:focal

COPY --from=server-app /build/app/metwf-example /app/

WORKDIR /app
USER nobody:nogroup

ENTRYPOINT ["/app/metwf-example"]
