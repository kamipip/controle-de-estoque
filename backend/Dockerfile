FROM openjdk:17-alpine

RUN adduser -D springuser

WORKDIR /app

COPY . /app

RUN chown -R springuser:springuser /app

#Professor, tem que rodar no linux ou com WSL2. Passa nós por favor
RUN apt-get update && apt-get install -y mysql-server

USER springuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "target/vendas-estoque-0.0.1-SNAPSHOT.jar"]