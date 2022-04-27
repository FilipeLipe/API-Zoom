package ws;
import java.io.IOException;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.ext.Provider;

@Provider
public class ResponseFilter implements ContainerResponseFilter {
   public void filter(ContainerRequestContext req, ContainerResponseContext res)
        throws IOException
   {
      if (req.getMethod().equals("OPTIONS")) {
        res.getHeaders().add("Access-Control-Allow-Origin", "*");
        res.getHeaders().add("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
        res.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      }else{
        res.getHeaders().add("Access-Control-Allow-Origin", "*");
      }
   }
}