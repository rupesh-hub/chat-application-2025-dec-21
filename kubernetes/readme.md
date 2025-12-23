```shell
kubectl apply -f namespace.yaml
kubectl get namespaces
```

```shell
kubectl apply -f deployment.yaml
kubectl get pods -n chat-application -w
kubectl get deployment -n chat-application
```

```shell
kubectl apply -f service.yaml
kubectl get svc -n chat-application
kubectl get pods -n chat-application
kubectl port-forward svc/chat-app-service 4200:8080 -n chat-application --address=0.0.0.0
```