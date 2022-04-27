/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.POST;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import modelo.Meeting;
import sun.net.www.http.HttpClient;
/**
 * REST Web Service
 *
 * @author filipe
 */
@Path("zoom")
public class ZoomWS {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of ZoomWS
     */
    public ZoomWS() {
    }

    /**
     * Retrieves representation of an instance of ws.ZoomWS
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("Meeting/get")
    public String getUrlMeeting(){
        Meeting meet = new Meeting();
        meet.setTopic("DEU CERTO 2.0");
        meet.setDuration("60");
        meet.setHost_video(Boolean.TRUE);
        
        return meet.toString();
    }
    /**
     * PUT method for updating or creating an instance of ZoomWS
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("Meeting/Create")
    public String sendPost(String body) throws MalformedURLException, IOException{

        URL url = new URL( "https://api.zoom.us/v2/users/me/meetings" );
        String response = null;
        
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();    
        
        connection.setRequestMethod("POST");
        connection.setRequestProperty( "Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJXQnE0aHROSVFOMkJTTmxFNk1hOWpBIiwiZXhwIjoxNjUwNDU3Njg2NTU2LCJpYXQiOjE2NTA0NTc2ODF9.m8PSRC7B-xjEIM7GlHoEe_u5VVvk56Oi7-2n_0wFma4");
        connection.setRequestProperty( "Content-Type", MediaType.APPLICATION_JSON);
        connection.setDoOutput(true);       
        
        
        OutputStream os = connection.getOutputStream();
        BufferedWriter wr = new BufferedWriter(
                        new OutputStreamWriter(os, "UTF-8"));
        wr.write(body.toString());
        wr.flush();
        wr.close();
        
        //Inicia a coleta da resposta da requisição
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine = null;
        response = "";

        while ((inputLine = in.readLine()) != null) {
            response += inputLine + "\n";
        }
        in.close();
        os.close();
        
        int responseCode = connection.getResponseCode();
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("\nBODY : " + body);
        System.out.println("Response Code : " + responseCode);  
        System.out.println("Os : " + os);   
        System.out.println("Response : " + response);  
        
        
        return response;
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("Meeting/Delete")
    public void sendDelete(String idMeeting) throws MalformedURLException, IOException{

        String uri = "https://api.zoom.us/v2/meetings/"+idMeeting;
        URL url = new URL( uri );
        
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();    
        
        connection.setRequestMethod("DELETE");
        connection.setRequestProperty( "Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJXQnE0aHROSVFOMkJTTmxFNk1hOWpBIiwiZXhwIjoxNjUwNDU3Njg2NTU2LCJpYXQiOjE2NTA0NTc2ODF9.m8PSRC7B-xjEIM7GlHoEe_u5VVvk56Oi7-2n_0wFma4");
        connection.setRequestProperty( "Content-Type", MediaType.APPLICATION_JSON);
        connection.setDoOutput(true);       

        
        int responseCode = connection.getResponseCode();
        System.out.println("\nSending 'DELETE' request to URL : " + url);
        System.out.println("\nId Meeting : " + idMeeting);
        System.out.println("Response Code : " + responseCode);
        
    }
    
 
}
