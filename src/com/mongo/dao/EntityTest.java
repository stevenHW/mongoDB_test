package com.mongo.dao;
import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;

/**
* �Ի���ʵ��Ĵ洢����
* @author lhy
*
*/
public class EntityTest {
    
     public static void main(String[] args) throws Exception{
    	 selectAll();
     }
    
     /**
     * ����ʵ�����
     * @throws Exception
     */
     public static void saveEntity() throws Exception{
          //��һ��ʵ����mongo��������mongodb������  �������е����ݿ�
         
          //Ĭ�Ϲ��췽����Ĭ�������ӱ������˿ںţ�Ĭ����27017
          //�൱��Mongo mongo =new Mongo("localhost",27017)
          Mongo mongo =new Mongo();
         
          //�ڶ������Ӿ�������ݿ�
          //���в����Ǿ������ݿ�����ƣ����������в����ڣ����Զ�����
          DB db=mongo.getDB("myMongo");
         
          //��������������ı�
         //��mongodb��û�б�ĸ������ָ����
          //���в��������ݿ��б��������ڣ����Զ�����
          DBCollection collection=db.getCollection("user");
         
          //��Ӳ���
          //��mongodb��û���еĸ������ָ�ĵ�
          BasicDBObject document=new BasicDBObject();
         
          document.put("id", 2);
          document.put("name", "С��");
//          //Ȼ�󱣴浽������
//     //     collection.insert(document);
         
         
          //��Ȼ��Ҳ���Ա���������json��
/*          {
               "id":1,
               "name","С��",
               "address":
               {
               "city":"beijing",
               "code":"065000"
               }
          }*/
          //ʵ������json��˼·���£�
          //��һ�֣�����xmlʱ���������
          BasicDBObject addressDocument=new BasicDBObject();
          addressDocument.put("city", "beijing");
          addressDocument.put("code", "065000");
          document.put("address", addressDocument);
          //Ȼ�󱣴����ݿ���
          collection.insert(document);
         
          //�ڶ��֣�ֱ�Ӱ�json�浽���ݿ���
/*          String jsonTest="{'id':1,'name':'С��',"+
                   "'address':{'city':'beijing','code':'065000'}"+
                    "}";
         DBObject dbobjct=(DBObject)JSON.parse(jsonTest);
         collection.insert(dbobjct);*/    
     }
    
     /**
     * �������е�
     * @throws Exception
     */
     public static List selectAll() throws Exception{
          //��һ��ʵ����mongo��������mongodb������  �������е����ݿ�
         
          //Ĭ�Ϲ��췽����Ĭ�������ӱ������˿ںţ�Ĭ����27017
          //�൱��Mongo mongo =new Mongo("localhost",27017)
          Mongo mongo =new Mongo();
         
          //�ڶ������Ӿ�������ݿ�
          //���в����Ǿ������ݿ�����ƣ����������в����ڣ����Զ�����
          DB db=mongo.getDB("myMongo");
         
          //��������������ı�
         //��mongodb��û�б�ĸ������ָ����
          //���в��������ݿ��б��������ڣ����Զ�����
          DBCollection collection=db.getCollection("user");
         
          //��ѯ����
          //��ѯ����
          //��������access���ݿ����α����
          DBCursor cursor=collection.find();
          System.out.println("mongodb�е�user�������£�");
     /*     while(cursor.hasNext()){
               System.out.println(cursor.next());
          }*/
          
          List<DBObject> list=cursor.toArray();
          System.out.println(list.size());
          System.out.println("dao.."+list.toString());
          return list;
     }
    
     /**
     * ����������ѯ
     * @throws Exception
     */
     public static void selectPart() throws Exception{
          //��һ��ʵ����mongo��������mongodb������  �������е����ݿ�
         
          //Ĭ�Ϲ��췽����Ĭ�������ӱ������˿ںţ�Ĭ����27017
          //�൱��Mongo mongo =new Mongo("localhost",27017)
          Mongo mongo =new Mongo();
         
          //�ڶ������Ӿ�������ݿ�
          //���в����Ǿ������ݿ�����ƣ����������в����ڣ����Զ�����
          DB db=mongo.getDB("myMongo");
         
          //��������������ı�
         //��mongodb��û�б�ĸ������ָ����
          //���в��������ݿ��б��������ڣ����Զ�����
          DBCollection collection=db.getCollection("user");
         
    
          //����ֱ��put
          BasicDBObject queryObject=new BasicDBObject();
          queryObject.put("id", 1);
          DBCursor querycursor=collection.find(queryObject);
          System.out.println("������ѯ���£�");
          while(querycursor.hasNext()){
               System.out.println(querycursor.next());
          }
     }
    
     /**
     * ���²���
     * ����һ����¼
     * @throws Exception
     */
     public static void update()throws Exception{
          //��һ��ʵ����mongo��������mongodb������  �������е����ݿ�
         
          //Ĭ�Ϲ��췽����Ĭ�������ӱ������˿ںţ�Ĭ����27017
          //�൱��Mongo mongo =new Mongo("localhost",27017)
          Mongo mongo =new Mongo();
         
          //�ڶ������Ӿ�������ݿ�
          //���в����Ǿ������ݿ�����ƣ����������в����ڣ����Զ�����
          DB db=mongo.getDB("myMongo");
         
          //��������������ı�
         //��mongodb��û�б�ĸ������ָ����
          //���в��������ݿ��б��������ڣ����Զ�����
          DBCollection collection=db.getCollection("user");
         
          //���º�Ķ���
//          ��һ�ָ��·�ʽ
          BasicDBObject newBasicDBObject =new BasicDBObject();
          newBasicDBObject.put("id", 2);
          newBasicDBObject.put("name", "С��");
          collection.update(new BasicDBObject().append("id", 1),newBasicDBObject);
         
//          �ڶ��ָ��·�ʽ
//          ����ĳһ���ֶ�
//          BasicDBObject newBasicDBObject =new BasicDBObject().append("$set",new BasicDBObject().append("name", "С��") );
//          collection.update(new BasicDBObject().append("id", 1).append("name", "С��"),newBasicDBObject);

         
          DBCursor querycursor1=collection.find();
          System.out.println("���º������£�");
          while(querycursor1.hasNext()){
               System.out.println(querycursor1.next());
          }
     }
    
     /**
     * ɾ���ĵ������а���ɾ��ȫ����ɾ������
     * @throws Exception
     */
     public static void delete() throws Exception{
         
          //��һ��ʵ����mongo��������mongodb������  �������е����ݿ�
         
          //Ĭ�Ϲ��췽����Ĭ�������ӱ������˿ںţ�Ĭ����27017
          //�൱��Mongo mongo =new Mongo("localhost",27017)
          Mongo mongo =new Mongo();
         
          //�ڶ������Ӿ�������ݿ�
          //���в����Ǿ������ݿ�����ƣ����������в����ڣ����Զ�����
          DB db=mongo.getDB("myMongo");
         
          //��������������ı�
         //��mongodb��û�б�ĸ������ָ����
          //���в��������ݿ��б��������ڣ����Զ�����
          DBCollection collection=db.getCollection("user");
          BasicDBObject queryObject1=new BasicDBObject();
          queryObject1.put("id", 1);
          queryObject1.put("name","С��");
         
          //ɾ��ĳһ����¼
         collection.remove(queryObject1);
          //ɾ��ȫ��
          //collection.drop();
         
          DBCursor cursor1=collection.find();
          System.out.println("ɾ����Ľ�����£�");
          while(cursor1.hasNext()){
               System.out.println(cursor1.next());
          }
         
    
     }
    
    
}