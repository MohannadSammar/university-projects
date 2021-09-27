##
## Build stage
##

FROM maven:3.8.1-openjdk-11-slim AS build

RUN mkdir -p /app
COPY . /app/
WORKDIR /app
RUN mvn package
##
## Run stage
##

FROM openjdk:11.0-jre-slim

EXPOSE 800

RUN mkdir -p /app
COPY --from=build /app/target/ExternalClient-1.0-SNAPSHOT.jar /app

CMD [ "java", "-jar", "/app/ExternalClient-1.0-SNAPSHOT.jar" ]