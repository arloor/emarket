package com.arloor.emarket.controller;

import com.arloor.emarket.dao.ProductMapper;
import com.arloor.emarket.dao.ProductTagMapper;
import com.arloor.emarket.domain.Product;
import com.arloor.emarket.domain.ProductTag;
import com.arloor.emarket.model.ProductDetail;
import com.arloor.emarket.model.ProductListCell;
import com.arloor.emarket.model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @RequestMapping("/productList")
    public List<ProductListCell> productList(@RequestParam(defaultValue = "tag") String param, @RequestParam(defaultValue = "11") String value, @RequestParam(defaultValue = "-1") int minId){
        //如果param是tag，那么就是按照分类查找，如果param是keyword，那么就是搜索
        //minId就是控制分页的好了
        if(param.equals("tag")){
            return productMapper.selectProductByTagIdPaged(value,minId);
        }
        if(param.equals("keyword")){
            String keyword="%"+value+"%";
            return productMapper.selectProductByKeywordPaged(keyword,minId);
        }
        if(param.equals("sellerName")){
            return productMapper.selectProductBySellerNamePaged(value,minId);
        }
        return null;
    }

    @RequestMapping("/productDetail")
    public ProductDetail productDetail(@RequestParam(defaultValue = "10") int pid){
        return productMapper.selectProductDetailByPid(pid);
    }

    @RequestMapping("/update")
    public Result updateProduct(@RequestBody Product product){
        try{
            productMapper.updateByPrimaryKeySelective(product);
        }catch (Exception e){
            Result result=new Result();
            result.setErrCode("FAIL");
            result.setErrMsg("数据库异常");
            return result;
        }
        Result result=new Result();
        result.setErrCode("OK");
        result.setErrMsg("更新成功");
        return result;

    }

}
