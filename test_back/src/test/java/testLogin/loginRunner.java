package testLogin;
import com.intuit.karate.junit5.Karate;

public class loginRunner {
    @Karate.Test
    Karate testLogin() {
        return Karate.run("login").relativeTo(getClass());
    }    
}
