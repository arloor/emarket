package com.arloor.emarket.config;


import com.arloor.emarket.dao.EuserMapper;
import com.arloor.emarket.domain.Euser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class CustomedUserDetails implements UserDetailsService {
    private Logger logger= LoggerFactory.getLogger(CustomedUserDetails.class);

    @Autowired
    EuserMapper euserMapper;

    @Bean
    public CustomedUserDetails userDetails(){
        return new CustomedUserDetails();
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        Euser euser=euserMapper.selectByPrimaryKey(s);
        if(euser!=null){
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(euser.getRole()));
            User user=new User(euser.getUname(),"{noop}"+euser.getPasswd(),authorities);
            logger.info(s+" 登陆成功");
            return user;
        }
        logger.info(s+" 登陆失败");
        return null;

    }
}
