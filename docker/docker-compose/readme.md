```shell
docker compose -f docker/docker-compose/default/docker-compose.yaml up -d
docker compose -f docker/docker-compose/default/docker-compose.yaml down
docker system prune -f 

#DEBUG
docker exec -it backend-svc curl http://localhost:8181/actuator/health/readiness
docker inspect backend-svc --format='{{.State.Health.Status}}'
docker inspect backend-svc --format='{{json .State.Health.Log}}' | jq
docker inspect backend-svc --format='{{.State.Health.Log}}'
docker inspect rupesh1997/chat-service-backend:1.0.0 --format='{{.Config.Healthcheck}}'
docker inspect backend-svc --format='{{.Config.Healthcheck}}'
docker compose config

```