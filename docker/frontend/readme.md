1. Build docker image
   ```shell
   # build docker 
   docker build \
   -t rupesh1997/chat-service-frontend:1.0.0 \
    -t rupesh1997/chat-service-frontend:latest \
   --build-arg CONFIGURATION=docker \
   -f ../docker/frontend/Dockerfile . 
   
   # Run container
   docker run -d \
   --name chat-service-frontend \
   --network chat-apps-network \
   -p 4200:8080 \
   rupesh1997/chat-service-frontend:1.0.0
   ```


