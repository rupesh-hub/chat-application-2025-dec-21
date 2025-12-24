```shell
docker compose -f docker/docker-compose/default/docker-compose.yaml up -d
docker compose -f docker/docker-compose/default/docker-compose.yaml down
docker system prune -f 

# DEBUG
docker exec -it backend-svc curl http://localhost:8181/actuator/health/readiness
docker inspect backend-svc --format='{{.State.Health.Status}}'
docker inspect backend-svc --format='{{json .State.Health.Log}}' | jq
docker inspect backend-svc --format='{{.State.Health.Log}}'
docker inspect rupesh1997/chat-service-backend:1.0.0 --format='{{.Config.Healthcheck}}'
docker inspect backend-svc --format='{{.Config.Healthcheck}}'
docker compose config
```

```shell
docker ps --format "table {{.Image}}\t{{.Status}}\t{{.Ports}}"

1️⃣ View logs (follow + timestamps)
docker logs -f --timestamps << container_name >>

2️⃣ Execute a shell inside a running container
docker exec -it container_name sh
docker exec -it container_name bash

3️⃣ Inspect container details (IP, mounts, env)
docker inspect backend-svc
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' backend-svc # get container ip only:

#Monitoring commands
docker stats
docker stats backend-svc

5️⃣ Check container health status
docker inspect --format='{{.State.Health.Status}}' backend-svc

#️⃣ Full system cleanup (⚠️ be careful)
docker system prune -a --volumes

9️⃣ List images with size
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

🔟 See image layers (debug size issues)
docker history mysql:8.0

1️⃣3️⃣ Connect container to another network
docker network connect test-nw backend-svc

1️⃣4️⃣ List volumes
docker volume ls

1️⃣5️⃣ Inspect volume location
docker volume inspect volume_name


1️⃣6️⃣ Clean unused volumes
docker volume prune

1️⃣8️⃣ Build without cache (debug builds)
docker build --no-cache -t myapp .

2️⃣2️⃣ View logs of one service
docker compose logs -f service_name

2️⃣4️⃣ Find containers using a port
docker ps --filter "publish=8080"

2️⃣5️⃣ Kill all running containers
docker kill $(docker ps -q)

2️⃣6️⃣ Remove all containers
docker rm -f $(docker ps -aq)
```