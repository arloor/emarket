package com.arloor.emarket.controller;

import com.arloor.emarket.dao.ProductMapper;
import com.arloor.emarket.dao.ProductTagMapper;
import com.arloor.emarket.domain.Product;
import com.arloor.emarket.domain.ProductTag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    ProductTagMapper productTagMapper;
    @Autowired
    ProductMapper productMapper;

    @RequestMapping("/tags")
    public List<ProductTag> getAllSecondLevelTags(){
        return productTagMapper.selectAllLength2();
    }

    @RequestMapping("/newProduct")
    public int newProduct(@RequestBody Product product){
        int result=0;
        try {
            result=productMapper.insertSelective(product);
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
