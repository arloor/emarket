package com.arloor.emarket;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CustomerUserService implements UserDetailsService {
    @Bean
    public CustomerUserService userDetails(){
        return new CustomerUserService();
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {


//        Member member=membersDao.searchByUname(s);
//        if(member!=null&&member.getTimecancel()==null){
//            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
//            authorities.add(new SimpleGrantedAuthority(member.getRole()));
//            User user=new User(member.getUname(),"{noop}"+member.getPasswd(),authorities);
//            return user;
//        }
//        Admin admin=adminDao.searchAdmin(s);
//        if(admin!=null){
//            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
//            authorities.add(new SimpleGrantedAuthority(admin.getArole()));
//            User user=new User(admin.getAname(),"{noop}"+admin.getApasswd(),authorities);
//            return user;
//        }
//        Venues venues=null;
//        try {
////            System.out.println(s);
//            venues = venuesDao.searchVenuesByVid(Integer.parseInt(s));
//        }catch (NumberFormatException e){
//            e.printStackTrace();
//            return null;
//        }
//        if(venues!=null&&venues.getVstatus().equals("valid")){
//            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
//            authorities.add(new SimpleGrantedAuthority(venues.getRole()));
//            User user=new User(venues.getVname(),"{noop}"+venues.getVpasswd(),authorities);
//            return user;
//        }


        return null;

    }
}
