package com.investing.forecastbackend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.investing.forecastbackend.model.ForecastRequest;
import com.investing.forecastbackend.model.ForecastResponse;
import com.investing.forecastbackend.model.InvestmentDetail;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.swing.tree.TreePath;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.*;


@Service
@Slf4j
@RequiredArgsConstructor
public class InvestingForecastService {

    /**
     * Reads the investment JSON file & returns the data as a list of
     * InvestmentDetail objects
     * @return Returns a List of InvestmentDetail objects
     * @throws IOException
     */
    public List<InvestmentDetail> getInvestmentOptions() throws IOException {
        // TODO read investment options from investment-details.json
        ObjectMapper objectMapper = new ObjectMapper();

        ArrayList read = (ArrayList) objectMapper.readValue(Paths
                .get("/home/fetenh/DeepPockets/eng-possibilities-svcs/src/main/resources/data/investment-details.json")
                .toFile(), Map.class).get("Investments");

        String str = objectMapper.writeValueAsString(read);
        return objectMapper.readValue(str, new TypeReference<List<InvestmentDetail>>() {
        });
    }

    /**
     * Returns ForecastResponse object
     * @param request
     * @return
     * @throws IOException
     */
    public ForecastResponse getInvestmentOptions(final ForecastRequest request) throws IOException {
        List<InvestmentDetail> details = getInvestmentOptions();
        // TODO write algorithm to calculate investment forecast from request configuration
        List<List<Double>> result = getForeCast(request.getRequest(), details); // list of predicted returns for year 1-10
        ForecastResponse response = new ForecastResponse();
        response.setResponse(result);
        return response;
    }

    public List<List<Double>> getForeCast(Map<String, Double> userRequest, List<InvestmentDetail> details) {
        Map<Integer, Double> totalYearAmount = new TreeMap<>();
        Map<Integer, Double> riskForYear = new TreeMap<>(); // Maps the year to variability of return for that year
        for (InvestmentDetail i : details) { // loop through categories in database
            //user input for category i
            double userInvestmentPercentage = userRequest.get(i.getCategory()); // user's percentage for that category
            double userInvestmentDollars = (userInvestmentPercentage / 100) * 10000; // $ for category i
            double categorySDRatio = calculateSD(i.getData()) / 100;
            double weightedSD = (userInvestmentPercentage / 100) * categorySDRatio; // SD $ for category
            for (int x = 0; x < 10; x++) { // calculate the user return for curr category from year 1 to 10

                //historical interest data for category i in year x
                double historicalInterest = Double.valueOf(i.getData().get(x)); // historical interest in year x (%)
                double currentInterest = (historicalInterest / 100) * userInvestmentDollars;

                userInvestmentDollars = userInvestmentDollars + currentInterest;

                Double currentYearTotal = totalYearAmount.getOrDefault(x, 0.0);
                //add total amount for category i in year x in Map<Integer, Double> totalYearAmount
                //continuously sum total for each investment i in year x
                totalYearAmount.put(x, currentYearTotal + userInvestmentDollars); // update the return for each year
            }
            for (int x = 0; x < 10; x++) {
                riskForYear.put(x, riskForYear.getOrDefault(x, 0.0) + (totalYearAmount.get(x) * weightedSD));
            }
        }
        List<List<Double>> result = new ArrayList<>();
        result.add(0, new ArrayList<>(totalYearAmount.values()));
        result.add(1, new ArrayList<>(riskForYear.values()));
        return result; // returned result: index 0 => graph values, index 1 => variability values
    }


    // return a 2 element array: [List<Double>, List<Double>]

    /**
     * Computes a List of the variability of returns where index 0 represents variability for year 0
     * @param userRequest User's percentages
     * @param details List of InvestmentDetail objects created from historical data
     * @return List<Double> of variability of returns for future years 0-9
     */
    public List<Double> getRisk(Map<String, Double> userRequest, List<InvestmentDetail> details) {
        Map<Integer, Double> riskForYear = new TreeMap<>(); // Maps the year to variability of return for that year
        double rawSD = 0.0;
        for (InvestmentDetail i : details) {
            double userInvestmentRatio = userRequest.get(i.getCategory()) / 100;
            double categoryVariabilityRatio = calculateSD(i.getData()) / 100;
            rawSD += userInvestmentRatio * categoryVariabilityRatio;
        }
        riskForYear.put(0, 10000 * rawSD);
        for (int x = 1; x < 10; x++) {
            riskForYear.put(x, riskForYear.get(x - 1) * rawSD);
        }
        return new ArrayList<>(riskForYear.values());
    }

    /**
     * Calculates the standard deviation of array of data
     * @param numArray array of Strings that can be converted to doubles to find
     *                 the standard deviation of
     * @return {double} A numerical value for the standard deviation
     */
    private double calculateSD(List<String> numArray) {
        List<Double> listOfDouble = stringToDoubleList(numArray);
        double sum = sum(listOfDouble);
        double variance = 0.0;
        int length = listOfDouble.size();
        for(double num : listOfDouble) {
            sum += num;
        }
        double mean = sum / length;
        for(double num: listOfDouble) {
            variance += Math.pow(num - mean, 2);
        }
        return Math.sqrt(variance / length);
    }

    /**
     * Converts a List<String> to List<Double>
     * Assumes the String can be casted to Double
     * @param numArrayInString
     * @return List<Double>
     */
    private List<Double> stringToDoubleList(List<String> numArrayInString) {
        List<Double> result = new ArrayList<>();
        for (int i = 0; i < numArrayInString.size(); i++) {
            result.add(Double.valueOf(numArrayInString.get(i)));
        }
        return result;
    }

    private double sum(List<Double> values) {
        int sum = 0;
        for (int i = 0; i < values.size(); i++) {
            sum += values.get(i);
        }
        return sum;
    }

}

