package com.arloor.emarket;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RunWith(SpringRunner.class)
	@SpringBootTest
	public class EmarketApplicationTests {
		@Autowired
		private RedisTemplate redisTemplate;

		@Test
		public void set() throws InterruptedException {
			ValueOperations value=redisTemplate.opsForValue();
			value.set("名字","刘港欢");

			for (int i = 0; i <20 ; i++) {
				System.out.println(value.get("test"));
				Thread.sleep(1000);
			}
		}


	@Test
	public void hashOps() throws InterruptedException {
		HashOperations hash=redisTemplate.opsForHash();
		hash.put("test:cart:moontell","10","100");
		hash.put("test:cart:moontell","9","90");
		hash.put("test:cart:moontell","8","80");
		Set<String> set=null;
		if((set=hash.keys("test:cart:moontell"))!=null&&(set.size()!=0)) {
			Map<String, String> map = hash.entries("test:cart:moontell");
			for (Map.Entry<String, String> entry : map.entrySet()
					) {
				System.out.println(entry.getKey() + "  " + entry.getValue());
			}
		}
	}
}
