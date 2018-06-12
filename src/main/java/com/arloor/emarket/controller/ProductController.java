package com.arloor.emarket.controller;

import com.arloor.emarket.dao.ProductTagMapper;
import com.arloor.emarket.domain.ProductTag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    ProductTagMapper productTagMapper;

    @RequestMapping("/tags")
    public List<ProductTag> getAllSecondLevelTags(){
        return productTagMapper.selectAllLength2();
    }
}
