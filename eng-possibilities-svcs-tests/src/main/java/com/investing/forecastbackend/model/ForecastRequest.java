package com.investing.forecastbackend.model;

//import lombok.Data;
//import lombok.Getter;
//import lombok.Setter;

import java.util.Map;

// TODO Model for the request for investment forecast
//@Data
//@Getter
//@Setter
public class ForecastRequest {
    private Map<String, Double> request;

    public Map<String, Double> getRequest() {
        return request;
    }

    public void setRequest(Map<String, Double> request) {
        this.request = request;
    }

}
