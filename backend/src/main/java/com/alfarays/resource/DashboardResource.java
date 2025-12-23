package com.alfarays.resource;

import io.micrometer.core.instrument.MeterRegistry;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.health.actuate.endpoint.HealthEndpoint;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.management.ManagementFactory;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardResource {

    private final MeterRegistry registry;
    private final HealthEndpoint healthEndpoint;
    private final Environment env;

    @Value("${info.app.name:Chat Application}")
    private String appName;
    @Value("${info.app.version:1.0.0}")
    private String appVersion;
    @Value("${info.developer.name:Rupesh Dulal}")
    private String devName;
    @Value("${server.port:8181}")
    private String serverPort;

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboardData() {

        // 1. Info Stats
        Map<String, String> infoStats = new LinkedHashMap<>();
        infoStats.put("appName", appName);
        infoStats.put("version", appVersion);
        infoStats.put("developer", devName);
        infoStats.put("port", serverPort);
        infoStats.put("profiles", Arrays.toString(env.getActiveProfiles()));

        // 2. System Stats
        long usedMem = (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / 1024 / 1024;
        long maxMem = Runtime.getRuntime().maxMemory() / 1024 / 1024;

        Map<String, String> systemStats = new LinkedHashMap<>();
        systemStats.put("memoryUsage", usedMem + "MB / " + maxMem + "MB");
        systemStats.put("uptime", formatUptime(ManagementFactory.getRuntimeMXBean().getUptime()));
        systemStats.put("jvmVersion", System.getProperty("java.version"));

        // 3. CPU Metrics
        double cpuRaw = getCpuMetric();
        Map<String, Object> cpuStats = new LinkedHashMap<>();
        cpuStats.put("raw", cpuRaw);
        cpuStats.put("formatted", String.format("%.2f%%", cpuRaw * 100));

        // 4. Build Final Response Object
        DashboardResponse response = DashboardResponse.builder()
                .healthStatus(healthEndpoint.health().getStatus().getCode())
                .info(infoStats)
                .system(systemStats)
                .cpu(cpuStats)
                .build();

        return ResponseEntity.ok(response);
    }

    // Professional way to return structured JSON
    @Data
    @Builder
    public static class DashboardResponse {
        private String healthStatus;
        private Map<String, String> info;
        private Map<String, String> system;
        private Map<String, Object> cpu;
    }

    private double getCpuMetric() {
        try {
            var gauge = registry.find("system.cpu.usage").gauge();
            return (gauge != null) ? gauge.value() : 0.0;
        } catch(Exception e) {
            return 0.0;
        }
    }

    private String formatUptime(long millis) {
        long h = millis / 3600000;
        long m = (millis % 3600000) / 60000;
        return String.format("%dh %dm", h, m);
    }
}