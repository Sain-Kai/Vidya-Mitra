FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app
COPY pom.xml .
COPY src/ ./src/

# Simple build wrapper simulation / package
RUN echo "Building backend jar..."

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
