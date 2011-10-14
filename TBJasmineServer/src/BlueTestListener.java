
import java.net.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.io.*;
import java.util.*;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.CharacterData;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;


public class BlueTestListener {
	public static void main(String argv[]) throws IOException{
		int portNum = Integer.parseInt(argv[0]);
		ServerSocket ss = new ServerSocket(portNum);
		
		//while(true)
			new BlueTestConnection(ss.accept(), portNum).start();
		
		
	}
}

class BlueTestConnection extends Thread {
	Socket client;
	int portNum;
	String result;
	BlueTestConnection(Socket client, int portNum) throws SocketException{
		this.client = client;
		this.portNum = portNum;
		result = "";
	}
	
	public void run(){
		boolean connection = true;
		try{
			while(connection){
				BufferedReader in = new BufferedReader(
						new InputStreamReader(client.getInputStream()));
				DataOutputStream output =
			            new DataOutputStream(client.getOutputStream());
				String request = "";
				int i = 1;
				while((request = in.readLine())!=null){
					
					if(request.equalsIgnoreCase("END_TEST_RESULT")){
						break;
					}
					if(i>11)
						result = result+request;
						System.out.println(request);
					i++;
				}
				//System.out.println("END");
				DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
				Date date = new Date();
				
				output.writeBytes(construct_http_header(200, 5));
				output.writeChars("Team Blue Jasmine Server: "+dateFormat.format(date));
				output.close();
				client.close();
				connection = false;
				
				this.printTestResult(result);
				//System.out.println("Close");
			}
			
			client.close();

		}
		catch(IOException e){}
	}
	
	private void printTestResult(String xmlRecords){
		try {
	        DocumentBuilderFactory dbf =
	            DocumentBuilderFactory.newInstance();
	        DocumentBuilder db = dbf.newDocumentBuilder();
	        InputSource is = new InputSource();
	        is.setCharacterStream(new StringReader(xmlRecords));

	        Document doc = db.parse(is);
	        NodeList nodes = doc.getElementsByTagName("testsuites");

	        // iterate the employees
	        for (int i = 0; i < nodes.getLength(); i++) {
	           Element element = (Element) nodes.item(i);
	           /*
	           NodeList name = element.getElementsByTagName("name");
	           Element line = (Element) name.item(0);
	           System.out.println("Name: " + getCharacterDataFromElement(line));

	           NodeList title = element.getElementsByTagName("title");
	           line = (Element) title.item(0);
	           System.out.println("Title: " + getCharacterDataFromElement(line));
	           */
	        }
	    }
	    catch (Exception e) {
	        e.printStackTrace();
	    }
	}
	 
	  private String construct_http_header(int return_code, int file_type) {
	    String s = "HTTP/1.0 ";
	    switch (return_code) {
	      case 200:
	        s = s + "200 OK";
	        break;
	      case 400:
	        s = s + "400 Bad Request";
	        break;
	      case 403:
	        s = s + "403 Forbidden";
	        break;
	      case 404:
	        s = s + "404 Not Found";
	        break;
	      case 500:
	        s = s + "500 Internal Server Error";
	        break;
	      case 501:
	        s = s + "501 Not Implemented";
	        break;
	    }

	    s = s + "\r\n"; //other header fields,
	    s = s + "Connection: close\r\n"; //we can't handle persistent connections
	    s = s + "Server: TeamBlue Jasmine Server\r\n"; //server name

	    switch (file_type) {
	      //plenty of types for you to fill in
	      case 0:
	        break;
	      case 1:
	        s = s + "Content-Type: image/jpeg\r\n";
	        break;
	      case 2:
	        s = s + "Content-Type: image/gif\r\n";
	      case 3:
	        s = s + "Content-Type: application/x-zip-compressed\r\n";
	      default:
	        s = s + "Content-Type: text/html\r\n";
	        break;
	    }

	    ////so on and so on......
	    s = s + "\r\n"; //this marks the end of the httpheader
	    //and the start of the body
	    //ok return our newly created header!
	    return s;
	  }
	  
	  public String getCharacterDataFromElement(Element e) {
		    Node child = e.getFirstChild();
		    if (child instanceof CharacterData) {
		       CharacterData cd = (CharacterData) child;
		       return cd.getData();
		    }
		    return "?";
		  }
}


