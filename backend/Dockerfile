FROM ubuntu:latest AS build

# install dependencies
RUN apt-get update
RUN apt-get install openjdk-21-jdk -y

# copy all content to render environment
COPY . .

# install java and maven
RUN apt-get install maven -y
# Instale as dependências do Maven e construa o projeto sem executar os testes
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim

# expose port 8080
EXPOSE 8080

RUN ls .

# generate application file friendly
COPY --from=build /target/backend-0.0.1-SNAPSHOT.jar app.jar

# run application
ENTRYPOINT ["java", "-jar", "app.jar"]