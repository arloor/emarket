# 电子商城设计

## 技术选择

后端：springboot2.0+mybatis+mysql+redis+rabbitMQ

前端：bootstrap+原生js

## 数据库设计

![avatar](ER图.jpg)

```js
header: { 'content-type': 'application/json' },
method: "post",
```

## 缕一缕 商家订单处理的页面

接口要求：

要找到seller为自己的所有的商品，按照orderId分组，