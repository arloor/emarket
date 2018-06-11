package com.arloor.emarket.config;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by jone.sun on 2017/7/5.
 */
public class MyInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
//        if(request.getRequestURI().equals("/smallbluewhale/login")){
//            try{
//                URL url = new URL("http://www.baidu.com");
//                URLConnection uc = url.openConnection();
//                uc.connect();// 发出连接
//                long time = uc.getDate();
//                Date date = new Date(time);
//                Calendar calendar = Calendar.getInstance();
//                calendar.set(2017, Calendar.SEPTEMBER, 29);
//                if(date.after(calendar.getTime())){
//                    System.out.println("超过日期!!!!" );
//                    return false;
//                }
//            }catch (Exception e){
//                System.out.println("无法获取日期!!!!" );
//                return false;
//            }
//
//        }
//        System.out.println(">>>MyInterceptor>>>>>>>在请求处理之前进行调用（Controller方法调用之前）: " + request.getRequestURI());
//        String ip = request.getRemoteAddr();
//        long startTime = System.currentTimeMillis();
//        request.setAttribute("requestStartTime", startTime);
//        if (handler instanceof HandlerMethod) {
//            HandlerMethod handlerMethod = (HandlerMethod) handler;
//            // 获取用户token
//            Method method = handlerMethod.getMethod();
//            System.out.println("用户:" + ip + ",访问目标:" + method.getDeclaringClass().getName() + "." + method.getName());
//        }
        response.addHeader("Access-Control-Allow-Origin", "*");//跨域
        response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");//跨域
        return true;// 只有返回true才会继续向下执行，返回false取消当前请求
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
//        System.out.println(">>>MyInterceptor>>>>>>>请求处理之后进行调用，但是在视图被渲染之前（Controller方法调用之后）");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
//        System.out.println(">>>MyInterceptor>>>>>>>在整个请求结束之后被调用，也就是在DispatcherServlet 渲染了对应的视图之后执行（主要是用于进行资源清理工作）");
    }

}
