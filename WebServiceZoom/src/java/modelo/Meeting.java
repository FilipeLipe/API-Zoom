/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

/**
 *
 * @author filipe
 */
public class Meeting {
    private Integer id;
    private String topic;
    private String status;
    private String type;
    private String start_time;
    private String duration;
    private String password;
    private Boolean host_video;
    private Boolean participant_video;
    private Boolean mute_upon_entry;
    
    public void setTopic(String topic){
        this.topic = topic;
    }
    public void setType(String type){
        this.type = type;
    }
    public void setStart_time(String start_time){
        this.start_time = start_time;
    }
    public void setDuration(String duration){
        this.duration = duration;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public void setHost_video(Boolean host_video){
        this.host_video = host_video;
    }
    public void setParticipant_video(Boolean participant_video){
        this.participant_video = participant_video;
    }
    public void setMute_upon_entry(Boolean mute_upon_entry){
        this.mute_upon_entry = mute_upon_entry;
    }
    
}
