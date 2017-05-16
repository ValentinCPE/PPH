package iut.pph;

/**
 * Created by A665772 on 16/05/2017.
 */
import org.springframework.web.bind.annotation.RequestMapping;
@org.springframework.web.bind.annotation.RestController
public class TestController {
    @RequestMapping("/api/hello")
    public String greet() {
        return "Hello from the other side!!!";
    }
}
