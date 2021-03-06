package com.arloor.emarket.service;

import com.arloor.emarket.dao.EuserMapper;
import com.arloor.emarket.dao.WeixinMapper;
import com.arloor.emarket.domain.Euser;
import com.arloor.emarket.model.WeiUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

@Component
public class WeixinUserService {

    @Autowired
    WeixinMapper weixinMapper;
    @Autowired
    EuserMapper euserMapper;


    /**
     * 事务地进行处理
     * @param weiUser
     * @return
     */
    @Transactional
    public WeiUser bindUser( WeiUser weiUser){
        weixinMapper.bindOpenIdUser(weiUser);
        Euser euser=euserMapper.selectByPrimaryKey(weiUser.getUname());
        if(euser==null||euser.getPasswd()==null||!euser.getPasswd().equals(weiUser.getPasswd())){
            //在这里，应该回滚
            throw new RuntimeException("用户名密码错误，事务回滚");
        }else{
            weiUser.setNickName(euser.getNickName());
            weiUser.setPasswd(null);
            weiUser.setBalance(euser.getBalance());
            weiUser.setEmail(euser.getEmail());
        }
        return weiUser;
    }
}
