package com.investing.forecastbackend.model;

//import lombok.Data;
//import lombok.Getter;
//import lombok.Setter;

import java.util.List;

//@Data
//@Getter
//@Setter
public class InvestmentDetail {
    private String category;
    private String minimum;
    private List<String> data;
    
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getMinimum() {
        return minimum;
    }
    public void setMinimum(String minimum) {
        this.minimum = minimum;
    }
    public List<String> getData() {
        return data;
    }
    public void setData(List<String> data) {
        this.data = data;
    }

}

