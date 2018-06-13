package com.arloor.emarket;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.context.junit4.SpringRunner;

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
}
