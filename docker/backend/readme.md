1. Build Product Service Image
   ```shell
    docker build -t rupesh1997/chat-service-backend:1.0.0 \
       -t rupesh1997/chat-service-backend:latest \
       --build-arg ACTIVE_PROFILE=docker \
       --build-arg PROJECT_VERSION=1.0.0 \
       -f ../docker/backend/Dockerfile .
    ```

2. Run Product Service Container
   ```shell
    docker network create chat-apps-network --driver bridge && 
    docker run -d \
    -p 8181:8181 \
    --name chat-service-backend \
    -e SPRING_PROFILES_ACTIVE=default \
    --network chat-apps-network \
    rupesh1997/chat-service-backend:1.0.0
    ```


```shell
    docker stop chat-service-backend chat-service-frontend && 
    docker rm chat-service-backend chat-service-frontend && 
    docker system prune -f && 
    clear
``` 
   