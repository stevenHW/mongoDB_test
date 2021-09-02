package com.mongo.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.mongo.dao.EntityTest;

public class EntityServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("doget.....");
		try {
			List list=new EntityTest().selectAll();
			response.setCharacterEncoding("UTF-8");
			System.out.println(JSONArray.fromObject(list).toString());
			//ʹ��JSONArray�ٴ�ת��
//   		response.getWriter().write(JSONArray.fromObject(list).toString());
//			response.getWriter().write(JSONArray.fromObject(list).toString());
			
		    //ֱ�Ӱ�list�����������ʽ��ǰ̨ʹ��d[����].����
			response.getWriter().write(list.toString());

			//����������ʽ��ǰ̨ʹ��d.����
//			response.getWriter().write(list.get(0).toString());

	        //��Ҫ����ligerui��grid��ʽ��Ĭ����rows
//			initJsonList(request,response,list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
	
	protected void initJsonList(HttpServletRequest request,
			HttpServletResponse response, List list) {

		Map map = new HashMap();
		map.put("Rows", list);
		JSONObject jsonObject = JSONObject.fromObject(map);
		try {
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(jsonObject.toString());
			System.out.println(jsonObject);
		} catch (IOException e) {
			System.out.println(e.toString());
		}
	}
}
